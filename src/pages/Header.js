import React from "react";
import { useNavigate } from "react-router-dom";
export default function Header() {
  const navigate = useNavigate();
  return (
    <div>
      <h3>Coin Pulse</h3>
      <button onClick={() => navigate("/")}>
        <img style={{ width: "100px" }} src="./logoImage.png" />
      </button>
      <p>[🌙/☀️] </p>
    </div>
  );
}
