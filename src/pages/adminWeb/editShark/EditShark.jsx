/* eslint-disable no-unused-vars */
import { useParams } from "react-router-dom";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { BiEditAlt } from "react-icons/bi";
import { CgArrowLeftO } from "react-icons/cg";

const EditShark = () => {
  const [shark, setShark] = useState();
  const [isHovered, setIsHovered] = useState(false);
  const [fileInputState, setFileInputState] = useState();
  const [previewSource, setPreviewSource] = useState();
  //dynamic editing
  const [editBox, setEditBox] = useState();
  const [editField, setEditField] = useState({});
  const [editProperty, setEditProperty] = useState();
  const [editState, setEditState] = useState();

  //shark property states
  const [commonName, setCommonName] = useState();
  const [specie, setSpecie] = useState();
  const [family, setFamily] = useState();
  const [size, setSize] = useState();
  const [depth, setDepth] = useState();
  const [info, setInfo] = useState();
  const [countries, setCountries] = useState();
  const [sharkImg, setSharkImg] = useState();

  //always update
  const [toggleUpdate, setToggleUpdate] = useState();

  const stateUpdateFunctions = {
    commonName: setCommonName,
    specie: setSpecie,
    family: setFamily,
    size: setSize,
    depth: setDepth,
    info: setInfo,
    countries: setCountries,
    sharkImg: setSharkImg,
  };

  const { id } = useParams();
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

  const splitString = (information) => {
    var cuttedString = "";
    for (var i = 0; i < 10; i++) {
      if (information[i] != undefined) {
        cuttedString += information[i];
      }
    }
    cuttedString += "...";
    return cuttedString;
  };

  //input image file stuff
  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    previewFile(file);
  };

  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader.result);
      setSharkImg(reader.result);
      console.log(previewSource);
    };
  };

  const updateSharkObject = (shark) => {
    console.log(specie);
    const updatedShark = { ...shark };

    if (commonName !== undefined) {
      updatedShark.commonName = commonName;
    }

    if (specie !== undefined) {
      updatedShark.specie = specie;
    }

    if (family !== undefined) {
      updatedShark.family = family;
    }

    if (size !== undefined) {
      updatedShark.size = size;
    }

    if (countries !== undefined) {
      updatedShark.countries = [countries];
    }

    if (depth !== undefined) {
      updatedShark.depth = depth;
    }

    if (info !== undefined) {
      updatedShark.info = info;
    }

    if (sharkImg !== undefined) {
      updatedShark.image = sharkImg;
    }

    console.log(updatedShark)
    return updatedShark;
  };

  const saveChanges = async (shark) => {
    console.log(shark);
    try {
      const response = await axios.put(
        `http://localhost:8080/sharks/${id}`,
        shark
      );

      // Handle the response from the server if needed
      console.log("Shark added successfully:", response.data);
    } catch (error) {
      // Handle errors
      console.error(
        "Error adding shark:",
        error.response ? error.response.data : error.message
      );
    }
  };

  const edit = (field, stateProperty) => {
    console.log("Received stateProperty:", stateProperty);

    // Use the stateProperty to get the appropriate state update function
    const stateUpdateFunction = stateUpdateFunctions[stateProperty];

    setEditState(() => stateUpdateFunction); // Set the correct state update function
    setEditField(field);
    setEditBox(true);
  };
  useEffect(() => {
    if (shark) {
      const updatedShark = updateSharkObject(shark);
      setShark(updatedShark);
    }
  }, [toggleUpdate, previewSource]);

  const save = () => {
    if (editState) {
      // Invoke the state update function
      editState(editProperty);
    }
    setEditBox(false);
    if (toggleUpdate) {
      setToggleUpdate(false);
    } else {
      setToggleUpdate(true);
    }
    setEditProperty("");
  };
  const cancel = () => {
    setEditBox(false);
  };
  return (
    <div
      style={{
        minHeight: "100vh",
        height: "auto",
        width: "70vw",
        backdropFilter: "blur(5px)",
        backgroundColor: "rgb(0,0,0,0.7)",
        marginTop: "0",
        margin: "0",
      }}
    >
      <Link to={`/adminHome/shark/${id}`}>
        <CgArrowLeftO
          style={{
            fontSize: "40px",
            marginTop: "30px",
            marginLeft: "20px",
            marginBottom: "0",
            color: isHovered ? "rgb(42, 224, 237)" : "rgb(34, 176, 186)",
          }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        />
      </Link>
      <h1
        style={{
          fontSize: "50px",
          color: "whitesmoke",
          textAlign: "center",
          margin: "0",
        }}
      >
        Edit Shark
      </h1>
      {shark && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "40px",
            gap: "10px",

            padding: "20px",
          }}
        >
          <div style={{ position: "relative", width: "50%" }}>
            <label htmlFor="file-input">
              <div
                style={{
                  position: "absolute",
                  backgroundColor: "rgb(0,0,0,0.3)",
                  height: "100%",
                  width: "100%",
                  borderRadius: "20px ",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  cursor: "pointer",
                }}
              >
                <BiEditAlt
                  style={{
                    fontSize: "50px",
                    color: "whitesmoke",
                    cursor: "pointer",
                  }}
                />
              </div>
            </label>

            <input
              type="file"
              id="file-input"
              style={{ display: "none" }}
              value={fileInputState}
              onChange={handleFileInputChange} // Hide the input element
            />

            {previewSource ? (
              <img
                src={previewSource}
                alt="chosen"
                style={{ width: "100%", height: "100%", borderRadius: "20px" }}
              />
            ) : (
              <img
                alt={shark.commonName}
                src={shark.image}
                style={{
                  width: "100%",
                  height: "100%",
                  borderRadius: "20px",
                }}
              />
            )}
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              width: "70%",
              //  border: "1px solid white",
              gap: "20px",
              marginTop: "10px",
              backgroundColor: "rgb(0,0,0,0.5)",
              borderRadius: "20PX",
              padding: "20px 0",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                width: "100%",
                gap: "20px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  width: "50%",
                  gap: "20px",
                  //  border: "1px solid white"
                }}
              >
                {" "}
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    height: "40px",
                    gap: "10px",

                    alignItems: "center",
                  }}
                >
                  <div
                    style={{
                      width: "50%",
                      display: "flex",
                      justifyContent: "flex-end",
                    }}
                  >
                    <h2 style={{ fontSize: "25px", color: "whitesmoke" }}>
                      Name:
                    </h2>
                  </div>
                  <div
                    style={{
                      width: "50%",
                      display: "flex",
                      justifyContent: "flex-end",
                      alignItems: "center",
                      flexDirection: "row",
                      gap: "10px",
                    }}
                  >
                    <h2
                      style={{
                        fontSize: "20px",
                        color: "whitesmoke",
                        fontWeight: "normal",
                      }}
                    >
                      {shark.commonName}
                    </h2>{" "}
                    <BiEditAlt
                      style={{
                        fontSize: "20px",
                        color: "whitesmoke",
                        cursor: "pointer",
                      }}
                      onClick={() =>
                        edit(
                          {
                            editName: "Common Name:",
                            editPlaceHolder: shark.commonName,
                          },
                          "commonName"
                        )
                      }
                    />
                  </div>
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    height: "40px",
                    gap: "10px",

                    alignItems: "center",
                  }}
                >
                  <div
                    style={{
                      width: "50%",
                      display: "flex",
                      justifyContent: "flex-end",
                    }}
                  >
                    <h2 style={{ fontSize: "25px", color: "whitesmoke" }}>
                      Specie:
                    </h2>
                  </div>
                  <div
                    style={{
                      width: "50%",
                      display: "flex",
                      justifyContent: "flex-end",
                      alignItems: "center",
                      flexDirection: "row",
                      gap: "10px",
                    }}
                  >
                    <h2
                      style={{
                        fontSize: "20px",
                        color: "whitesmoke",
                        fontWeight: "normal",
                      }}
                    >
                      {shark.specie}
                    </h2>{" "}
                    <BiEditAlt
                      style={{
                        fontSize: "20px",
                        color: "whitesmoke",
                        cursor: "pointer",
                      }}
                      onClick={() =>
                        edit(
                          {
                            editName: "Specie:",
                            editPlaceHolder: shark.specie,
                          },
                          "specie"
                        )
                      }
                    />
                  </div>
                </div>
                {""}
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    height: "40px",
                    gap: "10px",

                    alignItems: "center",
                  }}
                >
                  <div
                    style={{
                      width: "50%",
                      display: "flex",
                      justifyContent: "flex-end",
                    }}
                  >
                    <h2 style={{ fontSize: "25px", color: "whitesmoke" }}>
                      Family:
                    </h2>
                  </div>
                  <div
                    style={{
                      width: "50%",
                      display: "flex",
                      justifyContent: "flex-end",
                      alignItems: "center",
                      flexDirection: "row",
                      gap: "10px",
                    }}
                  >
                    <h2
                      style={{
                        fontSize: "20px",
                        color: "whitesmoke",
                        fontWeight: "normal",
                      }}
                    >
                      {shark.family}
                    </h2>{" "}
                    <BiEditAlt
                      style={{
                        fontSize: "20px",
                        color: "whitesmoke",
                        cursor: "pointer",
                      }}
                      onClick={() =>
                        edit(
                          {
                            editName: "Family:",
                            editPlaceHolder: shark.family,
                          },
                          "family"
                        )
                      }
                    />
                  </div>
                </div>
                {""}
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    height: "40px",
                    gap: "10px",

                    alignItems: "center",
                  }}
                >
                  <div
                    style={{
                      width: "50%",
                      display: "flex",
                      justifyContent: "flex-end",
                    }}
                  >
                    <h2 style={{ fontSize: "25px", color: "whitesmoke" }}>
                      Size:
                    </h2>
                  </div>
                  <div
                    style={{
                      width: "50%",
                      display: "flex",
                      justifyContent: "flex-end",
                      alignItems: "center",
                      flexDirection: "row",
                      gap: "10px",
                    }}
                  >
                    <h2
                      style={{
                        fontSize: "20px",
                        color: "whitesmoke",
                        fontWeight: "normal",
                      }}
                    >
                      {shark.size}
                    </h2>{" "}
                    <BiEditAlt
                      style={{
                        fontSize: "20px",
                        color: "whitesmoke",
                        cursor: "pointer",
                      }}
                      onClick={() =>
                        edit(
                          {
                            editName: "Size:",
                            editPlaceHolder: shark.size,
                          },
                          "size"
                        )
                      }
                    />
                  </div>
                </div>{" "}
              </div>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  width: "50%",
                  //  border: "1px solid white",
                  gap: "20px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    height: "40px",
                    gap: "10px",

                    alignItems: "center",
                  }}
                >
                  <div
                    style={{
                      width: "50%",
                      display: "flex",
                      justifyContent: "flex-start",
                      marginLeft: "20px",
                    }}
                  >
                    <h2 style={{ fontSize: "25px", color: "whitesmoke" }}>
                      Countries:
                    </h2>
                  </div>
                  <div
                    style={{
                      width: "50%",
                      display: "flex",
                      justifyContent: "flex-start",
                      alignItems: "center",
                      flexDirection: "row",
                      gap: "10px",
                    }}
                  >
                    <h2
                      style={{
                        fontSize: "20px",
                        color: "whitesmoke",
                        fontWeight: "normal",
                      }}
                    >
                      {shark.countries[0].length > 10
                        ? splitString(shark.countries[0])
                        : (shark.countries[0] += "...")}
                    </h2>{" "}
                    <BiEditAlt
                      style={{
                        fontSize: "20px",
                        color: "whitesmoke",
                        cursor: "pointer",
                      }}
                      onClick={() =>
                        edit(
                          {
                            editName: "Countries:",
                            editPlaceHolder: shark.countries,
                          },
                          "countries"
                        )
                      }
                    />
                  </div>
                </div>{" "}
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    height: "40px",
                    gap: "10px",

                    alignItems: "center",
                  }}
                >
                  <div
                    style={{
                      width: "50%",
                      display: "flex",
                      justifyContent: "flex-start",
                      marginLeft: "20px",
                    }}
                  >
                    <h2 style={{ fontSize: "25px", color: "whitesmoke" }}>
                      Depth:
                    </h2>
                  </div>
                  <div
                    style={{
                      width: "50%",
                      display: "flex",
                      justifyContent: "flex-start",
                      alignItems: "center",
                      flexDirection: "row",
                      gap: "10px",
                    }}
                  >
                    <h2
                      style={{
                        fontSize: "20px",
                        color: "whitesmoke",
                        fontWeight: "normal",
                      }}
                    >
                      {shark.depth}
                    </h2>{" "}
                    <BiEditAlt
                      style={{
                        fontSize: "20px",
                        color: "whitesmoke",
                        cursor: "pointer",
                      }}
                      onClick={() =>
                        edit(
                          {
                            editName: "Depth :",
                            editPlaceHolder: shark.depth,
                          },
                          "depth"
                        )
                      }
                    />
                  </div>
                </div>{" "}
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    height: "40px",
                    gap: "10px",

                    alignItems: "center",
                  }}
                >
                  <div
                    style={{
                      width: "50%",
                      display: "flex",
                      justifyContent: "flex-start",
                      marginLeft: "20px",
                    }}
                  >
                    <h2 style={{ fontSize: "25px", color: "whitesmoke" }}>
                      Information:
                    </h2>
                  </div>
                  <div
                    style={{
                      width: "50%",
                      display: "flex",
                      justifyContent: "flex-start",
                      alignItems: "center",
                      flexDirection: "row",
                      gap: "10px",
                    }}
                  >
                    <h2
                      style={{
                        fontSize: "20px",
                        color: "whitesmoke",
                        fontWeight: "normal",
                      }}
                    >
                      {splitString(shark.info)}
                    </h2>{" "}
                    <BiEditAlt
                      style={{
                        fontSize: "20px",
                        color: "whitesmoke",
                        cursor: "pointer",
                      }}
                      onClick={() =>
                        edit(
                          {
                            editName: "Information :",
                            editPlaceHolder: shark.info,
                          },
                          "info"
                        )
                      }
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
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
              marginTop: "30px",
            }}
            onClick={() => saveChanges(shark)}
          >
            {" "}
            Confirm
          </button>
        </div>
      )}

      {editBox && (
        <div
          style={{
            height: "100%",
            width: "100%",
            backdropFilter: "blur(6px)",
            position: "absolute",
            top: "0",
            left: "0",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgb(0,0,0,0.6)",
          }}
        >
          <div
            style={{
              height: "auto",
              width: "50%",
              backgroundColor: "#131313",
              borderRadius: "20px",
              boxShadow: "0 0  10px white",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              padding: "20px",
              textAlign: "center",
            }}
          >
            <h1
              style={{
                color: "whitesmoke",
                fontSize: "40px",
                marginBottom: "0",
              }}
            >
              {editField.editName}
            </h1>
            {editField.editName != "Information :" ? (
              <input
                style={{ width: "30%", height: "30px", margin: "0 auto" }}
                placeholder={editField.editPlaceHolder}
                onChange={(e) => setEditProperty(e.target.value)}
              />
            ) : (
              <textarea
                rows="4"
                cols="50"
                placeholder={shark && shark.info}
                style={{
                  borderRadius: "10px",
                  width: "50%",
                  height: "40%",
                  margin: "10px auto",
                }}
                onChange={(e) => setEditProperty(e.target.value)}
              />
            )}

            <div
              style={{
                display: "flex",
                flexDirection: "row",
                gap: "20px",
                justifyContent: "center",
                marginTop: "50px",
              }}
            >
              <button
                style={{
                  backgroundColor: "green",
                  width: "120px",
                  height: "40px",
                  border: "none",
                  color: "whitesmoke",
                  fontSize: "20px",
                  borderRadius: "10px",
                }}
                onClick={save}
              >
                save
              </button>
              <button
                style={{
                  backgroundColor: "red",
                  width: "120px",
                  height: "40px",
                  border: "none",
                  color: "whitesmoke",
                  fontSize: "20px",
                  borderRadius: "10px",
                }}
                onClick={cancel}
              >
                cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditShark;
