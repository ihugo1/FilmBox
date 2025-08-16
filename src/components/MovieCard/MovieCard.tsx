import styles from "./MovieCard.module.css";
import { Link } from "react-router-dom";
import type { Movie } from "../../types";
import { API_CONFIG } from "../../config/api";

interface MovieCardProps {
  movie: Movie;
}

export const MovieCard = ({ movie }: MovieCardProps) => {
  const posterUrl = movie?.poster_path
    ? `${API_CONFIG.imageBaseUrl}${movie.poster_path}`
    : "";

  return (
    <Link to={`/movie/${movie.id}`}>
      <div className={styles.movieCard}>
        <img className={styles.poster} src={posterUrl} />
        <h3 className={styles.title}>{movie.title}</h3>
      </div>
    </Link>
  );
};
