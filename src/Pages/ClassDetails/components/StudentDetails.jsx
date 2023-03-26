import { useState } from "react";
import styles from "./StudentDetails.module.css";

export const StudentDetails = (props) => {
  const [isEditing, setIsEditing] = useState(false);
  const [studentNameInput, setStudentNameInput] = useState(props.student.name);
  const [studentTotalPointsInput, setStudentTotalPointsInput] = useState(0);

  const handleStudentNameInput = (e) => {
    setStudentNameInput(e.target.value);
  };

  const handleStudentTotalPointsInput = (e) => {
    setStudentTotalPointsInput(e.target.value);
  };

  const toggleEditMode = () => {
    setIsEditing(isEditing ? false : true);
  };

  const handleDoneEditing = (e) => {
    e.preventDefault();

    //@TODO: Send axios post request to update the student data
  };
  return (
    <>
      {!isEditing && (
        <>
          <p>{props.student.name}</p>
          <p>{props.student.pointsData.totalPoints}</p>
          <button
            onClick={toggleEditMode}
            className={styles.classDetails__classList__studentDetails__btn}
          >
            Edit
          </button>
        </>
      )}
      {isEditing && (
        <form
          onSubmit={handleDoneEditing}
          className={styles.classDetails__classList__studentDetails__edit}
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
          <button onClick={toggleEditMode}>Done</button>
          <button
            className={
              styles.classDetails__classList__studentDetails__edit__deleteBtn
            }
          >
            Delete Student
          </button>
        </form>
      )}
    </>
  );
};
