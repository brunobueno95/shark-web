
// eslint-disable-next-line no-unused-vars
import React from "react";
import "./cardCss.css";
 import { Link } from "react-router-dom";

// eslint-disable-next-line react/prop-types
const Card = ({ id, commonName, specie }) => {
  return (
    <Link to={`shark/${id}`}>
    <div className="sharkCard">
      <div className="sharkImage">
        <img src="/images/ocean.jpg" alt="" />
      </div>
      <div className="sharkName">
        <h1 className="commonName">{commonName}</h1>
        <h2 className="specie">{specie}</h2>
      </div>
    </div></Link>
  );
};

export default Card;
