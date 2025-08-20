import styles from "./MovieGrid.module.css";
import React from "react";
import type { Movie } from "../../types";
import { MovieCard } from "../MovieCard/MovieCard";

interface MovieGridProps {
  movies: Movie[];
}

export const MovieGrid = React.memo(({ movies }: MovieGridProps) => {
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
