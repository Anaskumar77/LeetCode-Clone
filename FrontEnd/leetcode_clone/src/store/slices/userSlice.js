import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

/* ════════════════════════════════════════════
   ASYNC THUNKS
════════════════════════════════════════════ */

/**
 * registerUser — POST /api/auth/register
 * Payload: { name, email, password, adminSecret? }
 */
export const registerUser = createAsyncThunk(
  'auth/register',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(userData),
      });
      if (!response.ok) {
        const text = await response.text().catch(() => 'Registration failed');
        return rejectWithValue(text || 'Registration failed');
      }
      const data = await response.json();
      if (data.success === false) {
        return rejectWithValue(data.message || 'Registration failed');
      }
      return data;
    } catch (err) {
      return rejectWithValue(err.message ?? 'Registration failed');
    }
  }
);

/**
 * loginUser — POST /api/auth/login
 * Payload: { email, password }
 */
export const loginUser = createAsyncThunk(
  'auth/login',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(credentials),
      });
      if (!response.ok) {
        const text = await response.text().catch(() => 'Login failed');
        return rejectWithValue(text || 'Login failed');
      }
      const data = await response.json();
      if (data.success === false) {
        return rejectWithValue(data.message || 'Login failed');
      }
      return data;
    } catch (err) {
      return rejectWithValue(err.message ?? 'Login failed');
    }
  }
);

/**
 * refreshAccessToken — POST /api/auth/refresh
 * Used to get a new access token when the current one is missing or expired.
 */
export const refreshAccessToken = createAsyncThunk(
  'auth/refresh',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch('/api/auth/refresh', {
        method: 'POST',
        credentials: 'include',
      });
      if (!response.ok) {
        const text = await response.text().catch(() => 'Refresh failed');
        return rejectWithValue(text || 'Refresh failed');
      }
      return response.json();
    } catch (err) {
      return rejectWithValue(err.message ?? 'Refresh failed');
    }
  }
);

/**
 * initializeAuth — called once on app load.
 * Tries to refresh the access token using the httpOnly refresh token cookie.
 * If successful, the user is silently authenticated.
 */
export const initializeAuth = createAsyncThunk(
  'auth/initialize',
  async (_, { dispatch, getState }) => {
    // If the user is already logged in (e.g. just did a login), skip the refresh call
    const state = getState();
    if (state.user.isLoggedIn && state.user.accessToken) {
      return { accessToken: state.user.accessToken, user: state.user.profile };
    }
    try {
      const result = await dispatch(refreshAccessToken()).unwrap();
      return result;
    } catch {
      // No valid refresh token cookie — user stays logged out
      return null;
    }
  }
);

/* ════════════════════════════════════════════
   INITIAL STATE
════════════════════════════════════════════ */
const initialState = {
  profile: null,
  accessToken: null,
  solvedIds: [],
  attemptedIds: [],
  isLoggedIn: false,
  isInitialized: false,
  loading: false,
  error: null,
};

/* ════════════════════════════════════════════
   SLICE
════════════════════════════════════════════ */
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    /** Set user profile after login */
    setUser(state, action) {
      state.profile = action.payload;
      state.isLoggedIn = true;
    },

    /** Clear user on logout */
    clearUser(state) {
      state.profile = null;
      state.isLoggedIn = false;
      state.solvedIds = [];
      state.attemptedIds = [];
    },

    /** Mark a problem as solved */
    markSolved(state, action) {
      const id = action.payload;
      if (!state.solvedIds.includes(id)) state.solvedIds.push(id);
      state.attemptedIds = state.attemptedIds.filter((x) => x !== id);
    },

    /** Mark a problem as attempted (but not yet solved) */
    markAttempted(state, action) {
      const id = action.payload;
      if (!state.solvedIds.includes(id) && !state.attemptedIds.includes(id)) {
        state.attemptedIds.push(id);
      }
    },

    /** Clear auth error — called when the user starts typing again */
    clearError(state) {
      state.error = null;
    },
  },

  /* ── Async lifecycle ── */
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? 'Registration failed.';
      })
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload && action.payload.user) {
          state.profile = action.payload.user;
          state.accessToken = action.payload.accessToken
          state.isLoggedIn = true;
        }
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? 'Login failed.';
      })
      .addCase(refreshAccessToken.fulfilled, (state, action) => {
        if (action.payload && action.payload.accessToken) {
          state.accessToken = action.payload.accessToken;
          if (action.payload.user) {
            state.profile = action.payload.user;
          }
          state.isLoggedIn = true;
        }
      })
      .addCase(refreshAccessToken.rejected, (state) => {
        // Only clear login state if we were NOT already logged in via credentials.
        // This prevents a failed refresh from wiping a just-completed login.
        if (!state.profile) {
          state.accessToken = null;
          state.isLoggedIn = false;
        }
      })
      .addCase(initializeAuth.fulfilled, (state) => {
        state.isInitialized = true;
      })
      .addCase(initializeAuth.rejected, (state) => {
        state.isInitialized = true;
      });
  },
});

export const {
  setUser,
  clearUser,
  markSolved,
  markAttempted,
  clearError,
} = userSlice.actions;

export default userSlice.reducer;
