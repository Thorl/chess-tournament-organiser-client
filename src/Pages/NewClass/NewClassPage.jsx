import axios from "axios";

import { useState } from "react";

import { generateKey } from "../../utils/generate-key";
import styles from "./NewClassPage.module.css";

import { API_URL } from "../../constants/API_URL";

export const NewClassPage = () => {
  const [className, setClassName] = useState("");
  const [schoolName, setSchoolName] = useState("");
  const [studentName, setStudentName] = useState("");
  const [classList, setClassList] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

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

      setSuccessMessage("Class Successfully Created!");
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
      <h2>Create A New Class</h2>
      {errorMessage && (
        <p className={styles.newClass__errorMessage}>{errorMessage}</p>
      )}
      {successMessage && (
        <p className={styles.newClass__successMessage}>{successMessage}</p>
      )}
      <form className={styles.newClass__form} onSubmit={handleAddStudent}>
        <label htmlFor="className">Class Name</label>
        <input
          type="text"
          id="className"
          value={className}
          onChange={handleClassNameInput}
          required
        />
        <label htmlFor="schoolName">School Name</label>
        <input
          type="text"
          id="schoolName"
          value={schoolName}
          onChange={handleSchoolNameInput}
          required
        />
        <label htmlFor="studentName">Student Name</label>
        <div className={styles.newClass__form__studentNameInput}>
          <input
            type="text"
            id="studentName"
            value={studentName}
            onChange={handleStudentNameInput}
          />
          <button className={styles.newClass__form__addBtn}>Add Student</button>
        </div>
      </form>
      <div className={styles.newClass__classList}>
        <h3>Class List</h3>
        {classList.map((student) => {
          return (
            <div
              key={generateKey()}
              className={styles.newClass__classList__student}
            >
              <p>{student.name}</p>
              <button onClick={() => handleRemoveStudent(student.id)}>
                Remove Student
              </button>
            </div>
          );
        })}
      </div>
      <button onClick={handleSaveClass}>Save Class</button>
    </div>
  );
};
