import React, { useEffect, useState } from "react";

import Card from "../card/Card";
import style from "./Main.module.css";
import { allData } from "../../data/data";

function filterData(searchText, datas) {
  let filtered = datas.filter((item) => {
    let fullName = item.first_name.toLowerCase() + item.last_name.toLowerCase();
    let trimmedSearchValue = searchText.replace(/\s+/g, "");
    return fullName.includes(trimmedSearchValue.toLowerCase());
  });
  return filtered;
}

const Main = () => {
  const [allDatas] = useState(allData); // Store all the data
  const [datas, setDatas] = useState([]); // Store the currently displayed data
  const [searchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(1); // Track the current page
  const [error, setError] = useState("");

  const itemsPerPage = 20; // Number of items to display per page
  const totalPages = Math.ceil(allDatas.length / itemsPerPage); // Calculate the total number of pages

  useEffect(() => {
    setError(""); // Reset the error when searchText changes
    const newData = filterData(searchText, allDatas);
    if (newData.length === 0) {
      setError("Please Enter a Valid User");
    }
    setDatas(newData.slice(0, itemsPerPage));
    setCurrentPage(1); // Reset the current page when the data changes
  }, [searchText, allDatas]);

  useEffect(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const displayedData = allDatas.slice(startIndex, endIndex);
    setDatas(displayedData);
  }, [currentPage, allDatas]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const displayedData = allDatas.slice(startIndex, endIndex);
    setDatas(displayedData);
  }, []); // Empty dependency array to run only once when the component mounts

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  return (
    <div className={style.main}>
      <div className={style.main_search}>
        <div className={style.seacrh_content}>
          <input
            className={style.search_input}
            type="text"
            placeholder="Search"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <button
            className={style.search_button}
            onClick={() => {
              const data = filterData(searchText, allDatas);
              if (data.length === 0) {
                setError("Please Enter a Valid User");
              }
              setDatas(data.slice(0, itemsPerPage));
              setCurrentPage(1);
            }}
          >
            Search
          </button>
        </div>
      </div>

      <div className={style.error_box}>{error && <p className={style.error}>{error}</p>}</div>
      <div className={style.main_Card}>
        {datas.map((data) => {
          return <Card {...data} key={data.id} />;
        })}
      </div>
      <div className={style.pagination}>
        {totalPages > 1 && (
          <ul className={style.paginationList}>
            {currentPage > 1 && (
              <li
                className={`${style.paginationItem}`}
                onClick={() => goToPreviousPage()}
              >
                {"<"}
              </li>
            )}
            <li
              className={`${style.paginationItem} ${
                currentPage === 1 ? style.active : ""
              }`}
              onClick={() => handlePageChange(1)}
            >
              1
            </li>
            {currentPage > 4 && (
              <li className={`${style.paginationItem}`}>...</li>
            )}
            {currentPage > 3 && currentPage <= totalPages && (
              <li
                className={`${style.paginationItem}`}
                onClick={() => handlePageChange(currentPage - 1)}
              >
                {currentPage - 1}
              </li>
            )}
            {currentPage > 2 && currentPage <= totalPages && (
              <li
                className={`${style.paginationItem} ${style.active}`}
                onClick={() => handlePageChange(currentPage)}
              >
                {currentPage}
              </li>
            )}
            {currentPage < totalPages - 1 && (
              <li
                className={`${style.paginationItem}`}
                onClick={() => handlePageChange(currentPage + 1)}
              >
                {currentPage + 1}
              </li>
            )}
            {currentPage < totalPages - 2 && (
              <li className={`${style.paginationItem}`}>...</li>
            )}
            <li
              className={`${style.paginationItem} ${
                currentPage === totalPages ? style.active : ""
              }`}
              onClick={() => handlePageChange(totalPages)}
            >
              {totalPages}
            </li>
            {currentPage < totalPages && (
              <li
                className={`${style.paginationItem}`}
                onClick={() => goToNextPage()}
              >
                {">"}
              </li>
            )}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Main;






