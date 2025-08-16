import { useEffect, useState } from "react";
import { getTopRated } from "../services/movieService";
import type { Movie } from "../types";

export const useTopRatedMovies = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const fetchMovies = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getTopRated();
        if (isMounted) {
          setMovies(data.results.slice(0, 10));
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

    fetchMovies();

    return () => {
      isMounted = false;
    };
  }, []);

  return { movies, loading, error }
};
