import { Button, Modal } from "antd";
import axios from "axios";

import { useEffect, useState } from "react";

import { API_URL } from "../../constants/API_URL";
import styles from "./NewTournamentPage.module.css";
import { useNavigate } from "react-router-dom";

export const NewTournamentPage = () => {
  const [tournamentName, setTournamentName] = useState("");
  const [numberOfRounds, setNumberOfRounds] = useState("");
  const [schoolName, setSchoolName] = useState("");
  const [className, setClassName] = useState("");
  const [isModalOpen, setModalIsOpen] = useState(false);
  const [classes, setClasses] = useState([]);
  const [selectedClass, setSelectedClass] = useState([]);
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const getClasses = async () => {
    const storedAuthToken = localStorage.getItem("authToken");
    try {
      const response = await axios.get(`${API_URL}/classes`, {
        headers: { Authorization: `Bearer ${storedAuthToken}` },
      });

      const classes = response.data.classes;

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
  };

  const handleSetClassName = (className) => {
    setClassName(className);
  };

  const handleToggleModal = () => {
    setModalIsOpen(isModalOpen ? false : true);
  };

  const handleSelectClass = (selectedClass) => {
    setSelectedClass(selectedClass);
    handleSetClassName(selectedClass.name);
    handleSetSchoolName(selectedClass.school);
    setModalIsOpen(false);
  };

  const handleSelectStudent = (e) => {
    console.log("Clicked student: ", e.target.value);
    if (e.target.checked) {
      setSelectedStudents((currentStudents) => [
        ...currentStudents,
        e.target.value,
      ]);
    } else {
      const studentToRemove = e.target.value;
      const filteredStudents = selectedStudents.filter((student) => {
        return student !== studentToRemove;
      });
      setSelectedStudents(filteredStudents);
    }
  };

  const handleCreateTournament = async (e) => {
    e.preventDefault();

    try {
      const requestBody = {
        name: tournamentName,
        _class: selectedClass._id,
        school: schoolName,
        students: selectedStudents,
        numberOfRounds,
      };

      const storedAuthToken = localStorage.getItem("authToken");

      const response = await axios.post(
        `${API_URL}/tournaments/new-tournament`,
        requestBody,
        {
          headers: { Authorization: `Bearer ${storedAuthToken}` },
        }
      );

      console.log("Response: ", response);

      if (response.data.errorMessage) {
        setErrorMessage(response.data.errorMessage);
        return;
      }

      setErrorMessage("");

      const tournamentId = response.data.tournamentId;

      navigate(`/tournaments/${tournamentId}`);
    } catch (error) {
      console.error("An error occured while creating a tournament: ", error);
    }
  };

  return (
    <div className={styles.newTournament}>
      <form
        onSubmit={handleCreateTournament}
        className={styles.newTournament__form}
      >
        {errorMessage && (
          <p className={styles.newTournament__form_errorMessage}>
            {errorMessage}
          </p>
        )}
        <input
          type="text"
          placeholder="Enter a name for your tournament"
          value={tournamentName}
          onChange={handleTournamentNameInput}
          required
        />
        <input
          type="number"
          placeholder="Enter the number of rounds in your tournament"
          value={numberOfRounds}
          onChange={handleNumberOfRoundsInput}
          required
        />
        <Button type="primary" onClick={handleToggleModal}>
          Add Class
        </Button>

        {schoolName && (
          <>
            <label className={styles.newTournament__form__header}>School</label>
            <output>{schoolName}</output>
          </>
        )}

        {className && (
          <>
            <label className={styles.newTournament__form__header}>Class</label>
            <output>{className}</output>
          </>
        )}
        <h2>Students</h2>
        {selectedClass?.students?.map((student) => {
          return (
            <div key={student._id}>
              <input
                type="checkbox"
                value={student._id}
                onClick={handleSelectStudent}
              />
              <label>{student.name}</label>
            </div>
          );
        })}
        <button>Create Tournament</button>
      </form>
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
              <button onClick={() => handleSelectClass(_class)}>Select</button>
            </div>
          );
        })}
      </Modal>
    </div>
  );
};
