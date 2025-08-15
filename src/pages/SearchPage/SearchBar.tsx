import styles from "./SearchBar.module.css";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export const SearchBar = ({ value, onChange }: SearchBarProps) => {
  return (
    <div className={styles.searchBar}>
      <input
        value={value}
        type="text"
        placeholder="Search for movies..."
        onChange={(e)=>onChange(e.target.value)}
      />
    </div>
  )
}
