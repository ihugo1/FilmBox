export const API_CONFIG = {
  baseUrl: import.meta.env.VITE_TMDB_BASE_URL,
  apiKey: import.meta.env.VITE_TMDB_API_KEY,
} as const;

export const API_HEADERS = {
  Authorization: `Bearer ${API_CONFIG.apiKey}`,
  "Content-Type": "application/json",
} as const;


