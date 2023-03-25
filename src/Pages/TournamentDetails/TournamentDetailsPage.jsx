import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { API_URL } from "../../constant/constant";

export const TournamentDetailsPage = () => {
  const [tournamentData, setTournamentData] = useState("");

  const { tournamentId } = useParams();
  const storedAuthToken = localStorage.getItem("authToken");

  useEffect(() => {
    async function fetchData() {
      const { data } = await axios.get(`${API_URL}/tournaments/${tournamentId}`, {
        headers: { Authorization: `Bearer ${storedAuthToken}` },
      });
      console.log(data);
      setTournamentData(data);
    }
    fetchData();
  }, []);

  return (
    <div>
      <div>{tournamentData.name}</div>
    </div>
  );
};
