import styles from "./HomePage.module.css";
import { Hero } from './Hero'
import { MovieGrid } from '../../components/MovieGrid/MovieGrid';
import { usePopularMovies } from '../../hooks/usePopularMovies';

export const HomePage = () => {
  const { movies, loading } = usePopularMovies();

  return (
    <div className={styles.homePage}>
      <Hero movie={movies[0]}/>
      <section className={styles.popularSection}>
        <h2>Popular right now</h2>
        <MovieGrid movies={movies} loading={loading}/>
      </section>
    </div>
  )
}
