import styles from "./MovieVideoSection.module.css";
import { useMovieTrailer } from "../../hooks/useMovieTrailer";
import { Spinner } from "../../components/Spinner/Spinner";

interface MovieVideoSectionProps {
  movieId: number;
}

export const MovieVideoSection = ({ movieId }: MovieVideoSectionProps) => {
  const { data:trailer, isLoading, error } = useMovieTrailer(movieId);

  if (isLoading) return (
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
