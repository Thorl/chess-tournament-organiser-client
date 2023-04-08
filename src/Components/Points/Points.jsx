import { useState, useEffect, useCallback } from "react";

import styles from "./Points.module.css";
import React from "react";

export const Points = ({ pairings, participantsData, tournamentStatus }) => {
  const [studentPointsPerRound, setStudentPointsPerRound] = useState(null);
  const [winnerMessage, setWinnerMessage] = useState("");
  const rounds = Object.keys(pairings);

  const calculateWinner = useCallback(() => {
    if (tournamentStatus === "finished") {
      const studentSortedByPoints = [...participantsData].sort(
        (studentOne, studentTwo) => {
          if (studentOne.points > studentTwo.points) {
            return -1;
          } else if (studentOne.points < studentTwo.points) {
            return 1;
          } else {
            return 0;
          }
        }
      );

      let winnersList = [];

      for (let i = 0; i < studentSortedByPoints.length; i++) {
        const highestScore = studentSortedByPoints[0].points;

        const currentStudent = studentSortedByPoints[i];
        if (currentStudent.points >= highestScore) {
          winnersList.push(currentStudent.student.name);
        }
      }

      let message = "";

      if (winnersList.length === 1) {
        const message = `${winnersList[0]} has won the tournament!`;

        setWinnerMessage(message);
      } else if (winnersList.length > 1) {
        for (let i = 0; i < winnersList.length; i++) {
          if (winnersList[i + 1]) {
            message += `${winnersList[i]} & `;
          } else {
            message += winnersList[i];
          }
        }

        message += " have won the tournament!";

        setWinnerMessage(message);
      }
    }
  }, [participantsData, tournamentStatus]);

  const calculateStudentPointsPerRound = useCallback(() => {
    const rounds = Object.keys(pairings);
    const studentPointsPerRound = {};

    for (const participant of participantsData) {
      const studentId = participant.student._id;

      studentPointsPerRound[studentId] = [];
    }

    rounds.forEach((round) => {
      for (const match of pairings[round]) {
        const playerOneId = match.player1.id;
        const playerOnePoints = match.player1.points;

        const playerTwoId = match.player2.id;
        const playerTwoPoints = match.player2.points;

        studentPointsPerRound[playerOneId].push(playerOnePoints);
        studentPointsPerRound[playerTwoId].push(playerTwoPoints);
      }
    });

    setStudentPointsPerRound(studentPointsPerRound);
  }, [pairings, participantsData]);

  useEffect(() => {
    calculateStudentPointsPerRound();
    calculateWinner();
  }, [calculateStudentPointsPerRound, calculateWinner]);

  return (
    <div className={styles.points}>
      <h3 className={styles.points__winningMessage}>
        {winnerMessage && winnerMessage}
      </h3>
      <div className={styles.points__grid}>
        <div className={styles.points__grid__rounds}>
          <h3>Students</h3>
          {rounds.map((_, i) => {
            return (
              <h3
                key={i}
                className={styles.points__grid__rounds__roundNumber}
              >{`R${i + 1}`}</h3>
            );
          })}
          <h3>Total</h3>
        </div>
        <div className={styles.points__grid__points}>
          {participantsData.map(({ student }) => {
            const studentId = student._id;
            let totalPoints;
            if (studentPointsPerRound) {
              totalPoints = studentPointsPerRound[studentId].reduce(
                (total, curr) => total + curr
              );
            }
            return (
              <div key={studentId} className={styles.points__grid__points__row}>
                <p>{student.name}</p>
                {studentPointsPerRound &&
                  studentPointsPerRound[studentId].map((points, i) => {
                    return <p key={i}>{points}</p>;
                  })}

                <p>{totalPoints}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
