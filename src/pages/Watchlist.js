import React from "react";
import Header from "./Header";
import { useNavigate } from "react-router-dom";

export default function Watchlist(props) {
  const navigate = useNavigate();

  const handleClick = (crypto) => {
    props.findId(crypto.id);
    navigate("/DetailPage");
  };

  let watchlistPage = props?.watchlistData.map((crypto) => {
    return (
      <div key={crypto.id} onClick={() => handleClick(crypto)}>
        <p>{crypto?.name}</p>
        <img src={crypto.image} />
        <p>Current price {crypto.price}</p>
        <p> Daily percentagee:{crypto.percentage24h} %</p>
      </div>
    );

    const handleClick = (crypto) => {
      props.findId(crypto.id);
      navigate("/DetailPage");
    };
  });

  return (
    <div>
      <Header />
      {watchlistPage}
    </div>
  );
}
