import styles from "./HomePage.module.css";
import { Hero } from "./Hero";
import { MovieGrid } from "../../components/MovieGrid/MovieGrid";
import { usePopularMovies } from "../../hooks/usePopularMovies";
import { useTopRatedMovies } from "../../hooks/useTopRatedMovies";
import { AsyncStateHandler } from "../../components/AsyncStateHandler/AsyncStateHandler";
import { ImFire } from "react-icons/im";
import { FaTrophy } from "react-icons/fa";

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

  return (
    <div className={styles.homePage}>
      <Hero movie={popularMovies?.[0] || null} />
      <section className={styles.popularSection}>
        <AsyncStateHandler
          isLoading={loadingPopularMovies}
          error={errorPopularMovies || null}
        >
          <MovieGrid movies={popularMovies || []} gridTitle="Trending" icon={<ImFire />} />
        </AsyncStateHandler>
      </section>
      <section className={styles.topRatedSection}>
        <AsyncStateHandler
          isLoading={loadingTopRatedMovies}
          error={errorTopRatedMovies || null}
        >
          <MovieGrid movies={topRatedMovies || []} gridTitle="Top Rated" icon={<FaTrophy />} />
        </AsyncStateHandler>
      </section>
    </div>
  );
};
