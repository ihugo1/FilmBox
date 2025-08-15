import styles from "./Spinner.module.css";

interface SpinnerProps {
  size?: "small" | "medium" | "large";
  className?: string;
}

export const Spinner = ({ size = "medium", className }: SpinnerProps) => {
  return (
    <div 
      className={`${styles.spinner} ${styles[size]} ${className || ""}`}
      aria-label="Loading"
    />
  );
};