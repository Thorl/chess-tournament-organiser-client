import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/auth.context";

import styles from "./ProfilePage.module.css";

export const ProfilePage = () => {
  const { logOutUser } = useContext(AuthContext);
  return (
    <div className={styles.profile}>
      <div className={styles.profile__navLinks}>
        <Link className={styles.profile__navLinks__item} to="/tournaments">
          Tournaments
        </Link>
        <Link className={styles.profile__navLinks__item} to="/classes">
          Classes
        </Link>
        <Link className={styles.profile__navLinks__item} to="/account-details">
          Account Details
        </Link>

        <input
          type="button"
          onClick={logOutUser}
          className={styles.profile__navLinks__logoutBtn}
          value="Log Out"
        />
      </div>
    </div>
  );
};
