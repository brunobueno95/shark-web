/* eslint-disable no-unused-vars */
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { AiOutlineFileAdd } from "react-icons/ai";
import { IoMdAdd } from "react-icons/io";
import { RiDeleteBackLine } from "react-icons/ri";
import { CgAddR } from "react-icons/cg";
import { useState } from "react";

const CreateShark = () => {
  //create shark states from input

  const [commonName, setCommonName] = useState();
  const [specie, setSpecie] = useState();
  const [family, setFamily] = useState();
  const [size, setSize] = useState();
  const [depth, setDepth] = useState();
  const [info, setInfo] = useState();
  const [image, setImage] = useState();
  const [eachCountry, setEachCountry] = useState("");
  const [countriesChosen, setCountriesChosen] = useState(["Brasil", "USA"]);

  //input image file stuff
  const [fileInputState, setFileInputState] = useState();
  const [previewSource, setPreviewSource] = useState();

  //popBox

  const [popSucceed, setPopSucceed] = useState();

  const navigate = useNavigate();
  const handleLogout = () => {
    Cookies.remove("isLoggedIn");
    navigate("/");
  };
  const handleAddCountry = () => {
    if (eachCountry.trim() !== "") {
      setCountriesChosen((prevCountries) => [...prevCountries, eachCountry]);
      setEachCountry("");
    }
  };

  const handleRemoveLastCountry = () => {
    if (countriesChosen.length > 0) {
      const updatedCountries = countriesChosen.slice(0, -1);
      setCountriesChosen(updatedCountries);
    }
  };

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    previewFile(file);
  };

  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader.result);
      setImage(reader.result);
      console.log(previewSource);
    };
  };

  const addObjectShark = () => {
    // Create the shark object
    const shark = {
      commonName,
      specie,
      family,
      size,
      countries: countriesChosen,
      depth,
      info,
      image,
    };
    console.log(shark);
    // Make a POST request to your server
    fetch("http://localhost:8080/sharks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(shark),
    })
      .then((response) => {
        if (response.status === 201) {
          return response.json();
        } else {
          throw new Error("Failed to add shark");
        }
      })
      .then((data) => {
        console.log("Shark added:", data);
        setPopSucceed(true);
      })
      .catch((error) => {
        console.error("Error adding shark:", error);
        // Handle the error
      });
  };

  const proceed = () => {
    setPopSucceed(false);
    navigate("/adminHome");
  };

  return (
    <>
      <div
        style={{
          height: "20px",
          width: "100vw",
          backgroundColor: "rgba(0, 0, 0, 0.516)",
          display: "flex",
          flexDirection: "row",
          gap: "35px",
          color: "rgb(34, 176, 186)",
          fontSize: "25px",
          padding: "20px",
          justifyContent: "flex-end",
          marginRight: "20px",
          alignItems:"center"
          
        }}
      >
        {" "}
        <Link to="/adminHome" className="links">
          {" "}
          <p className="links">All</p>
        </Link>
        <Link className="links" to="/createShark">
          {" "}
          <p>Create</p>
        </Link>
        <p className="links" onClick={handleLogout}>
          Logout
        </p>
      </div>
      <div
        style={{
          margin: "auto",
          height: "100vh",
          width: "60vw",
          backdropFilter: "blur(5px)",
          backgroundColor: "rgba(0, 0, 0, 0.716)",
          display: "flex",
          flexDirection: "column",
          paddingTop: "20px",
          alignItems: "center",
        }}
      >
        <div style={{ height: "30%", width: "35%", marginBottom:"20px" }}>
          <label htmlFor="file-input">
            <div
              style={{
                backgroundColor: !previewSource ? "rgb(34, 176, 186, 0.5)" :"rgb(34, 176, 186, 0.2)" ,
                height: "100%",
                width: "100%",
                borderRadius: "10px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginBottom: "30px",
                cursor: "pointer",
              }}
            >
              {" "}
              {previewSource && (
                <img
                  src={previewSource}
                  alt="chosen"
                  style={{
                    height: "100%",
                    width: "100%",
                    zIndex: "-1",
                    position: "relative",
                    marginBottom: "",
                    borderRadius:"10px"
                  }}
                />
              )}
              <AiOutlineFileAdd
                style={{
                  color: "whitesmoke",
                  fontSize: "80px",
                  zIndex: "99999",
                  position:"absolute"
                }}
              />{" "}
            </div>
          </label>
          <input
            type="file"
            id="file-input"
            style={{ display: "none" }}
            value={fileInputState}
            onChange={handleFileInputChange} // Hide the input element
          />
        </div>

        <div
          style={{
            width: "60%",
            height: "70%",
            // border: "1px solid white",
            padding: "20px",
            paddingTop: "40px",
            display: "flex",
            flexDirection: "column",
            gap: "20px",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              width: "100%",
              height: "50px",
              //  border: "1px solid white",
              display: "flex",
              flexDirection: "row",
            }}
          >
            <div
              style={{
                width: "50%",
                height: "100%",
                // border: "1px solid red",
                display: "flex",
                flexDirection: "row",
                gap: "10px",
                alignItems: "center",
                justifyContent: "flex-end",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "flex-end",
                  width: "50%",
                }}
              >
                <p style={{ color: "white", fontSize: "25px", margin: "0" }}>
                  Name:
                </p>
              </div>
              <input
                style={{ width: "60%", height: "25px" }}
                onChange={(e) => setCommonName(e.target.value)}
              />
            </div>

            <div
              style={{
                width: "50%",
                height: "100%",
                // border: "1px solid red",
                display: "flex",
                flexDirection: "row",
                gap: "10px",
                alignItems: "center",
                justifyContent: "flex-end",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "flex-end",
                  width: "20%",
                }}
              >
                <p style={{ color: "white", fontSize: "25px", margin: "0" }}>
                  Specie:
                </p>
              </div>
              <input
                style={{ width: "60%", height: "25px" }}
                onChange={(e) => setSpecie(e.target.value)}
              />
            </div>
          </div>

          <div
            style={{
              width: "100%",
              height: "50px",
              //   border: "1px solid white",
              display: "flex",
              flexDirection: "row",
            }}
          >
            <div
              style={{
                width: "50%",
                height: "100%",
                // border: "1px solid red",
                display: "flex",
                flexDirection: "row",
                gap: "10px",
                alignItems: "center",
                justifyContent: "flex-end",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "flex-end",
                  width: "50%",
                }}
              >
                <p style={{ color: "white", fontSize: "25px", margin: "0" }}>
                  Family:
                </p>
              </div>
              <input
                style={{ width: "60%", height: "25px" }}
                onChange={(e) => setFamily(e.target.value)}
              />
            </div>

            <div
              style={{
                width: "50%",
                height: "100%",
                // border: "1px solid red",
                display: "flex",
                flexDirection: "row",
                gap: "10px",
                alignItems: "center",
                justifyContent: "flex-end",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "flex-end",
                  width: "20%",
                }}
              >
                <p style={{ color: "white", fontSize: "25px", margin: "0" }}>
                  Depth:
                </p>
              </div>
              <input
                style={{ width: "60%", height: "25px" }}
                onChange={(e) => setDepth(e.target.value)}
              />
            </div>
          </div>

          <div
            style={{
              width: "100%",
              height: "50px",
              //   border: "1px solid white",
              display: "flex",
              flexDirection: "row",
            }}
          >
            <div
              style={{
                width: "50%",
                height: "100%",
                // border: "1px solid red",
                display: "flex",
                flexDirection: "row",
                gap: "10px",
                alignItems: "center",
                justifyContent: "flex-end",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "flex-end",
                  width: "50%",
                }}
              >
                <p style={{ color: "white", fontSize: "25px", margin: "0" }}>
                  Countries:
                </p>
              </div>
              <div
                style={{ width: "60%", display: "flex", flexDirection: "row" }}
              >
                {" "}
                <input
                  style={{ width: "80%", height: "25px" }}
                  value={eachCountry}
                  onChange={(e) => setEachCountry(e.target.value)}
                />
                <CgAddR
                  style={{
                    width: "20%",
                    cursor: "pointer",
                    backgroundColor: "rgb(0,0,0,0.1)",
                    fontSize: "30px",
                    color: "whitesmoke",
                  }}
                  onClick={handleAddCountry}
                />
                {/* <IoMdAdd style={{ color: "whitesmoke", fontSize: "20px" }} />
                </button> */}
              </div>
            </div>

            <div
              style={{
                width: "50%",
                height: "100%",
                // border: "1px solid red",
                display: "flex",
                flexDirection: "row",
                gap: "10px",
                alignItems: "center",
                justifyContent: "flex-end",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "flex-end",
                  width: "20%",
                }}
              >
                <p style={{ color: "white", fontSize: "25px", margin: "0" }}>
                  Size:
                </p>
              </div>
              <input
                style={{ width: "60%", height: "25px" }}
                onChange={(e) => setSize(e.target.value)}
              />
            </div>
          </div>
          <div
            style={{
              width: "100%",
              height: "50px",
              // border: "1px solid white",
              display: "flex",
              flexDirection: "row",
              gap: "10px",
              justifyContent: "center",
            }}
          >
            {" "}
            <div
              style={{
                width: "50%",
                height: "100%",
                // border: "1px solid red",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "flex-start",
              }}
            >
              {countriesChosen.map((c, i) =>
                i === countriesChosen.length - 1 ? (
                  <p
                    style={{ color: "rgb(58, 190, 200)", fontSize: "25px" }}
                    key={i}
                  >
                    {c}
                  </p>
                ) : (
                  <p
                    style={{ color: "rgb(58, 190, 200)", fontSize: "25px" }}
                    key={i}
                  >
                    {c},&nbsp;
                  </p>
                )
              )}
              <RiDeleteBackLine
                style={{
                  width: "7%",
                  height: "30px",
                  marginLeft: "10px",
                  cursor: "pointer",
                  backgroundColor: "rgb(0,0,0,0.1)",
                  color: "whitesmoke",
                }}
                onClick={handleRemoveLastCountry}
              />
            </div>
          </div>

          <div style={{ height: "100%", width: "100%" }}>
            <div
              style={{
                width: "100%",
                height: "50px",
                // border: "1px solid white",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <p style={{ color: "white", fontSize: "25px", margin: "0" }}>
                Information:
              </p>
            </div>
            <div
              style={{
                width: "70%",
                height: "50%",
                // border: "1px solid white",
                margin: "0 auto",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <textarea
                id="textArea"
                rows="4"
                cols="50"
                placeholder="Enter shark information here..."
                style={{ borderRadius: "10px" }}
                onChange={(e) => setInfo(e.target.value)}
              ></textarea>
            </div>
            <div
              style={{
                width: "100%",
                height: "60px",
                // border: "1px solid white",
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                marginTop: "30px",
              }}
            >
              <button
                onClick={addObjectShark}
                style={{
                  height: "70%",
                  width: "130px",
                  backgroundColor: "rgb(34, 176, 186)",
                  border: "none",
                  borderRadius: "10px",
                  boxShadow: "0px 0px 10px black",
                  fontSize: "18px",
                  color: "whitesmoke",
                  cursor: "pointer",
                }}
              >
                Add Shark
              </button>
            </div>
          </div>
        </div>
        {popSucceed && (
          <div
            style={{
              position: "absolute",
              height: "100vh",
              width: "100vw",
              backdropFilter: "blur(6px)",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                height: "60%",
                width: "60%",
                backgroundColor: "#090909",
                borderRadius: "10px",
                marginTop: "80px",
                border: "#22b0ba solid 2px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              <h1 style={{ color: "whitesmoke", fontSize: "45px" }}>
                Your new shark was created{" "}
              </h1>
              <button
                style={{
                  height: "70px",
                  width: "130px",
                  backgroundColor: "rgb(34, 176, 186)",
                  border: "none",
                  borderRadius: "10px",
                  boxShadow: "0px 0px 10px black",
                  fontSize: "18px",
                  color: "whitesmoke",
                  cursor: "pointer",
                }}
                onClick={proceed}
              >
                Continue
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default CreateShark;
