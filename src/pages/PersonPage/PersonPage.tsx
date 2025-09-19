import styles from "./PersonPage.module.css";
import { useGetPersonDetails, useGetPersonMovieCredits } from "../../hooks";
import { PersonMovieList } from "./components/PersonMovieList";
import { AsyncStateHandler } from "../../components";
import { getImageUrl } from "../../config/tmdb.config";
import { useParams } from "react-router-dom";
import { useEffect } from "react";

const calculateAge = (birthday: string, deathday?: string | null): number => {
  const birthDate = new Date(birthday);
  const endDate = deathday ? new Date(deathday) : new Date();
  let age = endDate.getFullYear() - birthDate.getFullYear();
  const m = endDate.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && endDate.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
};

export const PersonPage = () => {
  const { id } = useParams();
  const personId = id ? parseInt(id, 10) : 0;
  const { data: movieCredits, isLoading, error } = useGetPersonMovieCredits(personId);
  const {
    data: personData,
    isLoading: isLoadingPersonData,
    error: errorPersonData,
  } = useGetPersonDetails(personId);

  useEffect(() => {
    if (personData) {
      document.title = `${personData.name} - FilmBox`;
    }

    return () => {
      document.title = "FilmBox";
    };
  }, [personData]);

  return (
    <div className={styles.personPage}>
      <AsyncStateHandler
        isLoading={isLoadingPersonData}
        error={errorPersonData}
      >
        {personData && (
          <>
            <div className={styles.detailsContainer}>
              <div className={styles.imageContainer}>
                <img
                  src={getImageUrl(personData.profile_path, "profile")}
                  alt={personData.name}
                  className={styles.profileImage}
                />
              </div>
              <div className={styles.infoContainer}>
                <h1 className={styles.personName}>{personData.name}</h1>
                {personData.birthday && (
                  <div className={styles.personalInfo}>
                    <p>
                      <strong>Born:</strong>{" "}
                      {new Date(personData.birthday).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                      {personData.place_of_birth && ` in ${personData.place_of_birth}`}
                    </p>
                    <p>
                      <strong>Age:</strong>{" "}
                      {calculateAge(personData.birthday, personData.deathday)}
                      {personData.deathday && " (deceased)"}
                    </p>
                    {personData.deathday && (
                       <p>
                         <strong>Died:</strong>{" "}
                         {new Date(personData.deathday).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                       </p>
                    )}
                  </div>
                )}
                {personData.biography && (
                  <>
                    <h3>Biography</h3>
                    <p className={styles.biography}>{personData.biography}</p>
                  </>
                )}
              </div>
            </div>

            <div className={styles.movieListContainer}>
              <AsyncStateHandler isLoading={isLoading} error={error}>
                {movieCredits && movieCredits.directed.length > 0 && (
                  <PersonMovieList movies={movieCredits.directed} title="Directed" />
                )}
                {movieCredits && movieCredits.acting.length > 0 && (
                  <PersonMovieList movies={movieCredits.acting} title="Acting" />
                )}
              </AsyncStateHandler>
            </div>
          </>
        )}
      </AsyncStateHandler>
    </div>
  );
};
