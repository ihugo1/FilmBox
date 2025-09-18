import styles from "./HeroCarousel.module.css";
import { Hero } from "./Hero";
import type { Movie } from "../../../types";
import { useState, useEffect } from "react";

interface Props {
  movies: Movie[];
}

export const HeroCarousel = ({ movies }: Props) => {
  const [currentMovieIndex, setCurrentMovieIndex] = useState(0);
  const [touchStartX, setTouchStartX] = useState(0);

  const handleNextMovie = () => {
    setCurrentMovieIndex((prevIndex) => (prevIndex + 1) % movies.length);
  };

  const handlePrevMovie = () => {
    setCurrentMovieIndex(
      (prevIndex) => (prevIndex - 1 + movies.length) % movies.length
    );
  };

  const handleDotClick = (index: number) => {
    setCurrentMovieIndex(index);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX - touchEndX;

    if (diff > 50) {
      // Swiped left
      handleNextMovie();
    } else if (diff < -50) {
      // Swiped right
      handlePrevMovie();
    }
  };

  useEffect(() => {
    if (movies.length > 1) {
      const timer = setInterval(() => {
        handleNextMovie();
      }, 7000);

      return () => {
        clearInterval(timer);
      };
    }
  }, [movies.length, currentMovieIndex]);

  if (movies.length === 0) {
    return <Hero movie={null} />;
  }

  return (
    <div className={styles.heroCarousel}>
      <div
        className={styles.slidesContainer}
        style={{ transform: `translateX(-${currentMovieIndex * 100}%)` }}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {movies.map((movie) => (
          <div key={movie.id} className={styles.heroContainer}>
            <Hero movie={movie} />
          </div>
        ))}
      </div>
      <div className={styles.dotsContainer}>
        {movies.map((_, index) => (
          <div
            key={index}
            className={`${styles.dot} ${
              currentMovieIndex === index ? styles.activeDot : ""
            }`}
            onClick={() => handleDotClick(index)}
          />
        ))}
      </div>
    </div>
  );
};
