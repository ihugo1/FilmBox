import { useEffect, useState } from "react"
import type { MovieVideo } from "../types";
import { getMovieVideos } from "../services/movieService"

export const useMovieTrailer = (movieId: number) => {
  const [trailer, setTrailer] = useState<MovieVideo | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(()=>{
    let isMounted = true;

    const fetchVideos = async () => {
      setLoading(true);
      setError(null);
      try{
        const data = await getMovieVideos(movieId);
        
        if (isMounted) {
          // Single iteration optimization
          let officialTrailer = null;
          let anyTrailer = null;

          for (const video of data.results) {
            if (video.type === "Trailer" && video.site === "YouTube") {
              if (video.official && !officialTrailer) {
                officialTrailer = video;
              }
              if (!anyTrailer) {
                anyTrailer = video;
              }
              // Early exit if we found official trailer
              if (officialTrailer) break;
            }
          }
          
          setTrailer(officialTrailer || anyTrailer || null);
        }
      } catch (err) {
        if (isMounted) {
          setError(err instanceof Error ? err.message : "Error loading videos");
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    fetchVideos();

    return () => {
      isMounted = false;
    };
  }, [movieId])

  return { trailer, loading, error }
}