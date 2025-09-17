import { useQuery } from "@tanstack/react-query";
import { getPersonMovieCredits } from "../../services/person.service";

export const useGetPersonMovieCredits = (personId: number) => {
  return useQuery({
    queryKey: ["personMovieCredits", personId],
    queryFn: async () => {
      const data = await getPersonMovieCredits(personId);
      const directed = data.crew.filter((movie) => movie.job === "Director");
      const acting = data.cast;

      directed.sort((a, b) => {
        const dateA = a.release_date ? new Date(a.release_date).getTime() : 0;
        const dateB = b.release_date ? new Date(b.release_date).getTime() : 0;
        return dateB - dateA;
      });
      acting.sort((a, b) => {
        const dateA = a.release_date ? new Date(a.release_date).getTime() : 0;
        const dateB = b.release_date ? new Date(b.release_date).getTime() : 0;
        return dateB - dateA;
      });

      return { directed, acting };
    },
  });
};

