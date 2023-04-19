import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

import { useState } from "react";

import styles from "./SignupPage.module.css";

import spinner from "../../assets/chess-king-favicon.png";

const API_URL = process.env.REACT_APP_API_URL;

export const SignupPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleEmailInput = (e) => {
    setEmail(e.target.value);
  };
  const handlePasswordInput = (e) => {
    setPassword(e.target.value);
  };

  const handleSignupSubmit = async (e) => {
    e.preventDefault();

    const requestBody = { email, password };

    try {
      setIsLoading(true);

      await axios.post(`${API_URL}/auth/signup`, requestBody);

      navigate("/login");
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      const errorDescription = error.response.data.message;

      console.error("An error occurred while signing up: ", error);

      setErrorMessage(errorDescription);
    }
  };

  return (
    <section className={styles.signup}>
      <h2 className={styles.signup__header}>Sign Up</h2>
      {errorMessage && (
        <p className={styles.signup__form__errorMessage}>{errorMessage}</p>
      )}
      <form className={styles.signup__form} onSubmit={handleSignupSubmit}>
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
          <button className={styles.signup__form__btn}>Sign up</button>
        )}
        {isLoading && (
          <img
            className={styles.signup__form__spinner}
            src={spinner}
            alt="Loading spinner in the form of the black king piece"
          />
        )}

        <p className={styles.signup__form__footer}>
          Already have an account? <Link to="/login">Log in</Link>
        </p>
      </form>
    </section>
  );
};
