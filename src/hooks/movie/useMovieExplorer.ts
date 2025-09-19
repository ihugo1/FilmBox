import { useInfiniteQuery } from "@tanstack/react-query";
import {
  searchMovies,
  discoverMovies,
  getPopular,
} from "../../services/movie.service";
import type { SortOption } from "../../types";

export const useMovieExplorer = (
  query: string,
  genreId: number | null,
  sortedBy: SortOption
) => {
  const {
    data,
    isLoading,
    error,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
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

  const movies = data?.pages.flatMap((page) => page.results) || [];

  return{
    movies, isLoading, error, hasNextPage, fetchNextPage, isFetchingNextPage
  }
};
