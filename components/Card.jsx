import React from "react";
import "./cardCss.css";

const Card = ({ commonName, specie }) => {
  return (
    <div className="sharkCard">
      <div className="sharkImage">
        <img src="/images/ocean.jpg" alt="" />
      </div>
      <div className="sharkName">
        <h1 className="commonName">{commonName}</h1>
        <h2 className="specie">{specie}</h2>
      </div>
    </div>
  );
};

export default Card;
