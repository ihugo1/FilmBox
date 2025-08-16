import styles from "./MovieCard.module.css";
import { Link } from "react-router-dom";
import type { Movie } from "../../types";
import { API_CONFIG } from "../../config/api";
import placeHolderImage from "../../../public/poster-placeholder.png";

interface MovieCardProps {
  movie: Movie;
}

export const MovieCard = ({ movie }: MovieCardProps) => {
  const posterUrl = movie?.poster_path
    ? `${API_CONFIG.imageBaseUrl}${movie.poster_path}`
    : placeHolderImage;

  return (
    <Link to={`/movie/${movie.id}`}>
      <div className={styles.movieCard}>
        <img className={styles.poster} src={posterUrl} alt={movie.title} />
        <h3 className={styles.title}>{movie.title}</h3>
      </div>
    </Link>
  );
};
