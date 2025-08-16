import styles from "./MovieCreditSection.module.css"
import { useCreditData } from "../../hooks/useCreditData"
import { API_CONFIG } from "../../config/api";
import { Spinner } from "../../components/Spinner/Spinner";
import placeholderImage from '/photo-placeholder.jpg';

interface MovieCreditSectionProps {
  movieId: number;
}

export const MovieCreditSection = ({ movieId }: MovieCreditSectionProps) => {
  const { castMembers, director, loading, error } = useCreditData(movieId);

  const getProfileImage = (profilePath?: string | null) => {
    return profilePath 
      ? `${API_CONFIG.imageBaseUrl}${profilePath}`
      : placeholderImage;
  };

  if (loading) return (
    <div className={styles.loadingContainer}>
      <Spinner size="medium" />
      <p>Loading credits...</p>
    </div>
  );
  if (error) return <div>Error loading credits: {error}</div>;

  return (
    <div className={styles.movieCreditSection}>
      <div className={styles.directorContainer}>
        <h3>Director</h3>
        <img src={getProfileImage(director?.profile_path)} alt={director?.name} />
        <div className={styles.directorInfoContainer}>
          <p className={styles.directorName}>{director?.name}</p>
        </div>
      </div>

      <div className={styles.castContainer}>
        <h3>Cast</h3>
        <ul className={styles.castList}>
          {castMembers.map(member => (
            <li key={member.name} className={styles.castMemberContainer}>
              <img
                src={getProfileImage(member.profile_path)}
                alt={member.name}
                className={styles.castImage}
              />
              <div className={styles.castInfoContainer}>
                <p className={styles.castName}>{member.name}</p>
                <p className={styles.castCharacter}>{member.character}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>

    </div>
  )
}
