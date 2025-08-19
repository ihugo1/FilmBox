import { getPopular } from "../services/movieService";
import { useQuery } from "@tanstack/react-query";

export const usePopularMovies = () => {
  return useQuery({
    queryKey: ["popularMovies"],
    queryFn: async () => {
      const data = await getPopular();
      return data.results.slice(0, 10);
    }
  })
}
/*
import { useEffect, useState } from "react";
import type { Movie } from "../types";
import { getPopular } from "../services/movieService";

export const usePopularMovies = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const fetchMovies = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getPopular();
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

  return { movies, loading, error };
};
*/