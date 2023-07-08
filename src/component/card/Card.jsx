import React from "react";
import style from "./Card.module.css";

const Card = ({
  avatar,
  first_name,
  last_name,
  gender,
  email,
  domain,
  available,
}) => {
  return (
    <div className={style.card}>
      <div className={style.card_avatar}>
        <img src={avatar} alt="Avatar" />
      </div>
      <h3>
        Name : {first_name} {last_name}
      </h3>
      <h3>Gender : {gender}</h3>
      <h3>email : {email}</h3>
      <h3>domain : {domain}</h3>
      <h3>Availability : {available ? "Yes" : "No"}</h3>
    </div>
  );
};

export default Card;
