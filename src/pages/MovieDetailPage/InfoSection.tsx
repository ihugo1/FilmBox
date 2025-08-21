import styles from "./InfoSection.module.css";
import { useGetMovieById } from "../../hooks/useGetMovieById";
import { getImageUrl } from "../../config/api";
import { AsyncStateHandler } from "../../components/AsyncStateHandler/AsyncStateHandler";
import backdropPlaceHolder from "/flat-background.png";
import posterPlaceHolder from "./../../../public/poster-placeholder.png";

interface InfoSectionProps {
  movieId: number;
}

export const InfoSection = ({ movieId }: InfoSectionProps) => {
  const { data: movie, isLoading, error } = useGetMovieById(movieId);

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
