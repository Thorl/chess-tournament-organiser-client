import axios from "axios";

import React from "react";
import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { API_URL } from "../../constants/API_URL";
import styles from "./ClassDetailsPage.module.css";
import { StudentDetails } from "./components/StudentDetails";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

export const ClassDetailsPage = () => {
  const [classData, setClassData] = useState({});
  const [newStudentName, setNewStudentName] = useState("");

  const { classId } = useParams();

  const getClassData = useCallback(async () => {
    try {
      const storedAuthToken = localStorage.getItem("authToken");

      const response = await axios.get(`${API_URL}/classes/${classId}`, {
        headers: { Authorization: `Bearer ${storedAuthToken}` },
      });

      setClassData(response.data);
    } catch (error) {
      console.error(
        "An error occurred while loading class details data from the database: ",
        error
      );
    }
  }, [classId]);

  const handleUpdateClassData = (classDataObj) => {
    setClassData(classDataObj);
  };

  const handleNewStudentNameInput = (e) => {
    setNewStudentName(e.target.value);
  };

  const handleAddNewStudent = async (e) => {
    e.preventDefault();
    try {
      const storedAuthToken = localStorage.getItem("authToken");

      const requestBody = { name: newStudentName, classId };

      await axios.post(
        `${API_URL}/classes/${classId}/add-student`,
        requestBody,
        { headers: { Authorization: `Bearer ${storedAuthToken}` } }
      );

      const getRequest = await axios.get(`${API_URL}/classes/${classId}`, {
        headers: { Authorization: `Bearer ${storedAuthToken}` },
      });

      handleUpdateClassData(getRequest.data);

      setNewStudentName("");
    } catch (error) {
      console.error("An error occurred while adding a new student: ", error);
    }
  };

  useEffect(() => {
    getClassData();
  }, [getClassData]);

  return (
    <div className={styles.classDetails}>
      <div className={styles.classDetails__headersContainer}>
        <h2 className={styles.classDetails__mainHeader}>Class Details</h2>
        <h3 className={styles.classDetails__subHeader}>
          Class: {classData.name && classData.name}
        </h3>
        <h3 className={styles.classDetails__subHeader}>
          School: {classData.school && classData.school}
        </h3>
      </div>

      <div className={styles.classDetails__classList}>
        <h3 className={styles.classDetails__classList__header}>Student Name</h3>
        <h3 className={styles.classDetails__classList__header}>Total Points</h3>
        <div></div>
        {classData.students?.map((student) => {
          return (
            <React.Fragment key={student._id}>
              <StudentDetails
                student={student}
                onUpdateClassData={handleUpdateClassData}
                classId={classId}
              />
            </React.Fragment>
          );
        })}
      </div>
      <form
        onSubmit={handleAddNewStudent}
        className={styles.classDetails__addStudentForm}
      >
        <label
          className={styles.classDetails__addStudentForm__label}
          htmlFor="addStudent"
        >
          Add a New Student
        </label>
        <div className={styles.inputBox}>
          <input
            className={`${styles.input} ${styles.font}`}
            value={newStudentName}
            onChange={handleNewStudentNameInput}
            type="text"
            id="addStudent"
            required
          />
          <span className={styles.inputSpan}>Student Name</span>
          <button className={styles.newClass__form__addBtn}>
            <FontAwesomeIcon className={styles.icon} icon={faPlus} />
          </button>
        </div>
      </form>
    </div>
  );
};
