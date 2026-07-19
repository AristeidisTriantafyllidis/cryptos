import React from "react";
import { useState, useEffect } from "react";
import { LineGraph } from "../components/Chart";

export default function MainPage(props) {
  const [cryptos, setCryptos] = useState([]);
  const [trendingCryptos, setTrendingCoins] = useState([]);
  useEffect(() => {
    if (props.coins) {
      setCryptos(props.coins);
    }
    if (props.trendingCoins) {
      setTrendingCoins(props.trendingCoins);
    }
  }, [props.coins, props.trendingCoins]);

  let trending = trendingCryptos.map((crypto) => {
    const pricePercentageDaily = Number(
      crypto.item.data.price_change_percentage_24h.eur,
    );
    let percentageText = "";
    if (pricePercentageDaily > 0) {
      percentageText = "+" + pricePercentageDaily.toFixed(2);
    } else {
      percentageText = pricePercentageDaily.toFixed(2);
    }
    return (
      <div key={crypto.item.coin_id}>
        <p>{crypto.item.name}</p>
        <p>{percentageText}</p>
      </div>
    );
  });
  console.log(cryptos);
  let allCryptos = cryptos.map((crypto) => {
    const pricePercentageDaily = Number(crypto?.price_change_percentage_24h);
    let percentageText = "";
    if (pricePercentageDaily > 0) {
      percentageText = "+" + pricePercentageDaily.toFixed(2);
    } else {
      percentageText = pricePercentageDaily.toFixed(2);
    }
    const cryptoPrices = crypto?.sparkline_in_7d.price;
    return (
      <div key={crypto.id}>
        <p>{crypto.name}</p>
        <p>
          <img alt="crypto logo " src={crypto.image} />
        </p>
        <p>{crypto.current_price} $</p>
        <p>{percentageText} %</p>
        <div>
          <LineGraph priceArray={cryptoPrices} />
        </div>
      </div>
    );
  });
  return (
    <div>
      <p>trending 🔥</p>
      {trending}
      {allCryptos}
    </div>
  );
}
