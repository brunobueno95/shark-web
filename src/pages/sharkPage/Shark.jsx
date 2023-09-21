// eslint-disable-next-line no-unused-vars
import React from "react";
import "./Shark.css";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { CgArrowLeftO } from "react-icons/cg";
const Shark = () => {
  const { id } = useParams();
  const [shark, setShark] = useState();
  const [isHovered, setIsHovered] = useState(false);

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
      <Link to={"/"}>
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
      <h1 style={{ fontSize: "60px", color: "white", margin: "0  auto 0" }}>
        {" "}
        {shark ? shark.commonName : "not found"}
      </h1>
      <h2
        style={{
          fontSize: "40px",
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
          <div className="sharkCardId">
            <img
              src={shark.image}
              alt={shark.commonName}
              className="sharkImageId"
            />
            <div className="sharkInfoId">
              <p
                style={{
                  fontSize: "26px",
                  color: "white",
                  margin: "50px auto",
                }}
              >
                {shark ? shark.info : "not found"}
              </p>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  margin: "0 auto",
                }}
              >
                <p
                  style={{
                    fontSize: "26px",
                    color: "white",
                    margin: "5px",
                    fontStyle: "italic",
                  }}
                >
                  <span
                    style={{
                      fontWeight: "bold",
                      color: "rgb(34, 176, 186)",
                      fontStyle: "normal",
                    }}
                  >
                    Family:{" "}
                  </span>{" "}
                  {shark ? shark.family : "not found"}
                </p>
                <p style={{ fontSize: "26px", color: "white", margin: "5px" }}>
                  <span
                    style={{ fontWeight: "bold", color: "rgb(34, 176, 186)" }}
                  >
                    Size:{" "}
                  </span>{" "}
                  {shark ? shark.size : "not found"}
                </p>
                <p style={{ fontSize: "26px", color: "white", margin: "5px" }}>
                  <span
                    style={{ fontWeight: "bold", color: "rgb(34, 176, 186)" }}
                  >
                    Countries found:{" "}
                  </span>{" "}
                  {shark
                    ? shark.countries.map((s, i) =>
                        i + 1 === shark.countries.length ? s + ". " : s + ",  "
                      )
                    : "not found"}
                </p>
                <p style={{ fontSize: "26px", color: "white", margin: "5px" }}>
                  <span
                    style={{ fontWeight: "bold", color: "rgb(34, 176, 186)" }}
                  >
                    Depth found:{" "}
                  </span>{" "}
                  {shark ? shark.depth : "not found"}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Shark;
