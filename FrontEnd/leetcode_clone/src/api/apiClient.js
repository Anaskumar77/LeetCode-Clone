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

const BASE_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:8081';

async function request(path, options = {}) {
  const url = `${BASE_URL}/api${path}`;
  const response = await fetch(url, {
    headers: { 'Content-Type': 'application/json', ...options.headers },
    ...options,
  });

  if (!response.ok) {
    const text = await response.text().catch(() => response.statusText);
    throw new Error(text || `HTTP ${response.status}`);
  }

  // Return null for 204 No Content
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
