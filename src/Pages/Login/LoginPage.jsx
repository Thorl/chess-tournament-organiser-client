import axios from "axios";

import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { AuthContext } from "../../context/auth.context";

import styles from "./LoginPage.module.css";
import spinner from "../../assets/chess-king-favicon.png";

const API_URL = process.env.REACT_APP_API_URL;

export const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const { storeAuthToken, authenticateUser } = useContext(AuthContext);

  const handleEmailInput = (e) => {
    setEmail(e.target.value);
  };
  const handlePasswordInput = (e) => {
    setPassword(e.target.value);
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    const requestBody = { email, password };

    try {
      setIsLoading(true);

      const response = await axios.post(`${API_URL}/auth/login`, requestBody);

      const authToken = response.data.authToken;

      storeAuthToken(authToken);

      authenticateUser();

      navigate("/profile");
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.error("An error occurred while trying to log in: ", error);

      const errorDescription = error.response.data.message;

      setErrorMessage(errorDescription);
    }
  };

  return (
    <section className={styles.login}>
      <h2 className={styles.login__header}>Log In</h2>
      {errorMessage && (
        <p className={styles.login__form__errorMessage}>{errorMessage}</p>
      )}
      <form className={styles.login__form} onSubmit={handleLoginSubmit}>
        <div className={styles.inputBox}>
          <input
            className={`${styles.input} ${styles.font}`}
            type="text"
            id="email"
            value={email}
            onChange={handleEmailInput}
            required
          />
          <span className={styles.inputSpan}>Enter email</span>
        </div>
        <div className={styles.inputBox}>
          <input
            className={`${styles.input} ${styles.font}`}
            type="password"
            id="password"
            value={password}
            onChange={handlePasswordInput}
            required
          />
          <span className={styles.inputSpan}>Enter password</span>
        </div>

        {!isLoading && (
          <button className={styles.login__form__btn}>Log in</button>
        )}

        {isLoading && (
          <img
            className={styles.login__form__spinner}
            src={spinner}
            alt="Loading spinner in the form of the black king piece"
          />
        )}
        <p className={styles.login__form__footer}>
          Don't have an account yet? <Link to="/signup">Sign up</Link>
        </p>
      </form>
    </section>
  );
};
