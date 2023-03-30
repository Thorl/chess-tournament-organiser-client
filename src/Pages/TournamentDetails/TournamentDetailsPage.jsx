import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../../constants/API_URL";
import styles from "./TournamentDetails.module.css";
import { Table, Button, Modal, Input } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

export const TournamentDetailsPage = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);
  const [tournamentData, setTournamentData] = useState([]);
  const [columnData, setColumnData] = useState([]);

  const { tournamentId } = useParams();
  const storedAuthToken = localStorage.getItem("authToken");
  const columns = [];
  const antdRowsData = [];

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
          title: "Name",
          dataIndex: "name",
        }
      );

      for (let i = 1; i <= data.numberOfRounds; i++) {
        columns.push({
          key: (i + 2).toString(),
          title: `R${i}`,
          dataIndex: `R${i}`,
        });
      }

      columns.push(
        {
          key: (columns.length + 1).toString(),
          title: "Total",
          dataIndex: "total",
        },
        {
          key: (columns.length + 2).toString(),
          title: "Actions",
          render: (record) => {
            return (
              <>
                <EditOutlined onClick={() => editStudent(record)} />
                <DeleteOutlined
                  onClick={() => deleteStudent(record)}
                  style={{ color: "red", marginLeft: 12 }}
                />
              </>
            );
          },
        }
      );

      setColumnData(columns);

      data.participantsData.forEach((participant, index) => {
        antdRowsData.push({
          id: index + 1,
          name: participant.participantID.name,
          roundsData: {},
        });
      });

      for (const participant of antdRowsData) {
        for (let i = 1; i <= data.numberOfRounds; i++) {
          participant.roundsData[`R${i}`] = "";
        }
        participant["total"] = "";
      }

      console.log(antdRowsData);
      setTournamentData(antdRowsData);
    }
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const addNewStudent = () => {
    const newStudentID = tournamentData[tournamentData.length - 1].id + 1;

    const newStudent = {
      id: newStudentID,
      name: "Omar",
      roundsData: {
        R1: "",
        R2: "",
        R3: "",
        R4: "",
      },
      total: "",
    };
    setTournamentData((previousState) => {
      return [...previousState, newStudent];
    });
  };

  const deleteStudent = (record) => {
    Modal.confirm({
      title: `Are you sure you want to remove ${record.name} from the tournament?`,
      okText: "Yes",
      okType: "danger",
      onOk: () => {
        setTournamentData((previousState) => {
          return previousState.filter(
            (participant) => participant.id !== record.id
          );
        });
      },
    });
  };

  const editStudent = (record) => {
    setIsEditing(true);
    setEditingStudent({ ...record });
    console.log(record);
  };

  const resetEdit = () => {
    setIsEditing(false);
    setEditingStudent(null);
  };

  return (
    <div>
      <Button onClick={addNewStudent}>Add a New Student</Button>
      <Table columns={columnData} dataSource={tournamentData}></Table>
      <Modal
        title="Edit Student"
        open={isEditing}
        okText="Save"
        onCancel={() => {
          resetEdit();
        }}
        onOk={() => {
          setTournamentData((pre) => {
            return pre.map((participant) => {
              if (participant.id === editingStudent.id) {
                return editingStudent;
              } else {
                return participant;
              }
            });
          });

          resetEdit();
        }}
      >
        <Input
          addonBefore="Name"
          value={editingStudent?.name}
          onChange={(e) => {
            setEditingStudent((pre) => {
              return { ...pre, name: e.target.value };
            });
          }}
        />
        {editingStudent &&
          Object.keys(editingStudent.roundsData).map((round) => {
            return (
              <Input
                addonBefore={`Round ${round.slice(1)}`}
                value={editingStudent.roundsData.round}
                onChange={(e) => {
                  setEditingStudent((pre) => {
                    pre[round] = e.target.value;
                    return { ...pre };
                  });
                }}
              />
            );
          })}
      </Modal>
    </div>
  );
};
