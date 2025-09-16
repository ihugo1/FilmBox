import { useQuery } from "@tanstack/react-query";
import { getMovieCredits } from "../../services/movie.service";

export const useCreditData = (movieId: number) => {
  return useQuery({
    queryKey: ["movieCredits", movieId],
    queryFn: async () => {
      const data = await getMovieCredits(movieId);
      const castMembers = data.cast.slice(0, 10);
      const director = data.crew.find((member) => member.job === "Director");
      return {
        castMembers,
        director,
      };
    },
  });
};
