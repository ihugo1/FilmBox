import { API_CONFIG, API_HEADERS } from "../config/api";
import type { Movie } from "../types/movie";
import type { MovieVideo } from "../types/video";
import type { CrewMember, CastMember } from "../types/creditsTypes";

/* RESPONSE TYPES */
export type MovieListResponse = {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
};

export type MovieVideoResponse = {
  id: number;
  results: MovieVideo[];
};

export type CreditResponse = {
  id: number;
  cast: CastMember[];
  crew: CrewMember[];
};

/* API REQUEST FUNCTION */
const apiRequest = async (endpoint: string) => {
  const url = `${API_CONFIG.baseUrl}${endpoint}`;
  const response = await fetch(url, { headers: API_HEADERS });
  if (!response.ok) {
    throw new Error(`Error: ${response.status}`);
  }
  return response.json();
};

/* FUNCTIONS */
export const getMovieById = async (id: number): Promise<Movie> => {
  const movie: Movie = await apiRequest(`/movie/${id}?language=en-US`);
  return movie;
};

export const getPopular = async (): Promise<MovieListResponse> => {
  const movieListData: MovieListResponse = await apiRequest(`/movie/popular?language=en-US`);
  return movieListData;
};

export const searchMovies = async (
  query: string,
  page: number
): Promise<MovieListResponse> => {
  const movieListData: MovieListResponse = await apiRequest(
    `/search/movie?query=${encodeURIComponent(query)}&language=en-US&page=${page}`
  );
  return movieListData;
};

export const getMovieVideos = async (
  movieId: number
): Promise<MovieVideoResponse> => {
  const movieVideoData: MovieVideoResponse = await apiRequest(`/movie/${movieId}/videos?language=en-US`);
  return movieVideoData;
};

export const getMovieCredits = async (
  movieId: number
): Promise<CreditResponse> => {
  const creditData: CreditResponse = await apiRequest(`/movie/${movieId}/credits?language=en-US`);
  return creditData;
};

export const getSimilar = async (
  movieId: number
): Promise<MovieListResponse> => {
  const movieListData: MovieListResponse = await apiRequest(`/movie/${movieId}/similar`);
  return movieListData;
};

export const getTopRated = async (): Promise<MovieListResponse> => {
  const movieListData: MovieListResponse = await apiRequest(`/movie/top_rated`);
  return movieListData;
};
