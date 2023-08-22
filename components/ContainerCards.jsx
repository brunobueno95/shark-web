import React from "react";

const ContainerCards = ({ children }) => {
  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        alignContent: "center",
        gap: "20px",
        height: "auto",
        width: "95%",
        padding: "20px",
      }}
    >
      {children}
    </div>
  );
};

export default ContainerCards;
