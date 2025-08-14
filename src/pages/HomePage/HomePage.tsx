import styles from "./HomePage.module.css";
import { Hero } from './Hero'
import { MovieGrid } from '../../components/MovieGrid/MovieGrid';
import { usePopularMovies } from '../../hooks/usePopularMovies';

export const HomePage = () => {
  const { movies, loading } = usePopularMovies();

  return (
    <div className={styles.homePage}>
      <Hero movie={movies[4]}/>
      <MovieGrid movies={movies} loading={loading}/>
    </div>
  )
}
