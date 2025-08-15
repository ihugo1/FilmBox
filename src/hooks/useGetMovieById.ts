import { useEffect, useState } from "react"
import type { Movie } from "../types/movie"
import { getMovieById } from "../services/movieService";

export const useGetMovieById = (movieId: number) => {
  const [movie, setMovie] = useState<Movie>();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(()=>{
    const fetchMovie = async () => {
      setLoading(true);
      setError(null);
      try{
        const data = await getMovieById(movieId);
        setMovie(data);
      } catch (err){
        setError(err instanceof Error ? err.message : "Error loading movie");
      } finally{
        setLoading(false);
      }
    }

    fetchMovie();
  }, [movieId])

  return { movie, loading, error }
}