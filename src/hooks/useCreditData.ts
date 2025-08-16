import { useState, useEffect } from "react";
import { getMovieCredits } from "../services/movieService";
import type { CastMember, CrewMember } from "../types";

export const useCreditData = (movieId: number) => {
  const [castMembers, setCastMember] = useState<CastMember[]>([]);
  const [director, setDirector] = useState<CrewMember>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const fetchCredits = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getMovieCredits(movieId);
        if (isMounted) {
          // Filter cast (first 6 members)
          setCastMember(data.cast.slice(0, 6));
          // Find director
          const movieDirector = data.crew.find(member => member.job === "Director");
          setDirector(movieDirector);
        }
      } catch (err) {
        if (isMounted) {
          setError(err instanceof Error ? err.message : "Error loading credits");
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchCredits();

    return () => {
      isMounted = false;
    };
  }, [movieId]);

  return { castMembers, director, loading, error };
}