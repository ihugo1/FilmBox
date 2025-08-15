import { useEffect, useState } from "react";
import { getSimilar } from "../services/movieService";
import type { Movie } from "../types/movie";

export const useSimilarMovies = (movieId: number) => {
  const [similarMovies, setSimilarMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      setError(null);
      try{
        const data = await getSimilar(movieId);
        setSimilarMovies(data.results.slice(0, 5));
      } catch (err) {
        setError(err instanceof Error ? err.message : "Error loading movies");
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [movieId]);

  return { similarMovies, loading, error }
}