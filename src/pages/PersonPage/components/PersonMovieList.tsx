import style from "./PersonMovieList.module.css";
import type { PersonCastCredit, PersonCrewCredit } from "../../../types";
import { getImageUrl } from "../../../config/tmdb.config";
import { useNavigate } from "react-router-dom";

interface Props {
  movies: (PersonCastCredit | PersonCrewCredit)[];
  title: string;
}

export const PersonMovieList = ({ movies, title }: Props) => {
  const navigation = useNavigate();
  const handleOnMovieClick = (id: number) => navigation(`/movie/${id}`);

  return (
    <div className={style.personMovieList}>
      <h3>{title}</h3>
      {movies.map((movie) => (
        <div
          key={movie.id + ((movie as PersonCastCredit).character || (movie as PersonCrewCredit).job)}
          className={style.movie}
          onClick={() => handleOnMovieClick(movie.id)}
        >
          <img
            className={style.moviePoster}
            src={getImageUrl(movie.poster_path, "poster")}
          />
          <div className={style.movieInfo}>
            <p className={style.movieTitle}>{movie.title}</p>
            {'character' in movie && movie.character && (
              <p className={style.character}>{movie.character}</p>
            )}
          </div>
          <p className={style.releaseDate}>
            {movie.release_date && `(${new Date(movie.release_date).getFullYear()})`}
          </p>
        </div>
      ))}
    </div>
  );
};
