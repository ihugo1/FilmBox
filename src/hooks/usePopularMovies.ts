import { getPopular } from "../services/movieService";
import { useQuery } from "@tanstack/react-query";

export const usePopularMovies = () => {
  return useQuery({
    queryKey: ["popularMovies"],
    queryFn: async () => {
      const data = await getPopular();
      return data.results.slice(0, 10);
    }
  })
}
