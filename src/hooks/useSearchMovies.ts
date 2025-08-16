import type { Movie } from "../types/movie";
import { searchMovies } from "../services/movieService";
import { useEffect, useState } from "react";

export const useSearchMovies = (query: string) => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(false);

  useEffect(() => {
    let isMounted = true;

    if (query.length < 2) {
      setMovies([]);
      setLoading(false);
      setHasMore(false);
      return;
    }

    const fetchMovies = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await searchMovies(query, currentPage);
        if (isMounted) {
          if (currentPage === 1) {
            setMovies(data.results);
          } else {
            setMovies((prevMovies) => [...prevMovies, ...data.results]);
          }
          setCurrentPage(data.page);
          setHasMore(data.page < data.total_pages);
        }
      } catch (err) {
        if (isMounted) {
          setError(err instanceof Error ? err.message : "Error loading movies");
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    if (currentPage === 1) {
      setLoading(true);
      const timeoutId = setTimeout(fetchMovies, 500);
      return () => {
        clearTimeout(timeoutId);
        isMounted = false;
      };
    } else {
      fetchMovies();
      return () => {
        isMounted = false;
      };
    }
  }, [query, currentPage]);

  
  const loadMore = () => {
    if (hasMore && !loading) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  return { movies, loading, error, hasMore, loadMore };
};
