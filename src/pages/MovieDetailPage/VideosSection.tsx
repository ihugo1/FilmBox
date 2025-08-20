import styles from "./VideosSection.module.css";
import { useMovieTrailer } from "../../hooks/useMovieTrailer";
import { AsyncStateHandler } from "../../components/AsyncStateHandler/AsyncStateHandler";

interface VideoSectionProps {
  movieId: number;
}

export const VideosSection = ({ movieId }: VideoSectionProps) => {
  const { data: trailer, isLoading, error } = useMovieTrailer(movieId);

  return (
    <AsyncStateHandler isLoading={isLoading} error={error}>
      {trailer ? (
        <div className={styles.movieVideoSection}>
          <div className={styles.trailerContainer}>
            <h2>Official Trailer</h2>
            <iframe
              src={`https://youtube.com/embed/${trailer.key}`}
              title={trailer.name}
              allowFullScreen
              className={styles.trailer}
            />
          </div>
        </div>
      ) : (
        <div className={styles.noTrailerContainer}>
          <h3>🎬 No trailer available</h3>
          <p>This movie doesn't have an official trailer yet.</p>
        </div>
      )}
    </AsyncStateHandler>
  );
};
