import styles from "./HeroCarousel.module.css";
import { Hero } from "./Hero";
import type { Movie } from "../../../types";
import { useState, useEffect } from "react";

interface Props {
  movies: Movie[];
}

export const HeroCarousel = ({ movies }: Props) => {
  const [currentMovieIndex, setCurrentMovieIndex] = useState(0);

  const handleNextMovie = () => {
    setCurrentMovieIndex((prevIndex) => (prevIndex + 1) % movies.length);
  };

  const handleDotClick = (index: number) => {
    setCurrentMovieIndex(index);
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
