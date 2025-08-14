import styles from "./MovieGrid.module.css";
import type { Movie } from "../../types/movie";

interface MovieGridProps {
  movies: Movie[];
  loading: boolean;
}

export const MovieGrid = ({ movies, loading }: MovieGridProps) => {
  if (loading) {
    return <div>Loading movies...</div>;
  }
  return (
    <div className={styles.grid}>
      {movies.map((movie) => (
        <div key={movie.id}>
          {movie.title}
        </div>
      ))}
    </div>
  );
};
