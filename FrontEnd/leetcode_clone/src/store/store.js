import { configureStore } from '@reduxjs/toolkit';
import problemsReducer from './slices/problemsSlice';
import userReducer from './slices/userSlice';
import uiReducer from './slices/uiSlice';

const store = configureStore({
  reducer: {
    problems: problemsReducer,
    user: userReducer,
    ui: uiReducer,
  },
});

export default store;

/** Typed helpers (plain JS — add JSDoc if you want IDE hints) */
export const getState = () => store.getState();
export const dispatch = (action) => store.dispatch(action);
