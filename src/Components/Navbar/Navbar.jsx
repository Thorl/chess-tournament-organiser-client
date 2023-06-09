import { useContext } from "react";

import { Link, useLocation } from "react-router-dom";

import { AuthContext } from "../../context/auth.context";
import { HamburgerMenu } from "./components/HamburgerMenu";
import styles from "./Navbar.module.css";

export const Navbar = () => {
  const { isLoggedIn, logOutUser } = useContext(AuthContext);

  const currentPath = useLocation().pathname;

  return (
    <nav className={styles.navbar}>
      <div className={styles.navbar__topRow}>
        <h1 className={styles.navbar__header}>Chesstament</h1>
        {isLoggedIn && currentPath !== "/profile" && (
          <>
            <button
              onClick={logOutUser}
              className={styles.navbar__topRow__logOutBtn}
            >
              Log out
            </button>
            <HamburgerMenu onLogout={logOutUser} />
          </>
        )}
      </div>
      {isLoggedIn && currentPath !== "/profile" && (
        <div className={styles.navbar__bottomRow}>
          <ul className={styles.navbar__bottomRow__navLinks}>
            <Link
              to="/profile"
              className={styles.navbar__bottomRow__navLinks__link}
            >
              Profile
            </Link>

            <Link
              to="/classes"
              className={styles.navbar__bottomRow__navLinks__link}
            >
              Classes
            </Link>
            <Link
              to="/tournaments"
              className={styles.navbar__bottomRow__navLinks__link}
            >
              Tournaments
            </Link>
            <Link
              to="/account-details"
              className={styles.navbar__bottomRow__navLinks__link}
            >
              Account Details
            </Link>
          </ul>
        </div>
      )}
    </nav>
  );
};
