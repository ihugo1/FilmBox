import { useEffect, useState } from "react";
import type { Movie } from "../types/movie";
import { getPopular } from "../services/movieService";

export const usePopularMovies = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getPopular();
        setMovies(data.results);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Error loading movies");
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  return { movies, loading, error };
};
