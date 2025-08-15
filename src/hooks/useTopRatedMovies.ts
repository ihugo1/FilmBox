import { useEffect, useState } from "react";
import { getTopRated } from "../services/movieService";
import type { Movie } from "../types/movie";

export const useTopRatedMovies = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getTopRated();
        setMovies(data.results.slice(0, 10));
      } catch (err) {
        setError(err instanceof Error ? err.message : "Error loading movies");
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  return { movies, loading, error }
};
