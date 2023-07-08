import React from "react";
import Image from "../../assets/heliverse.jpeg";
import style from "./Header.module.css";

const Header = () => {
  return (
    <div className={style.container}>
      <div className={style.logo}>
        <a href="/">
          <img src={Image} alt="logo" />
        </a>
      </div>
      <div className={style.header_rightContent}>
        <ul className={style.header_content}>
          <a href="/"><li>Home</li></a>
          <a href="/"><li>Career</li></a>
         <a href="/"><li>Support</li></a> 
        </ul>
      </div>
    </div>
  );
};

export default Header;
