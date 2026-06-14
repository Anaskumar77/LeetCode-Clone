import { createSlice } from '@reduxjs/toolkit';

/**
 * userSlice — tracks the authenticated user's profile and solve progress.
 *
 * State shape:
 *   profile     — { id, username, email, avatar } | null
 *   solvedIds   — array of problem IDs the user has solved
 *   attemptedIds— array of problem IDs the user has attempted
 *   isLoggedIn  — boolean
 */
const initialState = {
  profile:      null,
  solvedIds:    [],
  attemptedIds: [],
  isLoggedIn:   false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    /** Set user profile after login */
    setUser(state, action) {
      state.profile    = action.payload;
      state.isLoggedIn = true;
    },

    /** Clear user on logout */
    clearUser(state) {
      state.profile      = null;
      state.isLoggedIn   = false;
      state.solvedIds    = [];
      state.attemptedIds = [];
    },

    /** Mark a problem as solved */
    markSolved(state, action) {
      const id = action.payload;
      if (!state.solvedIds.includes(id))    state.solvedIds.push(id);
      // Remove from attempted if it was there
      state.attemptedIds = state.attemptedIds.filter((x) => x !== id);
    },

    /** Mark a problem as attempted (but not yet solved) */
    markAttempted(state, action) {
      const id = action.payload;
      if (!state.solvedIds.includes(id) && !state.attemptedIds.includes(id)) {
        state.attemptedIds.push(id);
      }
    },
  },
});

export const { setUser, clearUser, markSolved, markAttempted } = userSlice.actions;

export default userSlice.reducer;
