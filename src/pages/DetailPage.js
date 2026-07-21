import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function DetailPage(props) {
  const [coin, setCoin] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (props.specificCoin) {
      setCoin(props.specificCoin);
    }
  }, [props.specificCoin]);
  return (
    <div>
      <button onClick={() => navigate("/")}>Go back</button>
    </div>
  );
}
