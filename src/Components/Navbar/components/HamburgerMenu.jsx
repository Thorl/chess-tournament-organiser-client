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
        <Link onClick={handleToggleMenu} to="/profile">
          Profile
        </Link>
        <Link onClick={handleToggleMenu} to="/account-details">
          Account Details
        </Link>
        <Link onClick={handleToggleMenu} to="/classes">
          Classes
        </Link>
        <Link onClick={handleToggleMenu} to="/tournaments">
          Tournaments
        </Link>
        <button onClick={props.onLogout}>Log Out</button>
      </ul>
    </>
  );
};
