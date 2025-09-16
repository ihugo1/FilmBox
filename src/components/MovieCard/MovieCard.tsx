import styles from "./MovieCard.module.css";
import { useNavigate } from "react-router-dom";
import type { Movie } from "../../types";
import { getImageUrl } from "../../config/tmdb.config";
import placeHolderImage from "../../../public/poster-placeholder.png";
import { IoPlay } from "react-icons/io5";
import { IoMdHeart, IoMdBookmark } from "react-icons/io";

interface MovieCardProps {
  movie: Movie;
}

export const MovieCard = ({ movie }: MovieCardProps) => {
  const navigate = useNavigate();
  const handleMovieClick = () => navigate(`/movie/${movie.id}`);

  return (
    <div>
      <div className={styles.movieCard}>
        <div className={styles.movieCardOverlay} onClick={handleMovieClick}>
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
        <div className={styles.cardButtons}>
          <button className={styles.favoriteButton}>
            <IoMdHeart />
          </button>
          <button className={styles.watchLaterButton}>
            <IoMdBookmark />
          </button>
        </div>
      </div>
    </div>
  );
};
