import styles from "./Footer.module.css";
import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <div className={styles.footerSection}>
          <h3 className={styles.footerLogo}>🎬 FilmBox</h3>
          <p>Your ultimate movie discovery platform</p>
        </div>
        
        <div className={styles.footerSection}>
          <h4>Quick Links</h4>
          <ul className={styles.footerLinks}>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/search">Movies</Link></li>
            <li><Link to="/about">About</Link></li>
          </ul>
        </div>
        
        <div className={styles.footerSection}>
          <h4>Info</h4>
          <p>Powered by TMDB API</p>
          <p>© 2024 FilmBox</p>
        </div>
      </div>
    </footer>
  );
};