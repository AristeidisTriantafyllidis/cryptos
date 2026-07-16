import React from "react";
import { useState, useEffect } from "react";

export default function MainPage(props) {
  const [cryptos, setCryptos] = useState([]);
  useEffect(() => {
    if (props.coins) {
      setCryptos(props.coins);
    }
  }, [props.coins]);

  let page = cryptos.map((crypto) => {
    return (
      <div key={crypto.id}>
        <p>{crypto.name}</p>
        <p>
          <img src={crypto.image} />
        </p>
        <p>{crypto.price_change_percentage_24h} %</p>
      </div>
    );
  });
  return <div>{page}</div>;
}
