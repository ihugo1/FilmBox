import styles from "./MovieGrid.module.css";
import React from "react";
import type { Movie } from "../../types/movie";
import { MovieCard } from "../MovieCard/MovieCard";
import { Spinner } from "../Spinner/Spinner";

interface MovieGridProps {
  movies: Movie[];
  loading: boolean;
  error?: string | null;
}

export const MovieGrid = React.memo(({ movies, loading, error }: MovieGridProps) => {
  if (loading && movies.length === 0) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.loadingContent}>
          <Spinner size="medium" />
          <h3>Loading movies...</h3>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.errorContainer}>
        <div className={styles.errorContent}>
          <h3>😔 Something went wrong</h3>
          <p>We couldn't load the movies. Please try again.</p>
        </div>
      </div>
    );
  }

  if (movies.length === 0) {
    return (
      <div className={styles.emptyContainer}>
        <div className={styles.emptyContent}>
          <h3>🎭 No movies found</h3>
          <p>Try a different search or check back later</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.movieGrid}>
      {movies.map((movie) => (
        <MovieCard movie={movie} key={movie.id} />
      ))}
    </div>
  );
});
