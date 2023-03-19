import { Link } from "react-router-dom";
import styles from "./HomePage.module.css";

export const HomePage = () => {
  return (
    <main className={styles.homePage}>
      <p>Easily manage your classes' chess tournaments!</p>
      <section className={styles.homePage__btns}>
        <Link to="/signup">Sign up</Link>
        <Link to="/login">Log in</Link>
      </section>
    </main>
  );
};
