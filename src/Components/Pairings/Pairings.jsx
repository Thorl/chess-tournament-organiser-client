import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../../constants/API_URL";
import { Table, Button, Modal, Input } from "antd";
import {
  ArrowUpOutlined,
  ArrowDownOutlined,
  ArrowRightOutlined,
} from "@ant-design/icons";

import styles from "./Pairings.module.css";

export const Pairings = ({ pairings, roundNumber, onUpdatePairResults }) => {
  console.log("Pairings: ", pairings);

  const handleResult = (outcome, winningPlayerId, losingPlayerId) => {
    switch (outcome) {
      case "win":
        for (const pair of pairings[`round${roundNumber}`]) {
          const playerOneId = pair.player1.student._id;
          const playerTwoId = pair.player2.student._id;
          if (
            playerOneId === winningPlayerId &&
            playerTwoId === losingPlayerId
          ) {
            //@TODO: Make an axios post request to update the result for the winning and losing player.
            // If needed, add a new route and controller to the backend to handle the update
          }
        }
        break;
      default:
    }
  };
  return (
    <div className={styles.pairings}>
      <h2>PAIRINGS</h2>
      <h3>Round {roundNumber}</h3>
      <div className={styles.pairings__grid}>
        {pairings.round1.map((pair, index) => {
          const player1 = pair.player1.student;
          const player2 = pair.player2.student;
          return (
            <div key={index} className={styles.pairings__grid__pair}>
              <p>{player1.name}</p>
              <p>vs</p>
              <p>{player2.name}</p>
              <div>
                <button onClick={handleResult("win", player1._id, player2._id)}>
                  Win
                </button>
                <button>Lose</button>
                <button>Draw</button>
              </div>
              <div></div>
              <div>
                <button>Win</button>
                <button>Lose</button>
                <button>Draw</button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

/* import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../../constants/API_URL";
import { Table, Button, Modal, Input } from "antd";
import {
 ArrowUpOutlined,
 ArrowDownOutlined,
 ArrowRightOutlined,
} from "@ant-design/icons";


export const Pairings = () => {
 const [tournamentData, setTournamentData] = useState([]);
 const [columnData, setColumnData] = useState([]);
 const { tournamentId } = useParams();
 const storedAuthToken = localStorage.getItem("authToken");
 const columns = [];
 const rows = [];
 useEffect(() => {
   async function fetchData() {
     const { data } = await axios.get(
       `${API_URL}/tournaments/${tournamentId}`,
       {
         headers: { Authorization: `Bearer ${storedAuthToken}` },
       }
     );


     columns.push(
       {
         key: "1",
         title: "ID",
         dataIndex: "id",
       },
       {
         key: "2",
         title: "",
         render: (record) => {
           return (
             <>
               <ArrowUpOutlined style={{ color: "green" }} />
               <ArrowDownOutlined style={{ color: "red", marginLeft: 12 }} />
               <ArrowRightOutlined style={{ color: "blue", marginLeft: 12 }} />
             </>
           );
         },
       },
       {
         key: "3",
         title: "Player 1",
         dataIndex: "playerOne",
       },
       {
         key: "4",
         title: "",
         render: (record) => {
           return <>vs</>;
         },
       },
       {
         key: "5",
         title: "Player 2",
         dataIndex: "playerTwo",
       },
       {
         key: "6",
         title: "",
         render: (record) => {
           return (
             <>
               <ArrowUpOutlined style={{ color: "green" }} />
               <ArrowDownOutlined style={{ color: "red", marginLeft: 12 }} />
               <ArrowRightOutlined style={{ color: "blue", marginLeft: 12 }} />
             </>
           );
         },
       }
     );
     setColumnData(columns);


     const numberOfPairings = data._class.students.length / 2 + 1;


     for (let i = 0; i < numberOfPairings; i++) {
       rows.push({
         id: i + 1,
         playerOne: "",
         playerOneSymbols: "",
         versus: "",
         playerTwo: "",
         playerTwoSymbols: "",
       });
     }


     setTournamentData(rows);
   }
   fetchData();
   // eslint-disable-next-line react-hooks/exhaustive-deps
 }, []);
 return (
   <div>
     <Table columns={columnData} dataSource={tournamentData}></Table>
   </div>
 );
};



 */
