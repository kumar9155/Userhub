import React from "react";
import style from "./Search.module.css"

const Search = () => {
  return (
    <div className={style.search}>
 <div className={style.search_content}>
      <input type="text" placeholder="Search" />
      <button>Search</button>
    </div>
    </div>
   
  );
};

export default Search;
