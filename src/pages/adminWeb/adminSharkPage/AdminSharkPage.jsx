/* eslint-disable no-unused-vars */

import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { CgArrowLeftO } from "react-icons/cg";
import { BiEditAlt } from "react-icons/bi";
import { MdDeleteForever } from "react-icons/md";

const AdminSharkPage = () => {
  const { id } = useParams();
  const [shark, setShark] = useState();
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchSharks();
  }, []);

  const fetchSharks = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/sharks/${id}`);
      setShark(response.data);
    } catch (error) {
      console.error("Error fetching sharks:", error);
    }
  };

  const deleteShark = async () => {
    try {
      const response = await axios.delete(`http://localhost:8080/sharks/${id}`);

      if (response.status === 204) {
        console.log("Shark deleted successfully");

        navigate("/adminHome");
      } else {
        console.error(
          "Failed to delete shark. Server returned:",
          response.status
        );
      }
    } catch (error) {
      console.error("Error deleting shark:", error);
    }
  };
  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        backgroundColor: "rgba(0, 0, 0, 0.616)",
        backdropFilter: "blur(2px)",
        margin: "0",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Link to={"/adminHome"}>
        <CgArrowLeftO
          style={{
            fontSize: "35px",
            margin: "30px",
            color: isHovered ? "rgb(42, 224, 237)" : "rgb(34, 176, 186)",
          }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        />
      </Link>

      <div
        style={{
          display: "flex",
          flexDirection: "row",
          gap: "10px",
          justifyContent: "center",
          marginBottom: "20px",
        }}
      >
        <button
          style={{
            width: "50px",
            height: "40px",

            backgroundColor: "green",
            border: "none",
            borderRadius: "10px",
            boxShadow: "0px 0px 60px black",
            fontSize: "18px",
            color: "whitesmoke",
            cursor: "pointer",
          }}
        >
          <Link to={`/editShark/${id}`}>
            <BiEditAlt color="whitesmoke" fontSize="25px" />
          </Link>
        </button>{" "}
        <button
          style={{
            width: "50px",
            height: "40px",

            backgroundColor: "red",
            border: "none",
            borderRadius: "10px",
            boxShadow: "0px 0px 60px black",
            fontSize: "18px",
            color: "whitesmoke",
            cursor: "pointer",
          }}
          onClick={deleteShark}
        >
          <MdDeleteForever color="whitesmoke" fontSize="25px" />
        </button>
      </div>
      <div
        style={{
          width: "50%",
          height: "50%",
          border: "black solid 1px",
          margin: "0 auto",
          display: "flex",
          flexDirection: "column",
          backdropFilter: "blur(5px)",
          justifyContent: "center",
          borderRadius: "10px",
        }}
      >
        <h1 style={{ fontSize: "40px", color: "white", margin: "0  auto 0" }}>
          {" "}
          {shark ? shark.commonName : "not found"}
        </h1>
        <h2
          style={{
            fontSize: "30px",
            color: "  rgb(34, 176, 186)",
            margin: "0 auto",
            fontStyle: "italic",
          }}
        >
          {" "}
          {shark ? shark.specie : "not found"}
        </h2>

        <div style={{ display: "flex" }}>
          {shark && (
            <div
              className="sharkCardId"
              style={{
                marginTop: "15px",
                marginBottom: "20px",
                width: "40%",
                height: "auto",
              }}
            >
              <img
                src={shark.image}
                alt={shark.commonName}
                className="sharkImageId"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminSharkPage;
