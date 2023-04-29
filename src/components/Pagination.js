import React, { useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import "../css/Pagination.css";

const Pagination = ({ postsPerPage, totalUsers, paginate, currentPage }) => {
  const [pageNumber, setPageNumber] = useState(1);
  const [pageLimit, setPageLimit] = useState(5);
  const [maxPageNumberLimit, setMaxPageNumberLimit] = useState(5);
  const [minPageNumberLimit, setMinPageNumberLimit] = useState(0);

  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalUsers / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  const handleNextBtn = () => {
    if (pageNumber >= pageNumbers[pageNumbers.length - 1]) {
      return;
    }
    paginate(pageNumber + 1);
    setPageNumber(pageNumber + 1);

    if (currentPage + 1 > maxPageNumberLimit) {
      setMaxPageNumberLimit(maxPageNumberLimit + pageLimit);
      setMinPageNumberLimit(minPageNumberLimit + pageLimit);
    }
  };

  const handlePrevBtn = () => {
    if (pageNumber <= 1) {
      return;
    }
    paginate(pageNumber - 1);
    setPageNumber(pageNumber - 1);

    if ((currentPage - 1) % pageLimit === 0) {
      setMaxPageNumberLimit(maxPageNumberLimit - pageLimit);
      setMinPageNumberLimit(minPageNumberLimit - pageLimit);
    }
  };

  return (
    <div className="pagination">
      <div className="actions">
        <FaChevronLeft onClick={handlePrevBtn} className="btn" />
        <ul>
          {/* {nums.map((num) => (
            <li key={Math.random() * 10}>{num}</li>
          ))} */}
          {pageNumbers &&
            pageNumbers.map((number) => {
              if (
                number < maxPageNumberLimit + 1 &&
                number > minPageNumberLimit
              )
                return (
                  <li
                    key={number}
                    onClick={(e) => {
                      setPageNumber(number);
                      paginate(number);
                    }}
                    className={currentPage === number ? "color-active" : ""}
                  >
                    {number}
                  </li>
                );
              else return null;
            })}
        </ul>
        <FaChevronRight onClick={handleNextBtn} className="btn" />
      </div>
      <div className="background"></div>
    </div>
  );
};

export default Pagination;
