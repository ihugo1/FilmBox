import {
  searchMovies,
  discoverMovies,
  getPopular,
  type SortOption,
} from "../services/movieService";
import { useInfiniteQuery } from "@tanstack/react-query";

export const useMovieExplorer = (
  query: string,
  genreId: number | null,
  sortedBy: SortOption
) => {
  return useInfiniteQuery({
    queryKey: ["explorerMovieList", query, genreId, sortedBy],
    initialPageParam: 1,
    queryFn: async ({ pageParam }) => {
      let response;
      if (query.length >= 2) {
        response = await searchMovies(query, pageParam);
      } else if (genreId !== null) {
        response = await discoverMovies(genreId, sortedBy, pageParam);
      } else {
        response = await getPopular(pageParam);
      }
      return response;
    },
    getNextPageParam: (lastPage) => {
      if (lastPage.page < lastPage.total_pages) {
        return lastPage.page + 1;
      } else {
        return undefined;
      }
    },
  });
};
