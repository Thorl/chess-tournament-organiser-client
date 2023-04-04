import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const API_URL = process.env.REACT_APP_API_URL

export const TournamentDetailsPage = () => {
  const [tournamentData, setTournamentData] = useState("");

  const { tournamentId } = useParams();

  useEffect(() => {
    axios
      .get(`${API_URL}/tournaments/${tournamentId}`)
      .then((res) => {
        console.log(res.data);
        setTournamentData(res.data);
      })
      .catch((error) => console.log(error.response.data));
  }, []);

  return <div>{tournamentData}</div>;
};
