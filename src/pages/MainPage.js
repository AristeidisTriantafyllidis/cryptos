import React from "react";
import Header from "./Header";
import { useState, useEffect } from "react";
import { LineGraph } from "../components/Chart";
import { useNavigate } from "react-router-dom";

export default function MainPage(props) {
  const [cryptos, setCryptos] = useState([]);
  const [trendingCryptos, setTrendingCoins] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    if (props.coins) {
      setCryptos(props.coins);
    }
    if (props.trendingCoins) {
      setTrendingCoins(props.trendingCoins);
    }
  }, [props.coins, props.trendingCoins]);

  const handleClick = (crypto) => {
    props.findId(crypto.id);
    navigate("/DetailPage");
  };
  const formatPrice = (price) => {
    return (price = new Intl.NumberFormat("en-us", {
      style: "currency",
      currency: "USD",
      notation: "compact",
      compactDisplay: "short",
      maximumFractionDigits: 1,
    }).format(price));
  };

  let trending = trendingCryptos.map((crypto) => {
    const pricePercentageDaily = Number(
      crypto.item.data.price_change_percentage_24h.usd,
    );
    let percentageText = "";
    if (pricePercentageDaily > 0) {
      percentageText = "+" + pricePercentageDaily.toFixed(2);
    } else {
      percentageText = pricePercentageDaily.toFixed(2);
    }

    return (
      <div key={crypto.item.coin_id} onClick={() => handleClick(crypto.item)}>
        <p>{crypto.item.name}</p>
        <p>{percentageText}</p>
      </div>
    );
  });

  let allCryptos = cryptos.map((crypto) => {
    const pricePercentageDaily = Number(crypto?.price_change_percentage_24h);
    let percentageText = "";
    if (pricePercentageDaily > 0) {
      percentageText = "+" + pricePercentageDaily.toFixed(2);
    } else {
      percentageText = pricePercentageDaily.toFixed(2);
    }
    const cryptoPrices = crypto?.sparkline_in_7d.price;
    const formatCryptoPrice = formatPrice(crypto?.current_price);
    return (
      <div key={crypto.id} onClick={() => handleClick(crypto)}>
        <p>{crypto.name}</p>
        <p>
          <img alt="crypto logo " src={crypto.image} />
        </p>
        <p>{formatCryptoPrice} $</p>
        <p>{percentageText} %</p>
        <div>
          <LineGraph priceArray={cryptoPrices} />
        </div>
      </div>
    );
  });
  return (
    <div>
      <Header />
      <p>trending 🔥</p>
      {trending}
      {allCryptos}
    </div>
  );
}
