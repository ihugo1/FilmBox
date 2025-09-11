import { useQuery } from "@tanstack/react-query";
import { getSimilar } from "../../services/movie.service";

export const useSimilarMovies = (movieId: number) => {
  return useQuery({
    queryKey: ["similarMovies", movieId ],
    queryFn: async () => {
      const data = await getSimilar(movieId);
      return data.results.slice(0, 5);
    }
  })
};
