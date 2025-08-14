import styles from "./MovieCard.module.css";
import type { Movie } from "../../types/movie";
import { API_CONFIG } from "../../config/api";

interface MovieCardProps {
  movie: Movie;
}

export const MovieCard = ({ movie }:MovieCardProps) => {
  const posterUrl = movie?.poster_path ?
    `${API_CONFIG.imageBaseUrl}${movie.poster_path}` :
    "";

  return (
    <div className={styles.movieCard}>
      <img className={styles.poster} src={posterUrl}/>
      <h3 className={styles.title}>{movie.title}</h3>
    </div>
  )
}
