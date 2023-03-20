import axios from "axios";

import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

import { AuthContext } from "../../context/auth.context";

import styles from "./LoginPage.module.css";

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
      const response = await axios.post(
        "http://localhost:5005/auth/login",
        requestBody
      );

      const authToken = response.data.authToken;

      storeAuthToken(authToken);

      authenticateUser();

      navigate("/profile");
    } catch (error) {
      const errorDescription = error.response.data.message;

      setErrorMessage(errorDescription);
    }
  };

  return (
    <section className={styles.login}>
      <form className={styles.login__form} onSubmit={handleLoginSubmit}>
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
        <button className={styles.login__form__btn}>Sign up</button>
      </form>
      {errorMessage && (
        <p className={styles.login__form__errorMessage}>{errorMessage}</p>
      )}
    </section>
  );
};
