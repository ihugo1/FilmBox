import styles from "./MovieDetailPage.module.css";
import { useParams } from "react-router-dom";
import { InfoSection } from "./components/InfoSection";
import { VideosSection } from "./components/VideosSection";
import { CreditsSection } from "./components/CreditsSection";
import { MovieSlider } from "../../components";
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
      <CreditsSection movieId={movieId} />
      <VideosSection movieId={movieId} />
      <MovieSlider
        sliderTitle="You may also like"
        movies={similarMovies || []}
        isLoading={similarMoviesLoading}
        error={similarMoviesError?.message}
      />
    </div>
  );
};
