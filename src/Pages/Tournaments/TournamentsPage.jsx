import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { API_URL } from "../../constants/API_URL";
import styles from "./TournamentsPage.module.css";
import spinner from "../../assets/chess-king-favicon.png";

export const TournamentsPage = () => {
  const [tournaments, setTournaments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getTournaments = async () => {
    try {
      const storedAuthToken = localStorage.getItem("authToken");

      const response = await axios.get(`${API_URL}/tournaments`, {
        headers: { Authorization: `Bearer ${storedAuthToken}` },
      });

      const tournamentsFromDb = response.data.tournaments;
      setIsLoading(false);
      setTournaments(tournamentsFromDb);
    } catch (error) {
      setIsLoading(false);
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

      <div className={styles.tournaments__tournamentCardContainer}>
        {isLoading && (
          <div
            className={styles.tournaments__tournamentCardContainer__loaderCard}
          >
            <img
              className={
                styles.tournaments__tournamentCardContainer__loaderCard__spinner
              }
              src={spinner}
              alt="Loading spinner in the form of the black king piece"
            />
            <p
              className={
                styles.tournaments__tournamentCardContainer__loaderCard__loadingText
              }
            >
              Loading...
            </p>
          </div>
        )}
        {tournaments.map((tournamentEl) => {
          return (
            <Link
              to={`/tournaments/${tournamentEl._id}`}
              key={tournamentEl._id}
              className={`${styles.tournaments__tournamentCardContainer__card}`}
            >
              <h3
                className={
                  styles.tournaments__tournamentCardContainer__card__header
                }
              >
                {tournamentEl.name}
              </h3>

              <div
                className={
                  styles.tournaments__tournamentCardContainer__card__infoContainer
                }
              >
                <h3> School: {tournamentEl._class.school}</h3>
                <h3>Class: {tournamentEl._class.name}</h3>
                <h3>
                  Status:{" "}
                  <span
                    className={`${
                      tournamentEl.status === "finished"
                        ? styles.tournaments__tournamentCardContainer__card__infoContainer_finished
                        : styles.tournaments__tournamentCardContainer__card__infoContainer_active
                    }`}
                  >
                    {" "}
                    {tournamentEl.status}
                  </span>
                </h3>
              </div>
            </Link>
          );
        })}
        <Link
          className={`${styles.tournaments__tournamentCardContainer__newTournamentCard}`}
          to="/tournaments/new-tournament"
        >
          <div>
            <FontAwesomeIcon
              className={
                styles.tournaments__tournamentCardContainer__newTournamentCard__icon
              }
              icon={faPlus}
            />
          </div>
        </Link>
      </div>
    </div>
  );
};
