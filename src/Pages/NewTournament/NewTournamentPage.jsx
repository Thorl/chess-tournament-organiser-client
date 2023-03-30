import { Button, Modal } from "antd";
import axios from "axios";

import { useEffect, useState } from "react";

import { API_URL } from "../../constants/API_URL";
import styles from "./NewTournamentPage.module.css";

export const NewTournamentPage = () => {
  const [tournamentName, setTournamentName] = useState("");
  const [numberOfRounds, setNumberOfRounds] = useState("");
  const [schoolName, setSchoolName] = useState("");
  const [className, setClassName] = useState("");
  const [isModalOpen, setModalIsOpen] = useState(false);
  const [classes, setClasses] = useState([]);
  const [selectedClass, setSelectedClass] = useState([]);

  const getClasses = async () => {
    const storedAuthToken = localStorage.getItem("authToken");
    try {
      const response = await axios.get(`${API_URL}/classes`, {
        headers: { Authorization: `Bearer ${storedAuthToken}` },
      });

      const classes = response.data.classes;

      console.log("Classes: ", classes);

      setClasses(classes);
    } catch (error) {
      console.error("An error occurred while loading classes: ", error);
    }
  };

  useEffect(() => {
    getClasses();
  }, []);

  const handleTournamentNameInput = (e) => {
    setTournamentName(e.target.value);
  };

  const handleNumberOfRoundsInput = (e) => {
    setNumberOfRounds(e.target.value);
  };

  const handleSetSchoolName = (schoolName) => {
    setSchoolName(schoolName);
    //@TODO: When selecting a class, set the school's name and output it under the "Add Class" button
  };

  const handleSetClassName = (className) => {
    setClassName(className);
    //@TODO: When selecting a class, set the class' name and output it under the "Add Class" button
  };

  const handleToggleModal = () => {
    setModalIsOpen(isModalOpen ? false : true);
  };

  const handleSelectClass = (selectedClass) => {
    setSelectedClass(selectedClass);
    setModalIsOpen(false);
  };

  const handleSelectStudent = (e) => {
    if (e.target.checked) {
      console.log("Checkbox value: ", e.target.value);
    }

    //@TODO: If the box is checked, add student to array of selectedStudents.
    // If the box is unchecked, filter out the student from the selectedStudents array.
  };

  return (
    <div className={styles.newTournament}>
      <form className={styles.newTournament__form}>
        <input
          type="text"
          placeholder="Enter a new for your tournament"
          value={tournamentName}
          onChange={handleTournamentNameInput}
        />
        <input
          type="number"
          placeholder="Enter the number of rounds"
          value={numberOfRounds}
          onChange={handleNumberOfRoundsInput}
        />
        <Button type="primary" onClick={handleToggleModal}>
          Add Class
        </Button>
        <Modal
          title="Select a class"
          open={isModalOpen}
          onCancel={handleToggleModal}
          okButtonProps={{ style: { display: "none" } }}
        >
          <p>Pick one of your classes to make a tournament for:</p>
          <div>
            <h2>School</h2>
            <h2>Class</h2>
          </div>

          {classes.map((_class) => {
            return (
              <div
                key={_class._id}
                className={styles.newTournament__form__modal__class}
              >
                <p>{_class.school}</p>
                <p>{_class.name}</p>
                <button onClick={() => handleSelectClass(_class)}>
                  Select
                </button>
              </div>
            );
          })}
        </Modal>
        {schoolName && <output>{schoolName}</output>}
        {className && <output>{className}</output>}
        {selectedClass?.students?.map((student) => {
          return (
            <div key={student._id}>
              <input
                type="checkbox"
                value={student.name}
                onClick={handleSelectStudent}
              />
              <label>{student.name}</label>
            </div>
          );
        })}
      </form>
    </div>
  );
};
