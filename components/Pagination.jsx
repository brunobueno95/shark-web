import React from "react";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pageNumbers = [...Array(totalPages).keys()].map((num) => num + 1);

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

            backgroundColor: "#cfcfcf",
            border: "1px solid #2b2b2b",
          }}
        >
          {pageNumber}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
