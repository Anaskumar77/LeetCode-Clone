import { createSlice } from '@reduxjs/toolkit';

/**
 * problemsSlice — manages the problem list, filters, and favorites.
 *
 * State shape:
 *   list        — array of problem objects fetched from the API
 *   favorites   — Set/array of problem IDs the user has starred
 *   filters     — { search, difficulty, category, tab }
 *   loading     — fetch status
 *   error       — error message | null
 */
const initialState = {
  list: [],
  favorites: [],
  filters: {
    search: '',
    difficulty: 'All',
    category: 'All',
    tab: 'all',     // 'all' | 'solved' | 'attempted'
  },
  loading: false,
  error: null,
};

const problemsSlice = createSlice({
  name: 'problems',
  initialState,
  reducers: {
    /** Replace the full problem list (called after API fetch) */
    setProblems(state, action) {
      state.list = action.payload;
      state.loading = false;
      state.error = null;
    },

    /** Toggle a problem in/out of favorites */
    toggleFavorite(state, action) {
      const id = action.payload;
      const idx = state.favorites.indexOf(id);
      if (idx === -1) state.favorites.push(id);
      else state.favorites.splice(idx, 1);
    },

    /** Partial update of filters */
    setFilter(state, action) {
      state.filters = { ...state.filters, ...action.payload };
    },

    /** Reset all filters to defaults */
    resetFilters(state) {
      state.filters = initialState.filters;
    },

    setLoading(state) { state.loading = true; state.error = null; },
    setError(state, action) { state.loading = false; state.error = action.payload; },
  },
});

export const {
  setProblems,
  toggleFavorite,
  setFilter,
  resetFilters,
  setLoading,
  setError,
} = problemsSlice.actions;

export default problemsSlice.reducer;
