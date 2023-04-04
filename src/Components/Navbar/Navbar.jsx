import { useContext } from "react";

import { useLocation } from "react-router-dom";

import { AuthContext } from "../../context/auth.context";
import { HamburgerMenu } from "./components/HamburgerMenu";
import styles from "./Navbar.module.css";

export const Navbar = () => {
  const { isLoggedIn, logOutUser } = useContext(AuthContext);

  const currentPath = useLocation().pathname;

  return (
    <nav className={styles.navbar}>
      <h1>Chess Tournament Organiser</h1>
      {isLoggedIn && currentPath !== "/profile" && (
        <HamburgerMenu onLogout={logOutUser} />
      )}
    </nav>
  );
};
