import { Link } from "react-router-dom";
import styles from "./HomePage.module.css";

export const HomePage = () => {
  return (
    <main className={styles.homePage}>
      <section className={styles.homePage__container}>
        <p className={styles.homePage__container__copy}>
          Chesstament is a tool for teachers to easily create and manage chess
          tournaments in the Swiss style
        </p>
        <Link
          className={`${styles.homePage__container__link} ${styles.homePage__container__link__signup}`}
          to="/signup"
        >
          Sign up
        </Link>
        <Link
          className={`${styles.homePage__container__link} ${styles.homePage__container__link__login}`}
          to="/login"
        >
          Log in
        </Link>
      </section>
    </main>
  );
};
