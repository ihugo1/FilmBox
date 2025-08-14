import styles from "./MovieGrid.module.css";
import type { Movie } from "../../types/movie";
import { MovieCard } from "../MovieCard/MovieCard";

interface MovieGridProps {
  movies: Movie[];
  loading: boolean;
}

export const MovieGrid = ({ movies, loading }: MovieGridProps) => {
  if (loading) {
    return <div>Loading movies...</div>;
  }
  return (
    <div className={styles.movieGrid}>
      {movies.map((movie) => (
        <MovieCard movie={movie} key={movie.id} />
      ))}
    </div>
  );
};
