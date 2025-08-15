import { API_CONFIG, API_HEADERS } from "../config/api";
import type { Movie } from "../types/movie";
import type { MovieVideo } from "../types/video";

/**
 * Response structure for TMDB API endpoints that return paginated movie lists
 * @interface MovieListResponse
 */
export type MovieListResponse = {
  /** Current page number */
  page: number;
  /** Array of movies in the current page */
  results: Movie[];
  /** Total number of pages available */
  total_pages: number;
  /** Total number of movies across all pages */
  total_results: number;
}

export type MovieVideoResponse = {
  id: number;
  results: MovieVideo[];
}

/**
 * Fetches detailed information for a specific movie by its ID
 * @param id - The TMDB movie ID
 * @returns Promise that resolves to a Movie object with full details
 * @throws Error when the API request fails or movie is not found
 */
export const getMovieById = async (id: number): Promise<Movie> => {
  const url = `${API_CONFIG.baseUrl}/movie/${id}?language=en-US`;

  const response = await fetch(url, { headers: API_HEADERS });
  if (!response.ok) {
    throw new Error(`Error: ${response.status}`);
  }
  const movie: Movie = await response.json();

  return movie;
};

/**
 * Fetches a list of popular movies from TMDB
 * @returns Promise that resolves to MovieListResponse containing popular movies with pagination info
 * @throws Error when the API request fails
 */
export const getPopular = async (): Promise<MovieListResponse> => {
  const url = `${API_CONFIG.baseUrl}/movie/popular?language=en-US`;

  const response = await fetch(url, { headers: API_HEADERS});
  if(!response.ok){
    throw new Error(`Error: ${response.status}`);
  }
  const movieListData: MovieListResponse = await response.json(); 

  return movieListData;
}

export const searchMovies = async (query: string, page: number): Promise<MovieListResponse> => {
  const url = 
  `${API_CONFIG.baseUrl}/search/movie?query=${encodeURIComponent(query)}&language=en-US&page=${page}`;

  const response = await fetch(url, { headers: API_HEADERS });
  if (!response.ok) {
    throw new Error(`Error: ${response.status}`);
  }
  const movieListData: MovieListResponse = await response.json();

  return movieListData;
}

export const getMovieVideos = async (movieId: number): Promise<MovieVideoResponse> => {
  const url = `${API_CONFIG.baseUrl}/movie/${movieId}/videos`;

  const response = await fetch(url, { headers: API_HEADERS });
  if (!response.ok) {
    throw new Error(`Error: ${response.status}`);
  }

  const movieVideoData: MovieVideoResponse = await response.json();

  return movieVideoData;
}