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
        body: JSON.stringify(userData),
      });
      if (!response.ok) {
        const text = await response.text().catch(() => 'Registration failed');
        return rejectWithValue(text || 'Registration failed');
      }
      return response.json();
    } catch (err) {
      return rejectWithValue(err.message ?? 'Registration failed');
    }
  }
);

/* ════════════════════════════════════════════
   INITIAL STATE
════════════════════════════════════════════ */
const initialState = {
  profile: null,
  solvedIds: [],
  attemptedIds: [],
  isLoggedIn: false,
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
