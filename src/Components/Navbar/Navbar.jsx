import { useContext } from "react";

import { AuthContext } from "../../context/auth.context";
import styles from "./Navbar.module.css";

export const Navbar = () => {
  const { isLoggedIn, logOutUser } = useContext(AuthContext);

  return (
    <nav className={styles.navbar}>
      <h1>Chess Tournament Organiser</h1>
      {isLoggedIn && <button onClick={logOutUser}>Log out</button>}
    </nav>
  );
};
