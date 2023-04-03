import axios from "axios";
import { useParams } from "react-router-dom";

import React, { useState } from "react";

import { API_URL } from "../../constants/API_URL";

/* import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Table, Button, Modal, Input } from "antd";
import {
  ArrowUpOutlined,
  ArrowDownOutlined,
  ArrowRightOutlined,
} from "@ant-design/icons"; */

import styles from "./Pairings.module.css";

export const Pairings = ({
  participantsData,
  pairings,
  currentRoundNumber,
  onUpdatePairingsData,
  onUpdateParticipantsData,
  onUpdateRoundNumber,
  numberOfTournamentRounds,
}) => {
  const [matchesCompleted, setMatchesCompleted] = useState(0);
  const { tournamentId } = useParams();
  const round = "round" + currentRoundNumber;
  console.log("Pairings: ", pairings);
  const storedAuthToken = localStorage.getItem("authToken");
  const numberOfMatches = pairings[round].length;

  console.log("Matches completed: ", matchesCompleted);
  console.log("number of matches: ", numberOfMatches);

  const handleWin = async (winningPlayer, winningPlayerId) => {
    for (const pair of pairings[`round${currentRoundNumber}`]) {
      const player = pair[winningPlayer];

      if (player.id === winningPlayerId) {
        const requestBody = {
          winningPlayerId,
          roundNumber: currentRoundNumber,
        };

        const response = await axios.post(
          `${API_URL}/tournaments/${tournamentId}/score`,
          requestBody,
          {
            headers: { Authorization: `Bearer ${storedAuthToken}` },
          }
        );

        const updatedResults = response.data;

        onUpdatePairingsData(updatedResults);

        setMatchesCompleted(matchesCompleted + 1);
        return;
      }
    }
  };

  const handleDraw = async (playerOneId, playerTwoId) => {
    for (const pair of pairings[`round${currentRoundNumber}`]) {
      const currentPlayerOneId = pair.player1.id;
      const currentPlayerTwoId = pair.player2.id;

      if (
        currentPlayerOneId === playerOneId &&
        currentPlayerTwoId === playerTwoId
      ) {
        const requestBody = {
          playerOneId,
          playerTwoId,
          roundNumber: currentRoundNumber,
        };

        const response = await axios.post(
          `${API_URL}/tournaments/${tournamentId}/score`,
          requestBody,
          {
            headers: { Authorization: `Bearer ${storedAuthToken}` },
          }
        );

        console.log("Draw response: ", response.data);

        const updatedResults = response.data;

        onUpdatePairingsData(updatedResults);
        setMatchesCompleted(matchesCompleted + 1);
        return;
      }
    }
  };

  const handleStartNextRound = async () => {
    try {
      const pairingsResponse = await axios.post(
        `${API_URL}/tournaments/${tournamentId}/pairings`,
        { participantsData, roundNumber: currentRoundNumber + 1 },
        {
          headers: { Authorization: `Bearer ${storedAuthToken}` },
        }
      );

      const tournamentDetailsResponse = await axios.get(
        `${API_URL}/tournaments/${tournamentId}`,
        {
          headers: { Authorization: `Bearer ${storedAuthToken}` },
        }
      );

      const updatedPairingsData = pairingsResponse.data.roundPairings;

      console.log("updated pairings data: ", pairingsResponse.data);

      const updatedParticipantsData =
        tournamentDetailsResponse.data.participantsData;

      onUpdatePairingsData(updatedPairingsData);
      onUpdateParticipantsData(updatedParticipantsData);
      onUpdateRoundNumber(currentRoundNumber + 1);
      setMatchesCompleted(0);
    } catch (error) {
      console.log("An error occurred while starting the next round: ", error);
    }
  };

  //@TODO: Implement functionality to switch between rounds.
  // Make a call to the backend
  const handleViewNextRound = () => {};

  return (
    <div className={styles.pairings}>
      <h2>PAIRINGS</h2>
      <div className={styles.pairings__roundSelector}>
        {matchesCompleted !== numberOfMatches && currentRoundNumber > 1 && (
          <button>Previous</button>
        )}
        <h3>Round {currentRoundNumber}</h3>
        {matchesCompleted !== numberOfMatches &&
          currentRoundNumber < numberOfTournamentRounds && (
            <button onClick={handleViewNextRound}>Next</button>
          )}
      </div>
      <div className={styles.pairings__grid}>
        {pairings[round].map((pair, index) => {
          const player1 = pair.player1;
          const player2 = pair.player2;

          const wasMatchDecided = player1.result || player2.result;

          return (
            <div key={index} className={styles.pairings__grid__pair}>
              <p
                className={`${
                  player1.result === "win"
                    ? styles.pairings__grid__pair__winner
                    : ""
                } ${
                  player1.result === "lose"
                    ? styles.pairings__grid__pair__loser
                    : ""
                } ${
                  player1.result === "draw"
                    ? styles.pairings__grid__pair__draw
                    : ""
                }`}
              >
                {player1.name}
              </p>
              <p>vs</p>
              <p
                className={`${
                  player2.result === "win"
                    ? styles.pairings__grid__pair__winner
                    : ""
                } ${
                  player2.result === "lose"
                    ? styles.pairings__grid__pair__loser
                    : ""
                } ${
                  player1.result === "draw"
                    ? styles.pairings__grid__pair__draw
                    : ""
                }`}
              >
                {player2.name}
              </p>
              <button
                disabled={wasMatchDecided}
                id="player1Win"
                onClick={() => handleWin("player1", player1.id)}
              >
                Win
              </button>
              <button
                disabled={wasMatchDecided}
                onClick={() => handleDraw(player1.id, player2.id)}
              >
                Draw
              </button>
              <button
                disabled={wasMatchDecided}
                id="player2Win"
                onClick={() => handleWin("player2", player2.id)}
              >
                Win
              </button>
              <div></div>
            </div>
          );
        })}
      </div>

      {numberOfMatches === matchesCompleted &&
        currentRoundNumber < numberOfTournamentRounds && (
          <button
            onClick={handleStartNextRound}
            className={styles.pairings__nextRoundBtn}
          >
            Start Next round
          </button>
        )}
    </div>
  );
};
