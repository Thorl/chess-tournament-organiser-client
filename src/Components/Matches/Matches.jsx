import axios from "axios";
import { useParams } from "react-router-dom";

import { useCallback, useEffect, useState } from "react";
import { API_URL } from "../../constants/API_URL";

import styles from "./Matches.module.css";

export const Matches = ({
  participantsData,
  pairings,
  currentRoundNumber,
  onUpdatePairingsData,
  onUpdateParticipantsData,
  onUpdateRoundNumber,
  numberOfTournamentRounds,
  onUpdateTournamentStatus,
  tournamentStatus,
}) => {
  const [matchesCompleted, setMatchesCompleted] = useState(0);
  const { tournamentId } = useParams();
  const round = "round" + currentRoundNumber;
  const storedAuthToken = localStorage.getItem("authToken");
  const numberOfMatches = pairings[round].length;
  const numberOfActiveRounds = Object.keys(pairings).length;

  useEffect(() => {
    const updateMatchesCompleted = async () => {
      try {
        const response = await axios.get(
          `${API_URL}/tournaments/${tournamentId}`,
          {
            headers: { Authorization: `Bearer ${storedAuthToken}` },
          }
        );

        const roundData = response.data.roundPairings[round];

        let matchesCompleted = 0;

        for (const match of roundData) {
          if (match.player1.points > 0 || match.player2.points > 0) {
            matchesCompleted++;
          }
        }

        setMatchesCompleted(matchesCompleted);
      } catch (error) {
        console.error(
          "An error occurred while trying to get the number of completed matches: ",
          error
        );
      }
    };

    updateMatchesCompleted();
  }, [round, storedAuthToken, tournamentId, currentRoundNumber]);

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

        const tournamentDetailsResponse = await axios.get(
          `${API_URL}/tournaments/${tournamentId}`,
          {
            headers: { Authorization: `Bearer ${storedAuthToken}` },
          }
        );

        const updatedParticipantsData =
          tournamentDetailsResponse.data.participantsData;

        onUpdateParticipantsData(updatedParticipantsData);

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

        const updatedResults = response.data;

        onUpdatePairingsData(updatedResults);

        const tournamentDetailsResponse = await axios.get(
          `${API_URL}/tournaments/${tournamentId}`,
          {
            headers: { Authorization: `Bearer ${storedAuthToken}` },
          }
        );

        const updatedParticipantsData =
          tournamentDetailsResponse.data.participantsData;

        onUpdateParticipantsData(updatedParticipantsData);

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

      const updatedParticipantsData =
        tournamentDetailsResponse.data.participantsData;

      onUpdatePairingsData(updatedPairingsData);
      onUpdateParticipantsData(updatedParticipantsData);
      onUpdateRoundNumber(currentRoundNumber + 1);
      setMatchesCompleted(0);
    } catch (error) {
      console.error("An error occurred while starting the next round: ", error);
    }
  };

  const handleSwitchRound = async (direction) => {
    if (direction === "next") {
      onUpdateRoundNumber(currentRoundNumber + 1);
    } else if (direction === "previous") {
      onUpdateRoundNumber(currentRoundNumber - 1);
    }
  };

  const handleFinishTournament = async () => {
    try {
      const requestBody = { newStatus: "finished" };

      const response = await axios.post(
        `${API_URL}/tournaments/${tournamentId}/status`,
        requestBody,
        {
          headers: { Authorization: `Bearer ${storedAuthToken}` },
        }
      );

      const finishedTournamentStatus = response.data.status;

      onUpdateTournamentStatus(finishedTournamentStatus);

      const tournamentDetailsResponse = await axios.get(
        `${API_URL}/tournaments/${tournamentId}`,
        {
          headers: { Authorization: `Bearer ${storedAuthToken}` },
        }
      );

      const updatedParticipantsData =
        tournamentDetailsResponse.data.participantsData;

      onUpdateParticipantsData(updatedParticipantsData);
    } catch (error) {
      console.error(
        "An error occurred while trying to set the tournament status to 'finished': ",
        error
      );
    }
  };

  return (
    <div className={styles.matches}>
      <div className={styles.matches__roundSelector}>
        {currentRoundNumber > 1 && (
          <button
            className={styles.matches__roundSelector__btn}
            onClick={() => handleSwitchRound("previous")}
          >
            Previous
          </button>
        )}
        {currentRoundNumber === 1 && <div></div>}
        <h3 className={styles.matches__roundSelector__header}>
          Round {currentRoundNumber}
        </h3>
        {currentRoundNumber < numberOfTournamentRounds &&
          currentRoundNumber < numberOfActiveRounds && (
            <button
              className={styles.matches__roundSelector__btn}
              onClick={() => handleSwitchRound("next")}
            >
              Next
            </button>
          )}
        {currentRoundNumber === numberOfTournamentRounds && <div></div>}
      </div>
      {tournamentStatus === "finished" && (
        <h3 className={styles.matches__finishedMessage}>
          Tournament over! Go to the "Points" view to see who won!
        </h3>
      )}
      <div className={styles.matches__grid}>
        {pairings[round].map((pair, index) => {
          const player1 = pair.player1;
          const player2 = pair.player2;

          const wasMatchDecided = player1.points || player2.points;

          return (
            <div key={index} className={styles.matches__grid__pair}>
              <p
                className={`${
                  player1.points === 3 ? styles.matches__grid__pair__winner : ""
                } ${
                  player1.points === 0 ? styles.matches__grid__pair__loser : ""
                } ${
                  player1.points === 1 ? styles.matches__grid__pair__draw : ""
                }`}
              >
                {player1.name}
              </p>
              <p>vs</p>
              <p
                className={`${
                  player2.points === 3 ? styles.matches__grid__pair__winner : ""
                } ${
                  player2.points === 0 ? styles.matches__grid__pair__loser : ""
                } ${
                  player1.points === 1 ? styles.matches__grid__pair__draw : ""
                }`}
              >
                {player2.name}
              </p>
              <button
                disabled={wasMatchDecided}
                className={styles.matches__grid__pair__winBtn}
                onClick={() => handleWin("player1", player1.id)}
              >
                Win
              </button>
              <button
                disabled={wasMatchDecided}
                className={styles.matches__grid__pair__drawBtn}
                onClick={() => handleDraw(player1.id, player2.id)}
              >
                Draw
              </button>
              <button
                disabled={wasMatchDecided}
                className={styles.matches__grid__pair__winBtn}
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
        currentRoundNumber < numberOfTournamentRounds &&
        currentRoundNumber >= numberOfActiveRounds && (
          <button
            onClick={handleStartNextRound}
            className={styles.matches__nextRoundBtn}
          >
            Start Next round
          </button>
        )}
      {numberOfMatches === matchesCompleted &&
        currentRoundNumber === numberOfTournamentRounds &&
        currentRoundNumber >= numberOfActiveRounds &&
        tournamentStatus === "active" && (
          <button
            onClick={handleFinishTournament}
            className={styles.matches__nextRoundBtn}
          >
            Finish Tournament
          </button>
        )}
    </div>
  );
};
