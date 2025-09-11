import styles from "./MovieListsPage.module.css";
import { useGetMoviesByIds } from "../../hooks";
import { MovieGrid, AsyncStateHandler } from "../../components";
import { useMovieLists } from "../../context/MovieListsContext";
import { IoMdHeart, IoMdBookmark } from "react-icons/io";

export const MovieListsPage = () => {
  const { watchLaterIds, favoriteIds } = useMovieLists();
  const {
    data: watchLaterMovies,
    isLoading: isLoadingWatchLater,
    error: errorWatchLater,
  } = useGetMoviesByIds(watchLaterIds);
  const {
    data: favoriteMovies,
    isLoading: isLoadingFavorites,
    error: errorFavorites,
  } = useGetMoviesByIds(favoriteIds);

  return (
    <div className={styles.movieListsPage}>
      <AsyncStateHandler
        isLoading={isLoadingWatchLater}
        error={errorWatchLater}
      >
        <MovieGrid
          movies={watchLaterMovies || []}
          gridTitle="Watch Later"
          icon={<IoMdBookmark />}
        />
      </AsyncStateHandler>
      <AsyncStateHandler isLoading={isLoadingFavorites} error={errorFavorites}>
        <MovieGrid
          movies={favoriteMovies || []}
          gridTitle="Favorites"
          icon={<IoMdHeart />}
        />
      </AsyncStateHandler>
    </div>
  );
};
