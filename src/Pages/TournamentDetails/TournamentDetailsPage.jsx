import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../../constants/API_URL";
import styles from "./TournamentDetails.module.css";
import { Link } from "react-router-dom";
import { Points } from "../../Components/Points/Points";
import { Pairings } from "../../Components/Pairings/Pairings";

export const TournamentDetailsPage = () => {
  const [tournamentData, setTournamentData] = useState([]);
  const [isToggled, setIsToggled] = useState(false);
  const [pairings, setPairings] = useState("");

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
      setTournamentData(data);

      const { roundPairings } = data;
      setPairings(roundPairings);
      console.log(roundPairings);
    }
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      {isToggled ? (
        <button onClick={() => setIsToggled(!isToggled)}>Points</button>
      ) : (
        <button onClick={() => setIsToggled(!isToggled)}>Pairings</button>
      )}
      {!isToggled && (
        <Points tournamentData={tournamentData} pairings={pairings} />
      )}
      {isToggled && (
        <Pairings tournamentData={tournamentData} pairings={pairings} />
      )}
    </div>
  );
};
