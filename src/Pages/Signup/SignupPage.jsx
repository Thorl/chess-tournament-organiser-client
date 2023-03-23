import axios from "axios";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

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

      console.log("Error: ", errorDescription);

      setErrorMessage(errorDescription);
    }
  };

  return (
    <section className={styles.signup}>
      <form className={styles.signup__form} onSubmit={handleSignupSubmit}>
        <label htmlFor="email">Email</label>
        <input
          type="text"
          id="email"
          placeholder="Enter email"
          value={email}
          onChange={handleEmailInput}
          required
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          placeholder="Enter password"
          value={password}
          onChange={handlePasswordInput}
          required
        />
        <button className={styles.signup__form__btn}>Sign up</button>
      </form>
      {errorMessage && (
        <p className={styles.signup__form__errorMessage}>{errorMessage}</p>
      )}
    </section>
  );
};
