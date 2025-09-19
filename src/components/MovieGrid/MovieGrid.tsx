import styles from "./MovieGrid.module.css";
import React, { useEffect } from "react";
import type { Movie } from "../../types";
import { MovieCard } from "../MovieCard/MovieCard";
import { useInView } from "react-intersection-observer";
import { Spinner } from "../Spinner/Spinner";

interface MovieGridProps {
  movies: Movie[];
  gridTitle?: string;
  icon?: React.ReactNode;
  // Pagination props
  hasNextPage?: boolean;
  isFetchingNextPage?: boolean;
  fetchNextPage?: () => void;
}

export const MovieGrid = React.memo(
  ({
    movies,
    gridTitle,
    icon,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  }: MovieGridProps) => {
    const { ref, inView } = useInView({
      threshold: 0,
      rootMargin: "400px", // Load more when 400px away from the bottom
    });

    useEffect(() => {
      if (inView && hasNextPage && !isFetchingNextPage && fetchNextPage) {
        fetchNextPage();
      }
    }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

    return (
      <div className={styles.movieGrid}>
        {gridTitle && (
          <h2 className={styles.gridTitle}>
            {icon && <p className={styles.icon}>{icon}</p>}
            <p className={styles.title}>{gridTitle}</p>
          </h2>
        )}
        {movies.length === 0 ? (
          <div className={styles.emptyContent}>
            <p>No movies found</p>
          </div>
        ) : (
          <>
            <div className={styles.grid}>
              {movies.map((movie, index) => (
                <MovieCard key={`${movie.id}-${index}`} movie={movie} />
              ))}
            </div>

            {/* Infinite scroll trigger and loader */}
            <div className={styles.loaderContainer}>
              {hasNextPage && (
                <div ref={ref}>
                  {isFetchingNextPage && <Spinner />}
                </div>
              )}
            </div>
          </>
        )}
      </div>
    );
  }
);
