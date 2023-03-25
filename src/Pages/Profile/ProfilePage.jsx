import { Link } from "react-router-dom";

import styles from "./ProfilePage.module.css";

export const ProfilePage = () => {
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
      </div>
    </div>
  );
};
