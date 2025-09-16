import styles from "./MovieSlider.module.css";
import { MovieCard } from "../MovieCard/MovieCard";
import type { Movie } from "../../types";
import React, { useRef, useEffect } from "react";

interface Props {
  sliderTitle?: string;
  movies: Movie[];
  isLoading: boolean;
  error: string | undefined;
}

export const MovieSlider = React.memo(({ sliderTitle, movies, isLoading, error }: Props) => {
  const sliderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider || movies.length === 0) return;

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      
      const scrollAmount = e.deltaY * 3;
      slider.scrollTo({
        left: slider.scrollLeft + scrollAmount,
        behavior: 'smooth'
      });
    };

    // Delay para asegurar que el contenido esté renderizado
    const timeoutId = setTimeout(() => {
      slider.addEventListener('wheel', handleWheel, { passive: false });
    }, 100);

    return () => {
      clearTimeout(timeoutId);
      slider.removeEventListener('wheel', handleWheel);
    };
  }, [movies]);

  
  return (
    <div className={styles.movieSlider}>
      {sliderTitle && <h2 className={styles.sliderTitle}>{sliderTitle}</h2>}
      {movies.length === 0 ? (
        <div className={styles.emptyContent}>
          <p>No movies found</p>
        </div>
      ) : (
        <div ref={sliderRef} className={styles.slider}>
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      )}
    </div>
  );
});
