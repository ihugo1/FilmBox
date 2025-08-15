import styles from "./NavBar.module.css";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

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
      <Link to="/" className={styles.logo}>FilmBox</Link>
      <ul className={styles.navBarLinks}>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/search">Movies</Link></li>
        <li><Link to="/about">About</Link></li>
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
