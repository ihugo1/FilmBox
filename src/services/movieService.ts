import { API_CONFIG, API_HEADERS } from "../config/api";
import type {
  Movie,
  MovieVideo,
  CrewMember,
  CastMember,
  Genre,
} from "../types";

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
export type GenresResponse = {
  genres: Genre[];
};

/* export type SortOption =
  | "popularity.desc"
  | "vote_average.desc"
  | "release_date.desc"; */

export const SORT_OPTIONS = [
  { value: "popularity.desc", label: "Most Popular" },
  { value: "vote_average.desc", label: "Highest Rated" },
  { value: "release_date.desc", label: "Newest First" },
] as const;

export type SortOption = typeof SORT_OPTIONS[number]['value'];

/* API REQUEST FUNCTION */
const apiRequest = async (endpoint: string) => {
  try {
    const url = `${API_CONFIG.baseUrl}${endpoint}`;
    const response = await fetch(url, { headers: API_HEADERS });
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
    return response.json();
  } catch (error) {
    if (error instanceof TypeError) {
      throw new Error("Network error");
    } else if (error instanceof SyntaxError) {
      throw new Error("Invalid server response (non-JSON)");
    } else {
      throw error;
    }
  }
};

/* FUNCTIONS */
export const getMovieGenres = async (): Promise<GenresResponse> => {
  const genreListData: GenresResponse = await apiRequest("/genre/movie/list");
  return genreListData;
};

export const getMovieById = async (id: number): Promise<Movie> => {
  const movie: Movie = await apiRequest(`/movie/${id}?language=en-US`);
  return movie;
};

export const getPopular = async (page = 1): Promise<MovieListResponse> => {
  const movieListData: MovieListResponse = await apiRequest(
    `/movie/popular?language=en-US&page=${page}`
  );
  return movieListData;
};

export const searchMovies = async (
  query: string,
  page: number
): Promise<MovieListResponse> => {
  const movieListData: MovieListResponse = await apiRequest(
    `/search/movie?query=${encodeURIComponent(
      query
    )}&language=en-US&page=${page}`
  );
  return movieListData;
};

export const discoverMovies = async (
  genreId: number,
  sortBy: SortOption,
  page: number
): Promise<MovieListResponse> => {
  const movieListData: MovieListResponse = await apiRequest(
    `/discover/movie?adult=false&language=en-US&page=${page}&sort_by=${sortBy}&with_genres=${genreId}`
  );
  return movieListData;
};

export const getMovieVideos = async (
  movieId: number
): Promise<MovieVideoResponse> => {
  const movieVideoData: MovieVideoResponse = await apiRequest(
    `/movie/${movieId}/videos?language=en-US`
  );
  return movieVideoData;
};

export const getMovieCredits = async (
  movieId: number
): Promise<CreditResponse> => {
  const creditData: CreditResponse = await apiRequest(
    `/movie/${movieId}/credits?language=en-US`
  );
  return creditData;
};

export const getSimilar = async (
  movieId: number
): Promise<MovieListResponse> => {
  const movieListData: MovieListResponse = await apiRequest(
    `/movie/${movieId}/similar`
  );
  return movieListData;
};

export const getTopRated = async (): Promise<MovieListResponse> => {
  const movieListData: MovieListResponse = await apiRequest(`/movie/top_rated`);
  return movieListData;
};
