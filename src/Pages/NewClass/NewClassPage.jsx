import axios from "axios";

import { useState } from "react";

import { generateKey } from "../../utils/generate-key";
import { API_URL } from "../../constants/API_URL";

import styles from "./NewClassPage.module.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faCircleMinus } from "@fortawesome/free-solid-svg-icons";

export const NewClassPage = () => {
  const [className, setClassName] = useState("");
  const [schoolName, setSchoolName] = useState("");
  const [studentName, setStudentName] = useState("");
  const [classList, setClassList] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [classListClassName, setClassListClassName] = useState("");

  const handleClassNameInput = (e) => {
    setClassName(e.target.value);
  };

  const handleSchoolNameInput = (e) => {
    setSchoolName(e.target.value);
  };

  const handleStudentNameInput = (e) => {
    setStudentName(e.target.value);
  };

  const handleAddStudent = (e) => {
    e.preventDefault();

    if (studentName.trim().length === 0) {
      setErrorMessage("Please enter a student name");
      return;
    }

    setClassList((prevList) => {
      return [...prevList, { name: studentName, id: generateKey() }];
    });

    setClassListClassName(className);

    setStudentName("");
    setErrorMessage("");
  };

  const handleRemoveStudent = (studentId) => {
    const filteredList = classList.filter((student) => {
      return student.id !== studentId;
    });

    setClassList(filteredList);
  };

  const handleSaveClass = async () => {
    const cleanedClassList = classList.map((student) => {
      return student.name;
    });
    const requestBody = {
      name: className,
      school: schoolName,
      students: cleanedClassList,
    };

    const storedAuthToken = localStorage.getItem("authToken");

    try {
      const response = await axios.post(
        `${API_URL}/classes/new-class`,
        requestBody,
        {
          headers: { Authorization: `Bearer ${storedAuthToken}` },
        }
      );

      const { errorMessage } = response.data;

      if (errorMessage) {
        setSuccessMessage("");
        setErrorMessage(errorMessage);
        return;
      }

      setSuccessMessage(`${className} created`);
      setClassName("");
      setSchoolName("");
      setClassList([]);
      setErrorMessage("");
    } catch (error) {
      console.error(
        "An error occurred while saving a class to the database: ",
        error
      );
      setErrorMessage(
        "An error occurred while saving a class to the database. Please try again."
      );
    }
  };

  return (
    <div className={styles.newClass}>
      <h2 className={styles.newClass__mainHeader}>Create a New Class</h2>
      {errorMessage && (
        <p className={styles.newClass__errorMessage}>{errorMessage}</p>
      )}
      {successMessage && (
        <p className={styles.newClass__successMessage}>{successMessage}</p>
      )}
      <form className={styles.newClass__form} onSubmit={handleAddStudent}>
        <div className={styles.inputBox}>
          <input
            className={`${styles.input} ${styles.font}`}
            type="text"
            id="className"
            value={className}
            onChange={handleClassNameInput}
            required
          />
          <span className={styles.inputSpan}>Class Name</span>
        </div>
        <div className={styles.inputBox}>
          <input
            className={`${styles.input} ${styles.font}`}
            type="text"
            id="schoolName"
            value={schoolName}
            onChange={handleSchoolNameInput}
            required
          />
          <span className={styles.inputSpan}>School Name</span>
        </div>

        <div className={styles.inputBox}>
          <input
            className={`${styles.input} ${styles.font}`}
            type="text"
            id="studentName"
            value={studentName}
            onChange={handleStudentNameInput}
            required
          />
          <span className={styles.inputSpan}>Student Name</span>
          <button className={styles.newClass__form__addBtn}>
            <FontAwesomeIcon className={styles.icon} icon={faPlus} />
          </button>
        </div>
      </form>
      {classListClassName && (
        <div className={styles.newClass__classList}>
          <>
            <h3 className={` ${styles.classListHeader} ${styles.font}`}>
              {classListClassName}
            </h3>
          </>

          <div className={styles.classList__names}>
            {classList.map((student, i) => {
              return (
                <div
                  key={generateKey()}
                  className={styles.newClass__classList__student}
                >
                  <p className={styles.newClass__classList__student__number}>
                    {i + 1}
                  </p>
                  <p
                    className={`${styles.newClass__classList__student__name} ${styles.font}`}
                  >
                    {student.name}
                  </p>
                  <button
                    className={styles.remove__student__btn}
                    onClick={() => handleRemoveStudent(student.id)}
                  >
                    <FontAwesomeIcon
                      className={styles.remove__student__btn__icon}
                      icon={faCircleMinus}
                    />
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}
      {classList.length > 0 && (
        <button className={styles.save__class__btn} onClick={handleSaveClass}>
          Save Class
        </button>
      )}
    </div>
  );
};
