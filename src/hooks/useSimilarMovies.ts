import { getSimilar } from "../services/movieService";
import { useQuery } from "@tanstack/react-query";

export const useSimilarMovies = (movieId: number) => {
  return useQuery({
    queryKey: ["similarMovies", movieId ],
    queryFn: async () => {
      const data = await getSimilar(movieId);
      return data.results.slice(0, 5);
    }
  })
};
