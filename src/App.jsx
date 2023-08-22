import { useState } from "react";
import { sharkData } from "./assets/sharkList";
import { CgSearch } from "react-icons/cg";

import "./App.css";
import ContainerCards from "../components/ContainerCards";
import Card from "../components/Card";
import Pagination from "../components/Pagination";

function App() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;
  const lastIndex = currentPage * itemsPerPage;
  const firstIndex = lastIndex - itemsPerPage;
  const currentSharks = sharkData.slice(firstIndex, lastIndex);

  const totalPages = Math.ceil(sharkData.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div style={{ width: "100vw", width: "100vw" }}>
      <div
        style={{
          margin: "0 auto",

          width: "55%",
          minHeight: "100vh",
          backgroundColor: "rgba(0, 0, 0, 0.616)",
          display: "flex",
          flexDirection: "column",
          zIndex: "99",
          alignItems: "center",
          backdropFilter: "blur(5px)",
        }}
      >
        <h1
          style={{ color: "whitesmoke", fontSize: "55px", marginTop: "10px" }}
        >
          SHARKWEB
        </h1>
        <p
          style={{
            color: "#dfdfdf",
            fontSize: "18px",
            fontWeight: "normal",
            fontFamily: "sans-serif",
          }}
        >
          A Web Application Showcasing a Comprehensive Collection of Global
          Shark Species and Their Relevant Information
        </p>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            gap: "5px",
            marginTop: "40px",
          }}
        >
          {" "}
          <input
            placeholder="search a shark"
            style={{
              width: "200px",
              height: "10px",
              padding: "10px",
              borderRadius: "20px",
              border: "2px solid #5a5a5a",
              outline: "none",
              fontSize: "16px",
              transition: "border-color 0.3s ease",
              backgroundColor: "#cfcfcf",
            }}
          />{" "}
          <CgSearch style={{ color: "#cfcfcf", fontSize: "30px" }} />
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "20px",
          }}
        >
          <div
            style={{
              height: "68vh",
              width: "55vw",
              overflowY: "auto",
              padding: "auto",
              overflowX: "hidden",
              backgroundColor: "rgba(0, 0, 0, 0.216)",
            }}
          >
            <ContainerCards>
              {currentSharks.map((shark, index) => (
                <Card
                  key={index}
                  commonName={shark.commonName}
                  specie={shark.specie}
                />
              ))}
            </ContainerCards>
          </div>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </div>
  );
}

export default App;