import { useState } from "react";

import styles from "./HamburgerMenu.module.css";
import { Link } from "react-router-dom";

export const HamburgerMenu = (props) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleToggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <nav
        className={styles.hamburgerMenu__hamburger}
        onClick={handleToggleMenu}
      >
        <div
          className={`${styles.hamburgerMenu__hamburger__burger} 
        ${isMenuOpen ? styles.hamburgerMenu__hamburger__burger1 : ""}`}
        ></div>
        <div
          className={`${styles.hamburgerMenu__hamburger__burger} 
        ${isMenuOpen ? styles.hamburgerMenu__hamburger__burger2 : ""}`}
        ></div>
        <div
          className={`${styles.hamburgerMenu__hamburger__burger} 
         ${isMenuOpen ? styles.hamburgerMenu__hamburger__burger3 : ""}`}
        ></div>
      </nav>
      <ul
        className={`${styles.hamburgerMenu__dropdownMenu} 
          ${isMenuOpen ? styles.hamburgerMenu__dropdownMenu_show : ""}`}
      >
        <Link
          className={`${styles.hamburgerMenu__dropdownMenu__link} ${styles.hamburgerMenu__dropdownMenu__font}`}
          onClick={handleToggleMenu}
          to="/profile"
        >
          Profile
        </Link>
        <Link
          className={`${styles.hamburgerMenu__dropdownMenu__link} ${styles.hamburgerMenu__dropdownMenu__font}`}
          onClick={handleToggleMenu}
          to="/account-details"
        >
          Account Details
        </Link>
        <Link
          className={`${styles.hamburgerMenu__dropdownMenu__link} ${styles.hamburgerMenu__dropdownMenu__font}`}
          onClick={handleToggleMenu}
          to="/classes"
        >
          Classes
        </Link>
        <Link
          className={`${styles.hamburgerMenu__dropdownMenu__link} ${styles.hamburgerMenu__dropdownMenu__font}`}
          onClick={handleToggleMenu}
          to="/tournaments"
        >
          Tournaments
        </Link>
        <div className={styles.hamburgerMenu__dropdownMenu__btnContainer}>
          <button
            className={`${styles.hamburgerMenu__dropdownMenu__btnContainer__logOutBtn} ${styles.hamburgerMenu__dropdownMenu__font}`}
            onClick={props.onLogout}
          >
            Log Out
          </button>
        </div>
      </ul>
    </>
  );
};
