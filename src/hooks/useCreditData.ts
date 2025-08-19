import { getMovieCredits } from "../services/movieService";
import { useQuery } from "@tanstack/react-query";

export const useCreditData = (movieId: number) => {
  return useQuery({
    queryKey: ["movieCredits", movieId],
    queryFn: async () => {
      const data = await getMovieCredits(movieId);
      const castMembers = data.cast.slice(0, 6);
      const director = data.crew.find((member) => member.job === "Director");
      return {
        castMembers,
        director,
      };
    },
  });
};
