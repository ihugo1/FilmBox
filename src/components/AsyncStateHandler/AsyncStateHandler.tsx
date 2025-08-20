import styles from "./AsyncStateHandler.module.css";
import { Spinner } from "../Spinner/Spinner";

interface AsyncStateHandlerProps {
  isLoading: boolean;
  error: Error | null;
  children: React.ReactNode;
}

export const AsyncStateHandler = ({ isLoading, error,children,}: AsyncStateHandlerProps) => {
  
  if (isLoading) {
    return (
      <div className={styles.loading}>
        <Spinner size="medium" />
        <span>Loading...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.error}>
        <h3>😔 Something went wrong</h3>
        <p>{error.message || "An unexpected error occurred. Please try again."}</p>
      </div>
    );
  }

  return <>{children}</>;
};
