import styles from "./Hero.module.css";
import type { Movie } from "../../types/movie";
import { API_CONFIG } from "../../config/api";

interface HeroProps {
  movie?: Movie;
}

export const Hero = ({ movie }: HeroProps) => {
  const backgroundUrl = movie?.backdrop_path
    ? `${API_CONFIG.imageBaseUrl}${movie?.backdrop_path}`
    : "";

  return (
    <div className={styles.hero}>
      <img className={styles.background} src={backgroundUrl} />
      <div className={styles.content}>
        <div className={styles.movieInfo}>
          <h1 className={styles.title}>
            {movie?.title || "Welcome to FilmBox"}
          </h1>
          <p className={styles.overview}>
            {movie?.overview ||
              "Discover and explore movies from around the world"}
          </p>

          <div className={styles.movieDetails}>
            {movie?.release_date && (
              <span className={styles.year}>
                📅 {new Date(movie.release_date).getFullYear()}
              </span>
            )}
            {movie?.vote_average && (
              <span className={styles.rating}>
                ⭐ {movie.vote_average.toFixed(1)}
              </span>
            )}
          </div>
        </div>
        <button>Go to movie</button>
      </div>
    </div>
  );
};
