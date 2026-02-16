/**
 * API utility for handling configurable API base URL
 * 
 * In development: VITE_API_URL should be empty to use Vite proxy
 * In production: Set VITE_API_URL to the deployed backend URL
 * 
 * Example:
 *   Development: VITE_API_URL=
 *   Production: VITE_API_URL=https://api.beautylineacademy.com
 */

const API_BASE = import.meta.env.VITE_API_URL || '';

/**
 * Constructs the full API URL for a given path
 * @param {string} path - API endpoint path (e.g., '/api/contact')
 * @returns {string} Full API URL
 */
export function apiUrl(path) {
  const base = API_BASE.replace(/\/$/, ''); // Remove trailing slash
  const p = path.startsWith('/') ? path : `/${path}`;
  return `${base}${p}`;
}
