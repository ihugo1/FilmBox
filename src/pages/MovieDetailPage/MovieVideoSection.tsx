import styles from "./MovieVideoSection.module.css";
import { useMovieTrailer } from "../../hooks/useMovieVideos";
import { Spinner } from "../../components/Spinner/Spinner";

interface MovieVideoSectionProps {
  movieId: number;
}

export const MovieVideoSection = ({ movieId }: MovieVideoSectionProps) => {
  const { trailer, loading, error } = useMovieTrailer(movieId);

  if (loading) return (
    <div className={styles.loadingContainer}>
      <Spinner size="medium" />
      <p>Loading trailer...</p>
    </div>
  );
  if (error) return <div>Error loading trailer</div>;
  if (!trailer) return <div>No trailer available</div>;

  return (
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
  );
};
