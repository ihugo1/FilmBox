import styles from "./CreditsSection.module.css";
import { useCreditData } from "../../hooks/useCreditData";
import { getImageUrl } from "../../config/api";
import { AsyncStateHandler } from "../../components/AsyncStateHandler/AsyncStateHandler";
import profilePlaceHolder from "/photo-placeholder.jpg";

interface CreditsSectionProps {
  movieId: number;
}

export const CreditsSection = ({ movieId }: CreditsSectionProps) => {
  const { data, isLoading, error } = useCreditData(movieId);

  return (
    <AsyncStateHandler isLoading={isLoading} error={error}>
      <div className={styles.movieCreditSection}>
        <div className={styles.directorContainer}>
          <h3>Director</h3>
          <img
            src={
              data?.director?.profile_path
                ? getImageUrl(data?.director?.profile_path, "profile")
                : profilePlaceHolder
            }
            alt={data?.director?.name}
          />
          <div className={styles.directorInfoContainer}>
            <p className={styles.directorName}>{data?.director?.name}</p>
          </div>
        </div>

        <div className={styles.castContainer}>
          <h3>Cast</h3>
          <ul className={styles.castList}>
            {data?.castMembers?.map((member) => (
              <li key={member.name} className={styles.castMemberContainer}>
                <img
                  src={
                    member.profile_path
                      ? getImageUrl(member.profile_path, "profile")
                      : profilePlaceHolder
                  }
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
    </AsyncStateHandler>
  );
};
