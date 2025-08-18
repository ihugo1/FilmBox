import { useState, useEffect } from "react";
import { getMovieGenres } from "../services/movieService";
import type { Genre } from "../types";

export const useMovieGenres = () => {
  const [genres, setGenres] = useState<Genre[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchGenres = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getMovieGenres();
        setGenres(data.genres);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Error loading genres");
      } finally {
        setLoading(false);
      }
    };

    fetchGenres();
  }, []);

  return { genres, loading, error };
}