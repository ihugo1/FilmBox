import { useEffect, useState } from "react";
import { getSimilar } from "../services/movieService";
import type { Movie } from "../types";

export const useSimilarMovies = (movieId: number) => {
  const [similarMovies, setSimilarMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const fetchMovies = async () => {
      setLoading(true);
      setError(null);
      try{
        const data = await getSimilar(movieId);
        if (isMounted) {
          setSimilarMovies(data.results.slice(0, 5));
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
  }, [movieId]);

  return { similarMovies, loading, error }
}