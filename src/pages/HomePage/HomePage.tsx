import styles from "./HomePage.module.css";
import { HeroCarousel } from "./components/HeroCarousel";
import { MovieSlider } from "../../components";
import { usePopularMovies, useTopRatedMovies } from "../../hooks";

import { useEffect } from "react";

export const HomePage = () => {
  const {
    data: popularMovies,
    isLoading: loadingPopularMovies,
    error: errorPopularMovies,
  } = usePopularMovies();

  const {
    data: topRatedMovies,
    isLoading: loadingTopRatedMovies,
    error: errorTopRatedMovies,
  } = useTopRatedMovies();

  useEffect(() => {
    document.title = "FilmBox - Home";
  }, []);

  const heroMovies = popularMovies ? popularMovies.slice(0, 5) : [];

  return (
    <div className={styles.homePage}>
      <HeroCarousel movies={heroMovies} />
      <MovieSlider
        sliderTitle="Trending"
        movies={popularMovies || []}
        isLoading={loadingPopularMovies}
        error={errorPopularMovies?.message}
      />
      <MovieSlider
        movies={topRatedMovies || []}
        sliderTitle="Top Rated"
        isLoading={loadingTopRatedMovies}
        error={errorTopRatedMovies?.message}
      />
    </div>
  );
};
