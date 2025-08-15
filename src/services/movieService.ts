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

/* BASE URL */
const baseUrl = API_CONFIG.baseUrl;

/* FUNCTIONS */
export const getMovieById = async (id: number): Promise<Movie> => {
  const url = `${baseUrl}/movie/${id}?language=en-US`;

  const response = await fetch(url, { headers: API_HEADERS });
  if (!response.ok) {
    throw new Error(`Error: ${response.status}`);
  }
  const movie: Movie = await response.json();

  return movie;
};

export const getPopular = async (): Promise<MovieListResponse> => {
  const url = `${baseUrl}/movie/popular?language=en-US`;

  const response = await fetch(url, { headers: API_HEADERS });
  if (!response.ok) {
    throw new Error(`Error: ${response.status}`);
  }
  const movieListData: MovieListResponse = await response.json();

  return movieListData;
};

export const searchMovies = async (
  query: string,
  page: number
): Promise<MovieListResponse> => {
  const url = `${baseUrl}/search/movie?query=${encodeURIComponent(
    query
  )}&language=en-US&page=${page}`;

  const response = await fetch(url, { headers: API_HEADERS });
  if (!response.ok) {
    throw new Error(`Error: ${response.status}`);
  }
  const movieListData: MovieListResponse = await response.json();

  return movieListData;
};

export const getMovieVideos = async (
  movieId: number
): Promise<MovieVideoResponse> => {
  const url = `${baseUrl}/movie/${movieId}/videos?language=en-US`;

  const response = await fetch(url, { headers: API_HEADERS });
  if (!response.ok) {
    throw new Error(`Error: ${response.status}`);
  }

  const movieVideoData: MovieVideoResponse = await response.json();

  return movieVideoData;
};

export const getMovieCredits = async (
  movieId: number
): Promise<CreditResponse> => {
  const url = `${baseUrl}/movie/${movieId}/credits?language=en-US`;

  const response = await fetch(url, { headers: API_HEADERS });
  if (!response.ok) {
    throw new Error(`Error: ${response.status}`);
  }

  const creditData: CreditResponse = await response.json();

  return creditData;
};

export const getSimilar = async (
  movieId: number
): Promise<MovieListResponse> => {
  const url = `${baseUrl}/movie/${movieId}/similar`;

  const response = await fetch(url, { headers: API_HEADERS });
  if (!response.ok) {
    throw new Error(`Error: ${response.status}`);
  }

  const movieListData: MovieListResponse = await response.json();

  return movieListData;
};

export const getTopRated = async (): Promise<MovieListResponse> => {
  const url = `${baseUrl}/movie/top_rated`;

  const response = await fetch(url, { headers: API_HEADERS });
  if (!response.ok) {
    throw new Error(`Error: ${response.status}`);
  }

  const movieListData: MovieListResponse = await response.json();

  return movieListData;
};
