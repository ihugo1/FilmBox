import styles from "./MovieCard.module.css";
import { Link } from "react-router-dom";
import type { Movie } from "../../types";
import { getImageUrl } from "../../config/api";
import placeHolderImage from "../../../public/poster-placeholder.png";

interface MovieCardProps {
  movie: Movie;
}

export const MovieCard = ({ movie }: MovieCardProps) => {
  return (
    <Link to={`/movie/${movie.id}`}>
      <div className={styles.movieCard}>
        <img
          className={styles.poster}
          src={
            movie.poster_path
              ? getImageUrl(movie.poster_path, "poster")
              : placeHolderImage
          }
          alt={movie.title}
        />
        <h3 className={styles.title}>{movie.title}</h3>
      </div>
    </Link>
  );
};
