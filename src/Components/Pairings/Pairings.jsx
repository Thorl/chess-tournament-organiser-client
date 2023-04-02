import axios from "axios";
import { useParams } from "react-router-dom";

import React from "react";

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
  roundNumber,
  onUpdatePairingsData,
}) => {
  const { tournamentId } = useParams();
  const round = "round" + roundNumber;
  console.log("Pairings: ", pairings[round]);
  const storedAuthToken = localStorage.getItem("authToken");

  const handleWin = async (winningPlayer, winningPlayerId) => {
    for (const pair of pairings[`round${roundNumber}`]) {
      const player = pair[winningPlayer];

      if (player.id === winningPlayerId) {
        const requestBody = {
          winningPlayerId,
          roundNumber,
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
        return;
      }
    }
  };

  const handleDraw = async (playerOneId, playerTwoId) => {
    for (const pair of pairings[`round${roundNumber}`]) {
      const currentPlayerOneId = pair.player1.id;
      const currentPlayerTwoId = pair.player2.id;

      if (
        currentPlayerOneId === playerOneId &&
        currentPlayerTwoId === playerTwoId
      ) {
        const requestBody = {
          playerOneId,
          playerTwoId,
          roundNumber,
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
        return;
      }
    }
  };

  const handleStartNextRound = async () => {
    try {
    } catch (error) {
      console.log("An error occurred while starting the next round: ");
    }
    const response = await axios.post(
      `${API_URL}/tournaments/${tournamentId}/pairings`,
      { participantsData, roundNumber: roundNumber + 1 },
      {
        headers: { Authorization: `Bearer ${storedAuthToken}` },
      }
    );

    const updatedPairingsData = response.data;

    onUpdatePairingsData(updatedPairingsData);
  };

  //@TODO: Fully implement the functionality of starting the next round, as well as
  // switching between previously completed rounds. One way to keep track of whether
  // a round has finished or not could be to have a state that keeps track of the
  // number of active rounds.
  // Another way could be to have a property on each round in the roundPairings that
  // keeps track of whether the round has finished or not. Create a new component called <Round/> to make it easier to keep track of all the states?

  return (
    <div className={styles.pairings}>
      <h2>PAIRINGS</h2>
      <h3>Round {roundNumber}</h3>
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

      <button
        onClick={handleStartNextRound}
        className={styles.pairings__nextRoundBtn}
      >
        Start Next round
      </button>
    </div>
  );
};
