import styles from "./CreditsSection.module.css";
import { useCreditData } from "../../../hooks";
import { getImageUrl } from "../../../config/tmdb.config";
import { AsyncStateHandler } from "../../../components";
import profilePlaceHolder from "/photo-placeholder.jpg";
import { GiFilmProjector } from "react-icons/gi";
import { FaUserLarge } from "react-icons/fa6";

interface CreditsSectionProps {
  movieId: number;
}

export const CreditsSection = ({ movieId }: CreditsSectionProps) => {
  const { data, isLoading, error } = useCreditData(movieId);

  return (
    <AsyncStateHandler isLoading={isLoading} error={error}>
      <div className={styles.movieCreditSection}>
        <h3>
          <GiFilmProjector className={styles.icon} />
          Director
        </h3>
        <div className={styles.directorContainer}>
          <img
            src={
              data?.director?.profile_path
                ? getImageUrl(data?.director?.profile_path, "profile")
                : profilePlaceHolder
            }
            alt={data?.director?.name}
          />
          <p className={styles.directorName}>{data?.director?.name}</p>
        </div>
        <h3>
          <FaUserLarge className={styles.icon} />
          Cast
        </h3>
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
              <p className={styles.castName}>{member.name}</p>
              <p className={styles.castCharacter}>{member.character}</p>
            </li>
          ))}
        </ul>
      </div>
    </AsyncStateHandler>
  );
};
