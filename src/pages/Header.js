import React, { startTransition } from "react";
import { useNavigate } from "react-router-dom";

export default function Header(props) {
  const navigate = useNavigate();

  function handleChange(e) {
    props.setSearchCrypto(e.target.value);
  }
  return (
    <div>
      <h3>Coin Pulse</h3>
      <button onClick={() => navigate("/")}>
        <img style={{ width: "100px" }} src="./logoImage.png" />
      </button>
      [ <button onClick={() => props.setBackgroundColor("black")}>🌙</button> /
      <button onClick={() => props.setBackgroundColor("white")}>☀️</button>]
      <input
        placeholder="Search crypto"
        type="text"
        value={props.searchCrypto}
        onChange={handleChange}
      ></input>
    </div>
  );
}
