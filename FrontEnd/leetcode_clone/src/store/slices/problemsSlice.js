import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api/apiClient';

/* ════════════════════════════════════════════
   ASYNC THUNKS
════════════════════════════════════════════ */

/**
 * fetchProblems — GET /api/problems
 *
 * Accepted payload:
 *   { page = 0, count = 10, difficulty = undefined }
 *
 * Maps to the Spring Boot controller:
 *   @GetMapping()
 *   ResponseEntity<List<ProblemResponse>> getProblems(
 *       @RequestParam(required = false) String difficulty,
 *       @RequestParam(defaultValue = "0") int page,
 *       @RequestParam(defaultValue = "10") int count)
 */


export const fetchProblems = createAsyncThunk(
  'problems/fetchProblems',
  async ({ page = 0, count = 10, difficulty } = {}, { rejectWithValue }) => {
    try {
      // Build query string — omit difficulty when not set
      const params = new URLSearchParams({ page, count });
      if (difficulty && difficulty !== 'All') params.set('difficulty', difficulty);

      const data = await api.get(`/problems?${params.toString()}`);
      return data;           // List<ProblemResponse> → array
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

/**
 * fetchProblemById — GET /api/problems/{id}
 *
 * Maps to the Spring Boot controller:
 *   @GetMapping("/{id}")
 *   ResponseEntity<ProblemResponse> getSpecificProblem(@PathVariable UUID id)
 */
export const fetchProblemById = createAsyncThunk(
  'problems/fetchProblemById',
  async (id, { rejectWithValue }) => {
    try {
      const data = await api.get(`/problems/${id}`);
      return data;           // ProblemResponse object
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

/**
 * fetchFavorites — GET /api/favorites
 *
 * Fetches ALL favorited problems for the authenticated user.
 * Returns List<FavoriteResponseDto> containing problemId fields.
 */
export const fetchFavorites = createAsyncThunk(
  'problems/fetchFavorites',
  async (_, { rejectWithValue }) => {
    try {
      const data = await api.get('/favorites');  // count=0 default → all
      return data;  // FavoriteResponseDto[]
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

/**
 * addFavoriteAsync — POST /api/favorites/{problemId}
 */
export const addFavoriteAsync = createAsyncThunk(
  'problems/addFavorite',
  async (problemId, { rejectWithValue }) => {
    try {
      await api.post(`/favorites/${problemId}`);
      return problemId;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

/**
 * removeFavoriteAsync — DELETE /api/favorites/{problemId}
 */
export const removeFavoriteAsync = createAsyncThunk(
  'problems/removeFavorite',
  async (problemId, { rejectWithValue }) => {
    try {
      await api.delete(`/favorites/${problemId}`);
      return problemId;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

/* ════════════════════════════════════════════
   INITIAL STATE
════════════════════════════════════════════ */
const initialState = {
  list: [],            // ProblemResponse[]
  selected: null,      // ProblemResponse | null  (single problem view)
  favorites: [],       // problem id[]
  filters: {
    search: '',
    difficulty: 'All',
    category: 'All',
    tab: 'all',        // 'all' | 'solved' | 'attempted'
  },
  pagination: {
    page: 0,
    count: 10,
  },
  loading: false,
  error: null,
};

/* ════════════════════════════════════════════
   SLICE
════════════════════════════════════════════ */
const problemsSlice = createSlice({
  name: 'problems',
  initialState,
  reducers: {
    /** Partial update of filters */
    setFilter(state, action) {
      state.filters = { ...state.filters, ...action.payload };
    },

    /** Reset all filters to defaults */
    resetFilters(state) {
      state.filters = initialState.filters;
    },

    /** Update pagination */
    setPagination(state, action) {
      state.pagination = { ...state.pagination, ...action.payload };
    },

    /** Clear the selected single problem */
    clearSelected(state) {
      state.selected = null;
    },

    /** Setting the selected problem ( user click the problem in list ) */
    setSelected(state, action) {
      state.selected = action.payload
    }
  },

  /* ── Async lifecycle handlers ── */
  extraReducers: (builder) => {
    // ── fetchProblems ──────────────────────────
    builder
      .addCase(fetchProblems.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProblems.fulfilled, (state, action) => {
        state.loading = false;
        console.log(action.payload)
        state.list = action.payload;   // replace list with fresh page
      })
      .addCase(fetchProblems.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? 'Failed to fetch problems';
      });

    // ── fetchProblemById ───────────────────────
    builder
      .addCase(fetchProblemById.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.selected = null;
      })
      .addCase(fetchProblemById.fulfilled, (state, action) => {
        state.loading = false;
        state.selected = action.payload;
      })
      .addCase(fetchProblemById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? 'Failed to fetch problem';
      });

    // ── fetchFavorites ─────────────────────────
    builder
      .addCase(fetchFavorites.fulfilled, (state, action) => {
        // Extract just the problemId from each FavoriteResponseDto
        state.favorites = action.payload.map((fav) => fav.problemId);
      });

    // ── addFavoriteAsync ───────────────────────
    builder
      .addCase(addFavoriteAsync.fulfilled, (state, action) => {
        const id = action.payload;
        if (!state.favorites.includes(id)) {
          state.favorites.push(id);
        }
      });

    // ── removeFavoriteAsync ────────────────────
    builder
      .addCase(removeFavoriteAsync.fulfilled, (state, action) => {
        const id = action.payload;
        state.favorites = state.favorites.filter((fid) => fid !== id);
      });
  },
});

export const {
  setFilter,
  resetFilters,
  setPagination,
  clearSelected,
} = problemsSlice.actions;

export default problemsSlice.reducer;
