import axios from "axios";

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { API_URL } from "../../constants/API_URL";
import styles from "./ClassesPage.module.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

export const ClassesPage = () => {
  const [classes, setClasses] = useState([]);

  const getClasses = async () => {
    try {
      const storedAuthToken = localStorage.getItem("authToken");

      const response = await axios.get(`${API_URL}/classes`, {
        headers: { Authorization: `Bearer ${storedAuthToken}` },
      });

      const classesFromDb = response.data.classes;

      setClasses(classesFromDb);
    } catch (error) {
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
      <div className={styles.classesContainer}>
        {classes.map((classEl) => {
          return (
            <Link
              to={`/classes/${classEl._id}`}
              key={classEl._id}
              className={` ${styles.classes__dbClasses} ${styles.classes__card}`}
            >
              <h3 className={styles.className}>{classEl.name}</h3>
              <h3 className={styles.schoolName}>{classEl.school}</h3>
            </Link>
          );
        })}

        <div
          className={`${styles.classes__createNewClass} ${styles.classes__card}`}
        >
          <Link
            to="/classes/new-class"
            className={styles.classes__createNewClass__link}
          >
            <FontAwesomeIcon className={styles.icon} icon={faPlus} />
          </Link>
        </div>
      </div>
    </div>
  );
};
