import axios from "axios";

import { useEffect, useState } from "react";

import { API_URL } from "../../constants/API_URL";
import styles from "./AccountDetailsPage.module.css";

export const AccountDetailsPage = () => {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
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

        const { email, firstName, lastName } = response.data;

        setEmail(email);

        if (firstName) {
          setFirstName(firstName);
        }

        if (lastName) {
          setLastName(lastName);
        }
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

  const handleFirstNameInput = (e) => {
    setFirstName(e.target.value);
  };

  const handleLastNameInput = (e) => {
    setLastName(e.target.value);
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
      firstName,
      lastName,
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

      const { email, firstName, lastName, errorMessage } = response.data;

      if (errorMessage) {
        setErrorMessage(errorMessage);
        return;
      }

      setEmail(email);

      setFirstName(firstName);

      setLastName(lastName);

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
      <h2>My Details</h2>
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
        />
        <label htmlFor="firstName">First Name</label>
        <input
          type="text"
          id="firstName"
          value={firstName}
          placeholder="Enter your first name"
          onChange={handleFirstNameInput}
        />
        <label htmlFor="lastName">Last Name</label>
        <input
          type="text"
          id="lastName"
          value={lastName}
          onChange={handleLastNameInput}
          placeholder="Enter your last name"
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
