import { createSlice } from '@reduxjs/toolkit';

/**
 * uiSlice — controls global UI state that multiple components share.
 *
 * State shape:
 *   sidebarOpen     — left sidebar collapsed or expanded
 *   activeModal     — which modal is open | null
 *   theme           — 'dark' | 'light'
 *   notification    — { message, type } | null  ('success'|'error'|'info')
 */
const initialState = {
  sidebarOpen:  true,
  activeModal:  null,
  theme:        'dark',
  notification: null,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleSidebar(state) {
      state.sidebarOpen = !state.sidebarOpen;
    },

    openModal(state, action) {
      state.activeModal = action.payload;   // e.g. 'login' | 'settings'
    },

    closeModal(state) {
      state.activeModal = null;
    },

    setTheme(state, action) {
      state.theme = action.payload;         // 'dark' | 'light'
    },

    showNotification(state, action) {
      state.notification = action.payload;  // { message, type }
    },

    clearNotification(state) {
      state.notification = null;
    },
  },
});

export const {
  toggleSidebar,
  openModal,
  closeModal,
  setTheme,
  showNotification,
  clearNotification,
} = uiSlice.actions;

export default uiSlice.reducer;
