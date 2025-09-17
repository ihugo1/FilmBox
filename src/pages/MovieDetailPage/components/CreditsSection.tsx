import styles from "./CreditsSection.module.css";
import { useCreditData } from "../../../hooks";
import { getImageUrl } from "../../../config/tmdb.config";
import { AsyncStateHandler } from "../../../components";
import profilePlaceHolder from "../../../assets/images/placeholders/photo-placeholder.jpg";
import { useNavigate } from "react-router-dom";

interface CreditsSectionProps {
  movieId: number;
}

export const CreditsSection = ({ movieId }: CreditsSectionProps) => {
  const { data, isLoading, error } = useCreditData(movieId);
  const navigation = useNavigate();

  const handleOnPeopleClick = (personId?: number) => {
    if (personId) {
      navigation(`/person/${personId}`);
    }
  };


  return (
    <AsyncStateHandler isLoading={isLoading} error={error}>
      <div className={styles.movieCreditSection}>
        <div className={styles.castContainer}>
          <h3>Top Cast</h3>
          <div className={styles.castList}>
            {data?.castMembers.map((castMember) => (
              <div
                className={styles.castMemberContainer}
                key={castMember.name}
                onClick={() => handleOnPeopleClick(castMember.id)}
              >
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
        <div className={styles.directorContainer} onClick={() => handleOnPeopleClick(data?.director?.id)}>
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
