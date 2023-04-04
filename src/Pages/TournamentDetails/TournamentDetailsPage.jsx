import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { API_URL } from "../../constants/API_URL";
import { Points } from "../../Components/Points/Points";
import { Pairings } from "../../Components/Pairings/Pairings";
import styles from "./TournamentDetails.module.css";

export const TournamentDetailsPage = () => {
  const [isToggled, setIsToggled] = useState(true);
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
      console.log("axios data:", data);

      const { participantsData, roundPairings, status, numberOfRounds } = data;

      console.log("participant data:", participantsData);

      setParticipantsData(participantsData);

      setCurrentRoundNumber(roundPairings.size || 1);

      setTournamentStatus(status);

      setNumberOfTournamentRounds(numberOfRounds);

      console.log("Tournament status: ", tournamentStatus);

      setPairings(roundPairings);
      console.log("Pairings: ", pairings);
    }
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  console.log("Participants data: ", participantsData);

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
    console.log("Paired Students:", response.data.roundPairings);
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
        <button onClick={handleStartTournament}>Start Tournament</button>
      )}

      {(tournamentStatus === "active" || tournamentStatus === "finished") && (
        <div className={styles.tournamentDetails__views}>
          {isToggled ? (
            <button onClick={() => setIsToggled(!isToggled)}>Points</button>
          ) : (
            <button onClick={() => setIsToggled(!isToggled)}>Pairings</button>
          )}
          {!isToggled && (
            <Points pairings={pairings} participantsData={participantsData} />
          )}
          {isToggled && (
            <Pairings
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
