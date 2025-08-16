import { useEffect, useState } from "react"
import type { Movie } from "../types"
import { getMovieById } from "../services/movieService";

export const useGetMovieById = (movieId: number) => {
  const [movie, setMovie] = useState<Movie>();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(()=>{
    let isMounted = true;

    const fetchMovie = async () => {
      setLoading(true);
      setError(null);
      try{
        const data = await getMovieById(movieId);
        if (isMounted) {
          setMovie(data);
        }
      } catch (err){
        if(isMounted){
          setError(err instanceof Error ? err.message : "Error loading movie");
        }
      } finally{
        if(isMounted){
          setLoading(false);
        }
      }
    }

    fetchMovie();

    return () => {
      isMounted = false;
    };
  }, [movieId])

  return { movie, loading, error }
}