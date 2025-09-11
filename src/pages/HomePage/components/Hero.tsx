import styles from "./Hero.module.css";
import type { Movie } from "../../../types";
import { getImageUrl } from "../../../config/tmdb.config";
import { Button } from "../../../components";
import backgroundPlaceholder from "/flat-background.png";
import { useNavigate } from "react-router-dom";

interface HeroProps {
  movie: Movie | null;
}

export const Hero = ({ movie }: HeroProps) => {
  const navigate = useNavigate();

  const handleGoToMovie = () => {
    if (movie) {
      navigate(`/movie/${movie.id}`);
    }
    return;
  };

  return (
    <div className={styles.hero}>
      <img
        className={styles.background}
        src={
          movie?.backdrop_path
            ? getImageUrl(movie.backdrop_path, "backdrop")
            : backgroundPlaceholder
        }
        alt="Hero background"
      />

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

        <Button label="Go to movie" onClick={handleGoToMovie} />
      </div>
    </div>
  );
};
