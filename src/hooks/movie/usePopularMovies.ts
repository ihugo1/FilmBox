import { useQuery } from "@tanstack/react-query";
import { getPopular } from "../../services/movie.service";

export const usePopularMovies = () => {
  return useQuery({
    queryKey: ["popularMovies"],
    queryFn: async () => {
      const data = await getPopular();
      return data.results.slice(0, 10);
    }
  })
}
