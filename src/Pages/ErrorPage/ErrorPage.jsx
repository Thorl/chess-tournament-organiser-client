import styles from "./ErrorPage.module.css";

import gif from "../../assets/magnus-carlsen-confusion-chess.gif";

export const ErrorPage = () => {
  return (
    <div className={styles.errorPage}>
      <h2>404 - Page Not Found</h2>
      <img src={gif} alt="A GIF of a confused Magnus Carlsen" />
      <p>
        We're sorry, the page you're trying to access doesn't seem to exist.
      </p>
    </div>
  );
};
