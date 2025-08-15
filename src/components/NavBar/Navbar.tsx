import styles from "./NavBar.module.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if(e.key === "Enter" && searchQuery.trim()){
      navigate(`/search?q=${searchQuery.trim()}`);
      setSearchQuery("");
    };
  }

  return (
    <div className={styles.navBar}>
      <h1 className={styles.logo}>FilmBox</h1>
      <ul className={styles.navBarLinks}>
        <li>Home</li>
        <li>Movies</li>
        <li>About</li>
      </ul>
      <div className={styles.searchBarContainer}>
        <input 
          type="text" 
          placeholder="Quick search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={handleSearch}
        />
      </div>
    </div>
  );
};
