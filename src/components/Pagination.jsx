/* eslint-disable react/prop-types */
import { useState } from "react";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pageNumbers = [...Array(totalPages).keys()].map((num) => num + 1);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div style={{ marginTop: "30px", marginBottom: "50px" }}>
      {pageNumbers.map((pageNumber) => (
        <button
          key={pageNumber}
          onClick={() => onPageChange(pageNumber)}
          style={{
            fontWeight: pageNumber === currentPage ? "bold" : "normal",
            height: "30px",
            width: "30px",
            color: isHovered ? "rgb(42, 224, 237)" : " rgb(34, 176, 186)",
            backgroundColor: "black",
            border: "1px solid  rgb(34, 176, 186)",
            cursor:"pointer"
          }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {pageNumber}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
