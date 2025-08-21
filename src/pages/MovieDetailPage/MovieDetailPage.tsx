import styles from "./MovieDetailPage.module.css";
import { useParams } from "react-router-dom";
import { InfoSection } from "./InfoSection";
import { VideosSection } from "./VideosSection";
import { CreditsSection } from "./CreditsSection";
import { MovieGrid } from "../../components/MovieGrid/MovieGrid";
import { useSimilarMovies } from "../../hooks/useSimilarMovies";
import { AsyncStateHandler } from "../../components/AsyncStateHandler/AsyncStateHandler";

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
