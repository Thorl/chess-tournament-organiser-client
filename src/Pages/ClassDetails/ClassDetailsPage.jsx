import axios from "axios";

import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { API_URL } from "../../constants/API_URL";
import styles from "./ClassDetailsPage.module.css";
import { StudentDetails } from "./components/StudentDetails";

export const ClassDetailsPage = () => {
  const [classData, setClassData] = useState({});

  const { classId } = useParams();

  const getClassData = useCallback(async () => {
    try {
      const storedAuthToken = localStorage.getItem("authToken");

      const response = await axios.get(`${API_URL}/classes/${classId}`, {
        headers: { Authorization: `Bearer ${storedAuthToken}` },
      });

      console.log("Class data: ", response.data);

      setClassData(response.data);
    } catch (error) {
      console.error(
        "An error occurred while loading class details data from the database: ",
        error
      );
    }
  }, [classId]);

  useEffect(() => {
    getClassData();
  }, [getClassData]);

  return (
    <div className={styles.classDetails}>
      <h2>Viewing Class Details</h2>
      <h3>Class: {classData.name && classData.name}</h3>
      <h3>School: {classData.school && classData.school}</h3>
      <div className={styles.classDetails__classList}>
        <h3>Student Name</h3>
        <h3>Total Points</h3>
        <div></div>
        {classData.students?.map((student) => {
          // let isEditing = false;

          /*  const handleActivateEditing = (isEditing) => {
            isEditing = isEditing ? false : true;
            console.log("Chaning edit status: ", isEditing);
          }; */

          /*  const handleSaveStudentData = (e) => {
            e.preventDefault();

            console.log("Saving student data");
          }; */

          return (
            <div
              key={student._id}
              className={styles.classDetails__classList__studentDetails}
            >
              <StudentDetails student={student} />

              {/* <form
                  onSubmit={handleSaveStudentData}
                  key={student._id}
                  className={`${isEditing} ? ${styles.showEditField} : ""`}
                >
                  <input type="text" value={student.name} />
                  <button>Save</button>
                </form> */}
            </div>
          );
        })}
      </div>
    </div>
  );
};
