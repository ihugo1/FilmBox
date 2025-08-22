import styles from "./MovieGrid.module.css";
import React from "react";
import type { Movie } from "../../types";
import { MovieCard } from "../MovieCard/MovieCard";

interface MovieGridProps {
  movies: Movie[];
  gridTitle?: string;
  icon?: React.ReactNode;
}

export const MovieGrid = React.memo(
  ({ movies, gridTitle, icon }: MovieGridProps) => {
    return (
      <div className={styles.movieGrid}>
        {gridTitle && (
          <h2 className={styles.gridTitle}>
            <p className={styles.icon}>{icon}</p>
            <p className={styles.title}>{gridTitle}</p>
          </h2>
        )}
        {movies.length === 0 ? (
          <div className={styles.emptyContent}>
            <p>No movies found</p>
          </div>
        ) : (
          <div className={styles.grid}>
            {movies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        )}
      </div>
    );
  }
);
