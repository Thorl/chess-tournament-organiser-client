import axios from "axios";

import { useEffect, useState } from "react";

import { API_URL } from "../../constants/API_URL";
import styles from "./AccountDetailsPage.module.css";

export const AccountDetailsPage = () => {
  const [email, setEmail] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const storedAuthToken = localStorage.getItem("authToken");

  useEffect(() => {
    const loadExistingTeacherData = async () => {
      try {
        const response = await axios.get(`${API_URL}/account-details`, {
          headers: { Authorization: `Bearer ${storedAuthToken}` },
        });

        const { email } = response.data;

        setEmail(email);
      } catch (error) {
        console.error(
          "An error occurred while getting account details data: ",
          error
        );
      }
    };

    loadExistingTeacherData();
  }, [storedAuthToken]);

  const handleEmailInput = (e) => {
    setEmail(e.target.value);
  };

  const handleCurrentPasswordInput = (e) => {
    setCurrentPassword(e.target.value);
  };

  const handleNewPasswordInput = (e) => {
    setNewPassword(e.target.value);
  };

  const handleRepeatPasswordInput = (e) => {
    setRepeatPassword(e.target.value);
  };

  const handleSubmitAccountDetails = async (e) => {
    e.preventDefault();

    const requestBody = {
      email,
      currentPassword,
      newPassword,
      repeatedNewPassword: repeatPassword,
    };

    try {
      const response = await axios.post(
        `${API_URL}/account-details`,
        requestBody,
        {
          headers: { Authorization: `Bearer ${storedAuthToken}` },
        }
      );

      const { email, errorMessage } = response.data;

      if (errorMessage) {
        setErrorMessage(errorMessage);
        return;
      }

      setEmail(email);

      setSuccessMessage("Account Details Successfully Updated!");

      setCurrentPassword("");

      setNewPassword("");

      setRepeatPassword("");

      setErrorMessage("");
    } catch (error) {
      console.error(
        "An error occurred while updating account details: ",
        error
      );
    }
  };

  return (
    <div className={styles.accountDetails}>
      <h2 className={styles.accountDetails__mainHeader}>My Details</h2>
      {errorMessage && (
        <p className={styles.accountDetails__errorMessage}>{errorMessage}</p>
      )}

      {successMessage && (
        <p className={styles.accountDetails__successMessage}>
          {successMessage}
        </p>
      )}
      <form
        className={styles.accountDetails__form}
        onSubmit={handleSubmitAccountDetails}
      >
        <h3 className={`${styles.font} ${styles.email}`}>Email</h3>
        <div className={styles.inputBoxChangePassword}>
          <input
            className={`${styles.input} ${styles.font}`}
            type="email"
            id="email"
            value={email}
            onChange={handleEmailInput}
            required
          />
          <span className={styles.inputSpan}>Enter your email</span>
        </div>
        <div className={styles.accountDetails__form__changePassword}>
          <h3 className={`${styles.font} ${styles.email}`}>Change Password</h3>
          <div className={styles.inputBoxContainer}>
            <div className={styles.inputBoxChangePassword}>
              <input
                className={`${styles.input} ${styles.font}`}
                type="password"
                id="currentPassword"
                value={currentPassword}
                onChange={handleCurrentPasswordInput}
                required
              />
              <span className={styles.inputSpan}>Current Password</span>
            </div>
            <div className={styles.inputBoxChangePassword}>
              <input
                className={`${styles.input} ${styles.font}`}
                type="password"
                id="newPassword"
                value={newPassword}
                onChange={handleNewPasswordInput}
                required
              />
              <span className={styles.inputSpan}>New Password</span>
            </div>
            <div className={styles.inputBoxChangePassword}>
              <input
                className={`${styles.input} ${styles.font}`}
                type="password"
                id="repeatPassword"
                value={repeatPassword}
                onChange={handleRepeatPasswordInput}
                required
              />
              <span className={styles.inputSpan}>Repeat New Password</span>
            </div>
          </div>
        </div>

        <button
          className={`${styles.accountDetails__form__btn} ${styles.font}`}
        >
          Submit
        </button>
      </form>
    </div>
  );
};
