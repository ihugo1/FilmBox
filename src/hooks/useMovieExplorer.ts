import { useEffect, useState, useRef } from "react";
import type { Movie } from "../types";
import {
  searchMovies,
  discoverMovies,
  getPopular,
  type SortOption,
} from "../services/movieService";

export const useMovieExplorer = (
  query: string,
  genreId: number | null,
  sortedBy: SortOption
) => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMorePages, setHasMorePages] = useState(false);

  useEffect(() => {
    setMovies([]);
    setError(null);
    setCurrentPage(1);
    setHasMorePages(false);
  }, [query, genreId, sortedBy]);

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      setError(null);
      try {
        let data;
        if (query.length >= 2) {
          data = await searchMovies(query, currentPage);
        } else if (genreId !== null) {
          data = await discoverMovies(genreId, sortedBy, currentPage);
        } else {
          data = await getPopular(currentPage);
        }
        setMovies(prev =>
          currentPage === 1 ? data.results : [...prev, ...data.results]
        );
        setCurrentPage(data.page);
        setHasMorePages(data.total_pages > data.page);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Error loading movies");
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [query, genreId, sortedBy, currentPage]);

  const loadMore = () => {
    if (hasMorePages) setCurrentPage((prev) => prev + 1);
  };

  return { movies, loading, error, hasMorePages, loadMore };
};
