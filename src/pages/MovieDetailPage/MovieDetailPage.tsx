import styles from "./MovieDetailPage.module.css";
import { useParams } from "react-router-dom";
import { InfoSection } from "./components/InfoSection";
import { VideosSection } from "./components/VideosSection";
import { CreditsSection } from "./components/CreditsSection";
import { MovieGrid, AsyncStateHandler } from "../../components";
import { useSimilarMovies } from "../../hooks";

export const MovieDetailPage = () => {
  const { id } = useParams();
  const movieId = id ? parseInt(id, 10) : 0;

  const {
    data: similarMovies,
    isLoading: similarMoviesLoading,
    error: similarMoviesError,
  } = useSimilarMovies(movieId);

  if (!id) {
    return <div>Movie not found</div>;
  }

  return (
    <div className={styles.movieDetailPage}>
      <InfoSection movieId={movieId} />
      <VideosSection movieId={movieId} />
      <CreditsSection movieId={movieId} />
      <section className={styles.similarSection}>
        <AsyncStateHandler
          isLoading={similarMoviesLoading}
          error={similarMoviesError}
        >
          <MovieGrid movies={similarMovies || []} gridTitle="Similar Movies" />
        </AsyncStateHandler>
      </section>
    </div>
  );
};
