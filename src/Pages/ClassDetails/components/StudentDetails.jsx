import axios from "axios";

import { useState } from "react";

import { API_URL } from "../../../constants/API_URL";
import styles from "./StudentDetails.module.css";

export const StudentDetails = (props) => {
  const [isEditing, setIsEditing] = useState(false);
  const [studentNameInput, setStudentNameInput] = useState(props.student.name);
  const [studentTotalPointsInput, setStudentTotalPointsInput] = useState(
    props.student.pointsData.totalPoints
  );

  const handleStudentNameInput = (e) => {
    setStudentNameInput(e.target.value);
  };

  const handleStudentTotalPointsInput = (e) => {
    setStudentTotalPointsInput(e.target.value);
  };

  const toggleEditMode = () => {
    setIsEditing(isEditing ? false : true);
  };

  const handleDoneEditing = async (e) => {
    e.preventDefault();

    const requestBody = {
      studentId: props.student._id,
      name: studentNameInput,
      totalPoints: studentTotalPointsInput,
    };

    try {
      const storedAuthToken = localStorage.getItem("authToken");

      await axios.post(
        `${API_URL}/classes/${props.classId}/edit-student`,
        requestBody,
        { headers: { Authorization: `Bearer ${storedAuthToken}` } }
      );

      const getRequest = await axios.get(
        `${API_URL}/classes/${props.classId}`,
        { headers: { Authorization: `Bearer ${storedAuthToken}` } }
      );

      props.onUpdateClassData(getRequest.data);

      toggleEditMode();
    } catch (error) {
      console.error("An error occurred while editing student details: ", error);
    }
  };

  const handleDeleteStudent = async () => {
    try {
      const storedAuthToken = localStorage.getItem("authToken");

      const requestBody = { studentId: props.student._id };

      await axios.post(
        `${API_URL}/classes/${props.classId}/delete-student`,
        requestBody,
        { headers: { Authorization: `Bearer ${storedAuthToken}` } }
      );

      const getRequest = await axios.get(
        `${API_URL}/classes/${props.classId}`,
        { headers: { Authorization: `Bearer ${storedAuthToken}` } }
      );

      props.onUpdateClassData(getRequest.data);
    } catch (error) {
      console.error("An error occurred while deleting a student: ", error);
    }
  };
  return (
    <div className={styles.classDetails__classList__studentDetails}>
      {!isEditing && (
        <>
          <output>{props.student.name}</output>
          <output>{props.student.pointsData.totalPoints}</output>
          <button
            type="button"
            onClick={toggleEditMode}
            className={styles.classDetails__classList__studentDetails__editBtn}
          >
            Edit
          </button>
        </>
      )}
      {isEditing && (
        <form
          onSubmit={handleDoneEditing}
          className={styles.classDetails__classList__studentDetails__editMode}
        >
          <input
            type="text"
            value={studentNameInput}
            onChange={handleStudentNameInput}
          />
          <input
            type="text"
            value={studentTotalPointsInput}
            onChange={handleStudentTotalPointsInput}
          />
          <button
            type="submit"
            className={
              styles.classDetails__classList__studentDetails__editMode__doneBtn
            }
          >
            Done
          </button>
          <button
            onClick={handleDeleteStudent}
            type="button"
            className={
              styles.classDetails__classList__studentDetails__editMode__deleteBtn
            }
          >
            Delete Student
          </button>
        </form>
      )}
    </div>
  );
};
