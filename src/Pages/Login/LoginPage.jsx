import axios from "axios";

import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { AuthContext } from "../../context/auth.context";

import styles from "./LoginPage.module.css";

const API_URL = process.env.REACT_APP_API_URL;

export const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);

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
      const response = await axios.post(`${API_URL}/auth/login`, requestBody);

      const authToken = response.data.authToken;

      storeAuthToken(authToken);

      authenticateUser();

      navigate("/profile");
    } catch (error) {
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
        <label className={styles.login__form__label} htmlFor="email">
          Email
        </label>
        <input
          className={styles.login__form__input}
          type="text"
          id="email"
          placeholder="Enter email"
          value={email}
          onChange={handleEmailInput}
          required
        />
        <label className={styles.login__form__label} htmlFor="password">
          Password
        </label>
        <input
          className={styles.login__form__input}
          type="password"
          id="password"
          placeholder="Enter password"
          value={password}
          onChange={handlePasswordInput}
          required
        />
        <button className={styles.login__form__btn}>Log in</button>
        <p className={styles.login__form__footer}>
          Don't have an account yet? <Link to="/signup">Sign up</Link>
        </p>
      </form>
    </section>
  );
};
