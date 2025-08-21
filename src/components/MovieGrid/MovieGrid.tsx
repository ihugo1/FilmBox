import styles from "./MovieGrid.module.css";
import React from "react";
import type { Movie } from "../../types";
import { MovieCard } from "../MovieCard/MovieCard";

interface MovieGridProps {
  movies: Movie[];
  gridTitle?: string;
  icon?: React.ReactNode;
}

export const MovieGrid = React.memo(({ movies, gridTitle, icon }: MovieGridProps) => {
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
      {gridTitle && (
        <h2 className={styles.gridTitle}>{icon}{gridTitle}</h2>
      )}
      <div className={styles.grid}>
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
});
