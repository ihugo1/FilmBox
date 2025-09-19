import styles from "./InfoSection.module.css";
import { useGetMovieById } from "../../../hooks/movie/useGetMovieById";
import { getImageUrl } from "../../../config/tmdb.config";
import { AsyncStateHandler } from "../../../components";
import { useMovieLists } from "../../../context/MovieListsContext";
import { IoMdHeart, IoMdBookmark } from "react-icons/io";
import backdropPlaceHolder from "/flat-background.png";
import posterPlaceHolder from "/poster-placeholder.png";
import { useEffect } from "react";

interface InfoSectionProps {
  movieId: number;
}

export const InfoSection = ({ movieId }: InfoSectionProps) => {
  const { data: movie, isLoading, error } = useGetMovieById(movieId);
  const {
    addToFavorite,
    isInFavorite,
    removeFromFavorite,
    addToWatchLater,
    isInWatchLater,
    removeFromWatchLater,
  } = useMovieLists();

  useEffect(() => {
    if (movie) {
      document.title = `${movie.title} - FilmBox`;
    }

    return () => {
      document.title = "FilmBox";
    };
  }, [movie]);

  const handleFavoriteButton = () => {
    if (!movie) return;
    if (isInFavorite(movie.id)) {
      removeFromFavorite(movie.id);
    } else {
      addToFavorite(movie.id);
    }
  };

  const handleWatchLaterButton = () => {
    if (!movie) return;
    if (isInWatchLater(movie.id)) {
      removeFromWatchLater(movie.id);
    } else {
      addToWatchLater(movie.id);
    }
  };

  return (
    <AsyncStateHandler isLoading={isLoading} error={error}>
      <section className={styles.infoSection}>
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

          <div className={styles.posterContainer}>
            <img
              src={
                movie?.poster_path
                  ? getImageUrl(movie.poster_path, "poster")
                  : posterPlaceHolder
              }
              alt={movie?.title}
            />
            <div className={styles.movieButtons}>
              {movie && (
                <>
                  <button
                    className={`${styles.favoriteButton} ${
                      movie && isInFavorite(movie.id) ? styles.added : ""
                    }`}
                    onClick={handleFavoriteButton}
                    aria-placeholder="Add to favorites"
                  >
                    <IoMdHeart />
                  </button>

                  <button
                    className={`${styles.watchLaterButton} ${
                      movie && isInWatchLater(movie.id) ? styles.added : ""
                    }`}
                    onClick={handleWatchLaterButton}
                  >
                    <IoMdBookmark />
                  </button>
                </>
              )}
            </div>
          </div>

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
                📃 <strong>Original Title:</strong> {movie?.original_title}
              </span>
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
      </section>
    </AsyncStateHandler>
  );
};
