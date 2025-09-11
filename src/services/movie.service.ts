import { apiRequest } from "../api/tmdb.client";
import type {
  Movie,
  MovieListResponse,
  GenresResponse,
  MovieVideoResponse,
  CreditResponse,
  SortOption,
} from "../types/index";

export const getMovieGenres = async (): Promise<GenresResponse> => {
  const genreListResponse = await apiRequest<GenresResponse>(
    "/genre/movie/list"
  );
  return genreListResponse;
};

export const getMovieById = async (id: number): Promise<Movie> => {
  const movie = await apiRequest<Movie>(`/movie/${id}?language=en-US`);
  return movie;
};

export const getPopular = async (page = 1): Promise<MovieListResponse> => {
  const movieListReponse = await apiRequest<MovieListResponse>(
    `/movie/popular?language=en-US&page=${page}`
  );
  return movieListReponse;
};

export const searchMovies = async (
  query: string,
  page: number
): Promise<MovieListResponse> => {
  const movieListReponse = await apiRequest<MovieListResponse>(
    `/search/movie?query=${encodeURIComponent(
      query
    )}&language=en-US&page=${page}`
  );
  return movieListReponse;
};

export const discoverMovies = async (
  genreId: number,
  sortBy: SortOption,
  page: number
): Promise<MovieListResponse> => {
  const movieListReponse = await apiRequest<MovieListResponse>(
    `/discover/movie?adult=false&language=en-US&page=${page}&sort_by=${sortBy}&with_genres=${genreId}`
  );
  return movieListReponse;
};

export const getMovieVideos = async (
  movieId: number
): Promise<MovieVideoResponse> => {
  const movieVideoResponse = await apiRequest<MovieVideoResponse>(
    `/movie/${movieId}/videos?language=en-US`
  );
  return movieVideoResponse;
};

export const getMovieCredits = async (
  movieId: number
): Promise<CreditResponse> => {
  const creditResponse = await apiRequest<CreditResponse>(
    `/movie/${movieId}/credits?language=en-US`
  );
  return creditResponse;
};

export const getSimilar = async (
  movieId: number
): Promise<MovieListResponse> => {
  const movieListReponse = await apiRequest<MovieListResponse>(
    `/movie/${movieId}/similar`
  );
  return movieListReponse;
};

export const getTopRated = async (): Promise<MovieListResponse> => {
  const movieListReponse = await apiRequest<MovieListResponse>(
    `/movie/top_rated`
  );
  return movieListReponse;
};
