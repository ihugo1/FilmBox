import styles from "./HomePage.module.css";
import { Hero } from "./Hero";
import { MovieGrid } from "../../components/MovieGrid/MovieGrid";
import { usePopularMovies } from "../../hooks/usePopularMovies";
import { useTopRatedMovies } from "../../hooks/useTopRatedMovies";

export const HomePage = () => {
  const { movies: popularMovies, loading: loadingPopularMovies } =
    usePopularMovies();
  const { movies: topRatedMovies, loading: loadingTopRatedMovies } =
    useTopRatedMovies();

  return (
    <div className={styles.homePage}>
      <Hero movie={popularMovies[0]} />
      <section className={styles.popularSection}>
        <h2>Popular right now</h2>
        <MovieGrid movies={popularMovies} loading={loadingPopularMovies} />
      </section>
      <section className={styles.topRatedSection}>
        <h2>Top rated movies</h2>
        <MovieGrid movies={topRatedMovies} loading={loadingTopRatedMovies} />
      </section>
    </div>
  );
};
