import styles from "./MovieDatailPage.module.css";
import { useParams } from "react-router-dom";
import { getImageUrl } from "../../config/api";
import { MovieVideoSection } from "./MovieVideoSection";
import { MovieCreditSection } from "./MovieCreditSection";
import { MovieGrid } from "../../components/MovieGrid/MovieGrid";
import { useGetMovieById } from "../../hooks/useGetMovieById";
import { useSimilarMovies } from "../../hooks/useSimilarMovies";
import { Spinner } from "../../components/Spinner/Spinner";
import backdropPlaceHolder from "/flat-background.png";
import posterPlaceHolder from "./../../../public/poster-placeholder.png";

export const MovieDetailPage = () => {
  const { id } = useParams();

  const movieId = id ? parseInt(id, 10) : 0;

  const { data: movie, isLoading, error } = useGetMovieById(movieId);
  const {
    data: similarMovies,
    isLoading: similarMoviesLoading,
    error: similarMoviesError,
  } = useSimilarMovies(movieId);

  if (!id) {
    return <div>Movie not found</div>;
  }

  if (isLoading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.loadingContent}>
          <Spinner size="large" />
          <h2>Loading movie...</h2>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.errorContainer}>
        <div className={styles.errorContent}>
          <h2>😔 Oops! Something went wrong</h2>
          <p>We couldn't load this movie. Please try again later.</p>
          <button onClick={() => window.location.reload()}>Try Again</button>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className={styles.movieDetailPage}>
        <div className={styles.background}>
          <img
            src={
              movie?.backdrop_path
                ? getImageUrl(movie.backdrop_path, "backdrop")
                : backdropPlaceHolder
            }
            alt="Movie background"
          />
        </div>
        <div className={styles.content}>
          <img
            src={
              movie?.poster_path
                ? getImageUrl(movie.poster_path, "poster")
                : posterPlaceHolder
            }
            alt={movie?.title}
          />
          <div className={styles.movieInfo}>
            <h3 className={styles.title}>
              {movie?.title} (
              {new Date(movie?.release_date || "").getFullYear()})
            </h3>
            <div className={styles.movieGenres}>
              {movie?.genres.map((genre) => (
                <span key={genre.id} className={styles.genre}>
                  {genre.name}
                </span>
              ))}
            </div>
            <p className={styles.overview}>{movie?.overview}</p>
            <div className={styles.movieDetails}>
              <span>
                📅 <strong>Release Date:</strong> {movie?.release_date}
              </span>
              <span>
                🌍 <strong>Language:</strong>{" "}
                {movie?.original_language.toUpperCase()}
              </span>
              <span>
                ⭐ <strong>Rating:</strong> {movie?.vote_average}
              </span>
              <span>
                🎥 <strong>Runtime:</strong>{" "}
                {movie?.runtime
                  ? `${Math.floor(movie.runtime / 60)}h ${movie.runtime % 60}m`
                  : "N/A"}
              </span>
            </div>
          </div>
        </div>
      </div>
      <MovieVideoSection movieId={id ? parseInt(id, 10) : 0} />
      <MovieCreditSection movieId={id ? parseInt(id, 10) : 0} />
      <section className={styles.similarSection}>
        <h3>You may also like to watch</h3>
        <MovieGrid
          movies={similarMovies || []}
          loading={similarMoviesLoading}
          error={similarMoviesError?.message || null}
        />
      </section>
    </>
  );
};
