import { getMovieGenres } from "../services/movieService";
import { useQuery } from "@tanstack/react-query";

export const useMovieGenres = () => {
  return useQuery({
    queryKey: ["genres"],
    queryFn: async () => {
      const data = await getMovieGenres();
      return data.genres;
    }
  })
}