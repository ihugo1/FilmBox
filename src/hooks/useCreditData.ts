import { useState, useEffect } from "react";
import { getMovieCredits } from "../services/movieService";
import type { CastMember } from "../types/creditsTypes";
import type { CrewMember } from "../types/creditsTypes";

export const useCreditData = (movieId: number) => {
  const [castMembers, setCastMember] = useState<CastMember[]>([]);
  const [director, setDirector] = useState<CrewMember>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCredits = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getMovieCredits(movieId);
        // Filter cast (first 6 members)
        setCastMember(data.cast.slice(0, 6));
        // Find director
        const movieDirector = data.crew.find(member => member.job === "Director");
        setDirector(movieDirector);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Error loading credits");
      } finally {
        setLoading(false);
      }
    };

    fetchCredits();
  }, [movieId]);

  return { castMembers, director, loading, error };
}