/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { AuthContext } from "../../../context/AuthContext";
import { useContext } from "react";
import Cookies from "js-cookie";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import ContainerCards from "../../../components/ContainerCards";
import Card from "../../../components/Card";
import Pagination from "../../../components/Pagination";
import "./AdminHome.css";

const AdminHome = () => {
  const [sharks, setSharks] = useState([]);
  const [currentPage, setCurrentPage] = useState();

  const { isAuthenticated } = useContext(AuthContext);
  useEffect(() => {
    console.log(isAuthenticated);
  }, [isAuthenticated]);
  const navigate = useNavigate();
  const handleLogout = () => {
    Cookies.remove("isLoggedIn");
    navigate("/");
  };

  useEffect(() => {
    fetchSharks();
  }, []);

  const fetchSharks = async () => {
    try {
      const response = await axios.get("http://localhost:8080/sharks");
      setSharks(response.data);
      console.log(sharks);
    } catch (error) {
      console.error("Error fetching sharks:", error);
    }
  };

  const itemsPerPage = 9;
  const lastIndex = currentPage * itemsPerPage;
  const firstIndex = lastIndex - itemsPerPage;
  const currentSharks = sharks.slice(firstIndex, lastIndex);

  const totalPages = Math.ceil(sharks.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  return (
    <div>
      <div
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.816)",
          width: "100vw",
          height: "90px",
          position: "fixed",
          top: "0",
          left: "0",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            gap: "35px",
            color: "rgb(34, 176, 186)",
            fontSize: "25px",
            padding: "20px",
            justifyContent: "flex-end",
            marginRight: "20px",
          }}
        >
          {" "}
          <p className="links">All</p>
         <Link className="links" to="/createShark"> <p >Create</p></Link>
         
          <div style={{ margin:"auto 20px" }}>
            <p
              style={{ fontSize: "20px" }}
              className="links"
              onClick={handleLogout}
            >
              Logout
            </p>
          </div>
        </div>
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
            backgroundColor: " rgb(34, 176, 186, 0.08)",
            borderRadius: "10px",
            backdropFilter: "blur(5px)",
          }}
        >
          <ContainerCards>
            {sharks.map((shark, index) => (
              <Card
                key={index}
                id={shark._id}
                commonName={shark.commonName}
                specie={shark.specie}
                image={shark.image}
              />
            ))}
          </ContainerCards>
        </div>
        {/* <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          /> */}
      </div>
    </div>
  );
};

export default AdminHome;
