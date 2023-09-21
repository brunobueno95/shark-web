/* eslint-disable no-unused-vars */
import "./LoginAdmin.css";
import { useState, useEffect } from "react";
import { GiSharkBite } from "react-icons/gi";
import { BiUser } from "react-icons/bi";
import { AiOutlineLock } from "react-icons/ai";
import { CgArrowLeftO } from "react-icons/cg";
import { Link } from "react-router-dom";
import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

import Cookies from "js-cookie";

const LoginAdmin = () => {
  const [isHovered, setIsHovered] = useState(false);

  const [userName, setUserName] = useState();
  const [userPassword, setUserPassword] = useState();
  const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);

  const navigate = useNavigate();

  useEffect(() => {
    console.log("isAuthenticated:", isAuthenticated);
  }, [isAuthenticated]);

  const handleLogin = async () => {
    try {
      const response = await axios.post("http://localhost:8080/login", {
        userName,
        password: userPassword,
      });

      // Check the response from the server
      if (response.status === 200) {
        // Authentication successful, you can redirect or set user state here
        console.log("Login successful:", response.data);
        Cookies.set("isLoggedIn", "true", { expires: 1 });
        setIsAuthenticated(true);
        navigate("/adminHome");
      } else {
        // Authentication failed, handle error
        console.log("Login failed:", response.data.error);
        setIsAuthenticated(false);
      }
    } catch (error) {
      // Handle network or other errors
      console.error("Error:", error);
      setIsAuthenticated(false);
    }
  };

  return (
    <>
      <Link to={"/"}>
        <CgArrowLeftO
          style={{
            fontSize: "45px",
            margin: "30px",
            color: isHovered ? "rgb(42, 224, 237)" : "rgb(34, 176, 186)",
          }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        />
      </Link>
      <div
        style={{
          margin: "auto",
        }}
      >
        <div
          style={{
            backgroundColor: "rgba(0, 0, 0, 0.816)",
            height: "58vh",
            minHeight: "550px",
            width: "30vw",
            minWidth: "450px",
            backdropFilter: "blur(5px)",
            borderRadius: "10px",
            boxShadow: "0px 0px 20px black",
            display: "flex",
            flexDirection: "column",
            gap: "20px",
            padding: "0 30px ",
          }}
        >
          <h1 style={{ color: "white", alignText: "center" }}>
            {isAuthenticated}
          </h1>
          <h1
            style={{
              color: "whitesmoke",
              textAlign: "center",
              marginTop: "30px",
              fontSize: "40px",
            }}
          >
            Admin Login
          </h1>

          <div
            style={{
              display: "flex",
              flexDirection: "row",
              gap: "15px",
              alignItems: "flex-end",
            }}
          >
            <div
              style={{
                height: "1px",
                width: "50%",
                backgroundColor: "rgb(34, 176, 186)",
              }}
            ></div>
            <GiSharkBite fontSize="40px" color="rgb(34, 176, 186)" />
            <div
              style={{
                height: "1px",
                width: "50%",
                backgroundColor: "rgb(34, 176, 186)",
              }}
            ></div>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "20px",
              marginTop: "70px ",
              alignItems: "center",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                width: "60%",
                alignItems: "center",
                gap: "20px",
              }}
            >
              {" "}
              <BiUser fontSize="40px" color=" rgb(34, 176, 186)" />{" "}
              <input
                style={{ width: "100%", height: "25px" }}
                onChange={(e) => {
                  setUserName(e.target.value);
                }}
              />
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "row",
                width: "60%",
                alignItems: "center",
                gap: "20px",
              }}
            >
              {" "}
              <AiOutlineLock fontSize="40px" color=" rgb(34, 176, 186)" />{" "}
              <input
                type="password"
                style={{ width: "100%", height: "25px" }}
                onChange={(e) => {
                  setUserPassword(e.target.value);
                }}
              />
            </div>
          </div>

          <button
            style={{
              width: "150px",
              height: "40px",
              margin: "auto",
              backgroundColor: "rgb(34, 176, 186)",
              border: "none",
              borderRadius: "10px",
              boxShadow: "0px 0px 60px black",
              fontSize: "18px",
              color: "whitesmoke",
              cursor: "pointer",
            }}
            onClick={handleLogin}
          >
            {" "}
            Log In
          </button>
        </div>
      </div>
    </>
  );
};

export default LoginAdmin;
