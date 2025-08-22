import styles from "./NavBar.module.css";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { IoFilmOutline, IoHome, IoInformationCircle } from "react-icons/io5";

export const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && searchQuery.trim()) {
      navigate(`/search?q=${searchQuery.trim()}`);
      setSearchQuery("");
    };
  }

  return (
    <div className={styles.navBar}>
      <Link to="/" className={styles.logo}>
        <div className={styles.logoFilm}><IoFilmOutline />Film</div>
        <div className={styles.logoBox}>Box</div>
      </Link>
      <ul className={styles.navBarLinks}>
        <li><Link className={styles.navBarLink} to="/"><IoHome />Home</Link></li>
        <li><Link className={styles.navBarLink} to="/search"><IoFilmOutline />Movies</Link></li>
        <li><Link className={styles.navBarLink} to="/about"><IoInformationCircle />About</Link></li>
                <li><Link className={styles.navBarLink} to="/lists"><IoInformationCircle />My lists</Link></li>
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
