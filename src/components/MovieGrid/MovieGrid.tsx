import styles from "./MovieGrid.module.css";
import React from "react";
import type { Movie } from "../../types/movie";
import { MovieCard } from "../MovieCard/MovieCard";

interface MovieGridProps {
  movies: Movie[];
  loading: boolean;
}

export const MovieGrid = React.memo(({ movies, loading }: MovieGridProps) => {
  return (
    <div className={styles.movieGrid}>
      {movies.map((movie) => (
        <MovieCard movie={movie} key={movie.id} />
      ))}
    </div>
  );
});
