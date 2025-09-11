import { useQuery } from "@tanstack/react-query";
import { getMovieGenres } from "../../services/movie.service";

export const useMovieGenres = () => {
  return useQuery({
    queryKey: ["genres"],
    queryFn: async () => {
      const data = await getMovieGenres();
      return data.genres;
    }
  })
}