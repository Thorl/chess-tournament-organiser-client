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

export const Pairings = ({ pairings }) => {
  return (
    <div>
      <h1>PAIRINGS</h1>
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
