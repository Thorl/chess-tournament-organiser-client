import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { API_URL } from "../../constants/API_URL";
import styles from "./ClassesPage.module.css";
import spinner from "../../assets/chess-king-favicon.png";

export const ClassesPage = () => {
  const [classes, setClasses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getClasses = async () => {
    try {
      const storedAuthToken = localStorage.getItem("authToken");

      const response = await axios.get(`${API_URL}/classes`, {
        headers: { Authorization: `Bearer ${storedAuthToken}` },
      });

      const classesFromDb = response.data.classes;
      setIsLoading(false);
      setClasses(classesFromDb);
    } catch (error) {
      setIsLoading(false);
      console.error(
        "An error occurred while trying to load classes from the database: ",
        error
      );
    }
  };

  useEffect(() => {
    getClasses();
  }, []);

  return (
    <div className={styles.classes}>
      <h2 className={styles.classes__pageHeader}>My Classes</h2>
      <div className={styles.classes__cardContainer}>
        {isLoading && (
          <div className={styles.classes__cardContainer__loaderCard}>
            <img
              className={styles.classes__cardContainer__loaderCard__spinner}
              src={spinner}
              alt="Loading spinner in the form of the black king piece"
            />
            <p
              className={styles.classes__cardContainer__loaderCard__loadingText}
            >
              Loading...
            </p>
          </div>
        )}
        {classes.map((classEl) => {
          return (
            <Link
              to={`/classes/${classEl._id}`}
              key={classEl._id}
              className={styles.classes__cardContainer__card}
            >
              <h3 className={styles.classes__cardContainer__card__className}>
                {classEl.name}
              </h3>
              <h3 className={styles.classes__cardContainer__card__schoolName}>
                School: {classEl.school}
              </h3>
            </Link>
          );
        })}

        <Link
          to="/classes/new-class"
          className={`${styles.classes__cardContainer__newClassCard}`}
        >
          <FontAwesomeIcon
            className={styles.classes__cardContainer__newClassCard__plusIcon}
            icon={faPlus}
          />
        </Link>
      </div>
    </div>
  );
};
