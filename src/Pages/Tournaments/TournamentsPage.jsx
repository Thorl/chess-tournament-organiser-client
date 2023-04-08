import axios from "axios";

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { API_URL } from "../../constants/API_URL";
import styles from "./TournamentsPage.module.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

export const TournamentsPage = () => {
  const [tournaments, setTournaments] = useState([]);

  const getTournaments = async () => {
    try {
      const storedAuthToken = localStorage.getItem("authToken");

      const response = await axios.get(`${API_URL}/tournaments`, {
        headers: { Authorization: `Bearer ${storedAuthToken}` },
      });

      const tournamentsFromDb = response.data.tournaments;

      setTournaments(tournamentsFromDb);
    } catch (error) {
      console.error(
        "An error occurred while trying to load classes from the database: ",
        error
      );
    }
  };

  useEffect(() => {
    getTournaments();
  }, []);

  return (
    <div className={styles.tournaments}>
      <h2 className={styles.tournaments__pageHeader}>My Tournaments</h2>

      <div className={styles.tournamentCardContainer}>
        {tournaments.map((tournamentEl) => {
          return (
            <Link
              to={`/tournaments/${tournamentEl._id}`}
              key={tournamentEl._id}
              className={`${styles.tournaments__dbTournaments} ${styles.tournaments__card} ${styles.tournaments__link}`}
            >
              <h3>{tournamentEl.name}</h3>

              <div className={styles.tournaments__dbTournaments__infoContainer}>
                <h3>School: {tournamentEl._class.school}</h3>
                <h3>Class: {tournamentEl._class.name}</h3>
                <h3>Status: {tournamentEl.status}</h3>
              </div>
            </Link>
          );
        })}
        <Link
          className={`${styles.tournaments__createNewTournament} ${styles.tournaments__card} ${styles.tournaments__link}`}
          to="/tournaments/new-tournament"
        >
          <div>
            <FontAwesomeIcon className={styles.icon} icon={faPlus} />
          </div>
        </Link>
      </div>
    </div>
  );
};
