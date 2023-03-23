import { useState } from "react";
import styles from "./AccountDetailsPage.module.css";

export const AccountDetailsPage = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");

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

  const handleSubmitAccountDetails = (e) => {
    e.preventDefault();

    //@TODO: Make a post request to the backend to save user data.
  };

  return (
    <div className={styles.accountDetails}>
      <h2>My Details</h2>
      <form
        className={styles.accountDetails__form}
        onSubmit={handleSubmitAccountDetails}
      >
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
