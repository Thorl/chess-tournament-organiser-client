import axios from "axios";
import { useParams } from "react-router-dom";

import { useState, useEffect, useCallback } from "react";
import { API_URL } from "../../constants/API_URL";

import styles from "./Points.module.css";

export const Points = ({ pairings, participantsData }) => {
  const { tournamentId } = useParams();
  const storedAuthToken = localStorage.getItem("authToken");
  const numberOfRounds = Object.keys(pairings);
  console.log("Pairings: ", pairings);
  console.log("Participants data: ", participantsData);

  //@TODO: Pair the student name with the result in each round. The result in each
  // round will be used to calculate the number of points: 3p for a win, 1p for a draw,
  // and 0p for a loss.
  // A solution could be to create a function that creates a new object with all
  // the student paired with their round scores.
  // I need to output the rounds dynamically. How to make the number of columns dynamic?

  return (
    <div className={styles.points}>
      <h2>Points</h2>
      <div className={styles.points__grid}>
        <div className={styles.points__grid__rounds}>
          <h3>Students</h3>
          {numberOfRounds.map((_, i) => {
            return (
              <h3
                className={styles.points__grid__rounds__roundNumber}
              >{`Round ${i + 1}`}</h3>
            );
          })}
        </div>
        <div className={styles.points__grid__roundPoints}>
          {participantsData.map(({ student }) => {
            console.log("Student name: ", student.name);
            return (
              <div key={student._id}>
                <p>{student.name}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
