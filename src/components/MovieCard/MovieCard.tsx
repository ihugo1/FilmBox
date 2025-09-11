import styles from "./MovieCard.module.css";
import { Link } from "react-router-dom";
import type { Movie } from "../../types";
import { getImageUrl } from "../../config/tmdb.config";
import placeHolderImage from "../../../public/poster-placeholder.png";
import { IoPlay } from "react-icons/io5";


interface MovieCardProps {
  movie: Movie;
}

export const MovieCard = ({ movie }: MovieCardProps) => {
  return (
    <Link to={`/movie/${movie.id}`}>
      <div className={styles.movieCard}>
        <div className={styles.posterContainer}>
          <div className={styles.overlay}>
            <IoPlay className={styles.playIcon} />
          </div>
          <img
            className={styles.poster}
            src={
              movie.poster_path
                ? getImageUrl(movie.poster_path, "poster")
                : placeHolderImage
            }
            alt={movie.title}
          />
        </div>
        <div className={styles.rating}>
          ⭐{movie.vote_average?.toFixed(1)}
        </div>
        <h3 className={styles.title}>{movie.title}</h3>
      </div>
    </Link>
  );
};
