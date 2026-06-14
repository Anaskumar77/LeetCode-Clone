/**
 * apiClient.js — centralised fetch wrapper for the Spring Boot backend.
 *
 * Base URL is read from the Vite env variable VITE_API_URL.
 * Fallback: http://localhost:8080  (Spring Boot default)
 *
 * Usage:
 *   import api from '../api/apiClient';
 *   const data = await api.get('/problems?page=0&count=10');
 */

import { refreshAccessToken, clearUser } from '../store/slices/userSlice';

const BASE_URL = import.meta.env.VITE_API_URL ?? '';

let store;
export const injectStore = (_store) => {
  store = _store;
};

async function request(path, options = {}) {
  let token = null;

  if (store) {
    const state = store.getState();
    token = state.user.accessToken;

    // If no token but user is marked as logged in, try to refresh immediately
    if (!token && state.user.isLoggedIn && path !== '/auth/refresh') {
      try {
        const action = await store.dispatch(refreshAccessToken()).unwrap();
        token = action.accessToken;
      } catch (err) {
        store.dispatch(clearUser());
      }
    }
  }

  const url = `${BASE_URL}/api${path}`;
  const headers = { 'Content-Type': 'application/json', ...options.headers };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  let response = await fetch(url, { ...options, headers });

  // If unauthorized, attempt one retry with a refreshed token
  if (response.status === 401 && store && path !== '/auth/refresh') {
    try {
      const action = await store.dispatch(refreshAccessToken()).unwrap();
      token = action.accessToken;
      headers['Authorization'] = `Bearer ${token}`;
      response = await fetch(url, { ...options, headers });
    } catch (err) {
      store.dispatch(clearUser());
    }
  }

  if (!response.ok) {
    const text = await response.text().catch(() => response.statusText);
    throw new Error(text || `HTTP ${response.status}`);
  }

  if (response.status === 204) return null;

  return response.json();
}

const api = {
  get: (path, options) => request(path, { method: 'GET', ...options }),
  post: (path, body, options) => request(path, { method: 'POST', body: JSON.stringify(body), ...options }),
  put: (path, body, options) => request(path, { method: 'PUT', body: JSON.stringify(body), ...options }),
  delete: (path, options) => request(path, { method: 'DELETE', ...options }),
};

export default api;
