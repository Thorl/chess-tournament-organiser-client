import axios from "axios";

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import styles from "./SignupPage.module.css";

const API_URL = process.env.REACT_APP_API_URL;

export const SignupPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);

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
      await axios.post(`${API_URL}/auth/signup`, requestBody);

      navigate("/login");
    } catch (error) {
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
        <label className={styles.signup__form__label} htmlFor="email">
          Email
        </label>
        <input
          className={styles.signup__form__input}
          type="text"
          id="email"
          placeholder="Enter email"
          value={email}
          onChange={handleEmailInput}
          required
        />
        <label className={styles.signup__form__label} htmlFor="password">
          Password
        </label>
        <input
          className={styles.signup__form__input}
          type="password"
          id="password"
          placeholder="Enter password"
          value={password}
          onChange={handlePasswordInput}
          required
        />
        <button className={styles.signup__form__btn}>Sign up</button>

        <p className={styles.signup__form__footer}>
          Already have an account? <Link to="/login">Log in</Link>
        </p>
      </form>
    </section>
  );
};
