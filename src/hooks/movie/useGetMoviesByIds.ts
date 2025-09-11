import { useQuery } from "@tanstack/react-query";
import { getMovieById } from "../../services/movie.service";

export const useGetMoviesByIds = (ids: number[]) => {
  return useQuery({
    queryKey: ["moviesByIds", ids],
    queryFn: 
      async () => {
        const data = await Promise.all(ids.map((id) => getMovieById(id)));
        return data;
      },
  });
};
