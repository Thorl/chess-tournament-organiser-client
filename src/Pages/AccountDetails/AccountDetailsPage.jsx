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
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          value={email}
          placeholder="Enter your email"
          onChange={handleEmailInput}
          required
        />
        <div className={styles.accountDetails__form__changePassword}>
          <h3>Change password</h3>
          <label htmlFor="currentPassword">Current Password</label>
          <input
            type="password"
            id="currentPassword"
            value={currentPassword}
            onChange={handleCurrentPasswordInput}
            placeholder="Enter your current password"
          />
          <label htmlFor="newPassword">New Password</label>
          <input
            type="password"
            id="newPassword"
            value={newPassword}
            onChange={handleNewPasswordInput}
            placeholder="Enter your new password"
          />
          <label htmlFor="repeatPassword">Repeat New Password</label>
          <input
            type="password"
            id="repeatPassword"
            value={repeatPassword}
            onChange={handleRepeatPasswordInput}
            placeholder="Repeat your new password"
          />
        </div>

        <button className={styles.accountDetails__form__btn}>Submit</button>
      </form>
    </div>
  );
};
