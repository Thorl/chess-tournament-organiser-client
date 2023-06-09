import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { API_URL } from "../../constants/API_URL";
import { Points } from "../../Components/Points/Points";
import { Matches } from "../../Components/Matches/Matches";
import styles from "./TournamentDetails.module.css";

export const TournamentDetailsPage = () => {
  const [activeView, setActiveView] = useState("matches");
  const [pairings, setPairings] = useState("");
  const [currentRoundNumber, setCurrentRoundNumber] = useState(1);
  const [participantsData, setParticipantsData] = useState({});
  const [tournamentStatus, setTournamentStatus] = useState("inactive");
  const [numberOfTournamentRounds, setNumberOfTournamentRounds] = useState(1);

  const { tournamentId } = useParams();
  const storedAuthToken = localStorage.getItem("authToken");

  useEffect(() => {
    async function fetchData() {
      const { data } = await axios.get(
        `${API_URL}/tournaments/${tournamentId}`,
        {
          headers: { Authorization: `Bearer ${storedAuthToken}` },
        }
      );

      const { participantsData, roundPairings, status, numberOfRounds } = data;

      setParticipantsData(participantsData);

      setCurrentRoundNumber(roundPairings.size || 1);

      setTournamentStatus(status);

      setNumberOfTournamentRounds(numberOfRounds);

      setPairings(roundPairings);
    }
    fetchData();
  }, []);

  const handleStartTournament = async () => {
    const startTournament = true;
    const response = await axios.post(
      `${API_URL}/tournaments/${tournamentId}/pairings`,
      { participantsData, roundNumber: currentRoundNumber, startTournament },
      {
        headers: { Authorization: `Bearer ${storedAuthToken}` },
      }
    );

    setTournamentStatus("active");
    setPairings(response.data.roundPairings);
  };

  const handleUpdatePairingsData = (updatedPairResults) => {
    setPairings(updatedPairResults);
  };

  const handleUpdateParticipantsData = (participantsData) => {
    setParticipantsData(participantsData);
  };

  const handleUpdateRoundNumber = (roundNumber) => {
    setCurrentRoundNumber(roundNumber);
  };

  const handleUpdateTournamentStatus = (status) => {
    setTournamentStatus(status);
  };

  return (
    <div className={styles.tournamentDetails}>
      {tournamentStatus === "inactive" && (
        <button
          className={styles.tournamentDetails__startBtn}
          onClick={handleStartTournament}
        >
          Start Tournament
        </button>
      )}

      {(tournamentStatus === "active" || tournamentStatus === "finished") && (
        <div className={styles.tournamentDetails__views}>
          <div className={styles.tournamentDetails__views__navButtons}>
            <button
              className={`${
                styles.tournamentDetails__views__navButtons__matches
              } ${
                activeView === "matches"
                  ? styles.tournamentDetails__views__navButtons__activeView
                  : ""
              }`}
              onClick={() => setActiveView("matches")}
            >
              Matches
            </button>
            <button
              className={`${
                styles.tournamentDetails__views__navButtons__points
              } ${
                activeView === "points"
                  ? styles.tournamentDetails__views__navButtons__activeView
                  : ""
              }`}
              onClick={() => setActiveView("points")}
            >
              Points
            </button>
          </div>
          {activeView === "points" && (
            <Points
              pairings={pairings}
              participantsData={participantsData}
              tournamentStatus={tournamentStatus}
            />
          )}
          {activeView === "matches" && (
            <Matches
              participantsData={participantsData}
              pairings={pairings}
              currentRoundNumber={currentRoundNumber}
              numberOfTournamentRounds={numberOfTournamentRounds}
              tournamentStatus={tournamentStatus}
              onUpdateTournamentStatus={handleUpdateTournamentStatus}
              onUpdatePairingsData={handleUpdatePairingsData}
              onUpdateParticipantsData={handleUpdateParticipantsData}
              onUpdateRoundNumber={handleUpdateRoundNumber}
            />
          )}
        </div>
      )}
    </div>
  );
};
