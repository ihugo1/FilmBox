import { getTopRated } from "../services/movieService";
import { useQuery } from "@tanstack/react-query";

export const useTopRatedMovies = () => {
  return useQuery({
    queryKey: ["topRatedMovies"],
    queryFn: async () => {
      const data = await getTopRated();
      return data.results.slice(0, 10);
    },
  });
};
