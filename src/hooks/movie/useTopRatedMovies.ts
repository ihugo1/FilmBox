import { useQuery } from "@tanstack/react-query";
import { getTopRated } from "../../services/movie.service";

export const useTopRatedMovies = () => {
  return useQuery({
    queryKey: ["topRatedMovies"],
    queryFn: async () => {
      const data = await getTopRated();
      return data.results.slice(0, 10);
    },
  });
};
