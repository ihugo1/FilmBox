import styles from "./CreditsSection.module.css";
import { useCreditData } from "../../../hooks";
import { getImageUrl } from "../../../config/tmdb.config";
import { AsyncStateHandler } from "../../../components";
import profilePlaceHolder from "../../../assets/images/placeholders/photo-placeholder.jpg";

interface CreditsSectionProps {
  movieId: number;
}

export const CreditsSection = ({ movieId }: CreditsSectionProps) => {
  const { data, isLoading, error } = useCreditData(movieId);

  return (
    <AsyncStateHandler isLoading={isLoading} error={error}>
      <div className={styles.movieCreditSection}>
        <div className={styles.castContainer}>
          <h3>Top Cast</h3>
          <div className={styles.castList}>
            {data?.castMembers.map((castMember) => (
              <div className={styles.castMemberContainer} key={castMember.name}>
                <img
                  src={
                    castMember.name
                      ? getImageUrl(castMember.profile_path || "", "profile")
                      : profilePlaceHolder
                  }
                />
                <p className={styles.castMemberName}>{castMember.name}</p>
                <p className={styles.castMemberCharacter}>
                  {castMember.character}
                </p>
              </div>
            ))}
          </div>
        </div>
        <div className={styles.directorContainer}>
          <h3>Director</h3>
          <img
            src={
              data?.director?.profile_path
                ? getImageUrl(data.director.profile_path, "profile")
                : profilePlaceHolder
            }
            alt={data?.director?.name}
          />
          <p className={styles.directorName}>{data?.director?.name}</p>
        </div>
      </div>
    </AsyncStateHandler>
  );
};
