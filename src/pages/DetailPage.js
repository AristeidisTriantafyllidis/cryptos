import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
export default function DetailPage(props) {
  const [coin, setCoin] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (props.specificCoin) {
      setCoin(props.specificCoin);
    }
  }, [props.specificCoin]);

  const pricePercentageDaily =
    coin?.market_data.market_cap_change_percentage_24h;

  let percentageText = "";
  if (pricePercentageDaily > 0) {
    percentageText = "+" + pricePercentageDaily?.toFixed(2);
  } else {
    percentageText = pricePercentageDaily?.toFixed(2);
  }
  const formatCryptoPrice = (price) => {
    return (price = new Intl.NumberFormat("en-us", {
      style: "currency",
      currency: "USD",
      notation: "compact",
      compactDisplay: "short",
      maximumFractionDigits: 2,
    }).format(price));
  };
  const formatNumber = (number) => {
    return (number = new Intl.NumberFormat("en-us", {
      notation: "compact",
      compactDisplay: "short",
    }).format(number));
  };
  const formatPrice = (number) => {
    return new Intl.NumberFormat("en-US").format(number);
  };

  const marketCap = formatCryptoPrice(coin?.market_data.market_cap.usd);
  const dailyVolume = formatCryptoPrice(coin?.market_data.total_volume.usd);
  const circulatingSupply = formatNumber(coin?.market_data.circulating_supply);
  const allTimeHigh = formatCryptoPrice(coin?.market_data.ath.usd);
  const allTimeLow = formatCryptoPrice(coin?.market_data.atl.usd);
  const dateAth = coin?.market_data.ath_date.usd.split("T");
  const formatDateAth = dateAth
    ? dateAth[0]?.split("-").reverse().join("-")
    : "";
  const dateAtl = coin?.market_data.atl_date.usd.split("T");
  const formatDateAtl = dateAtl
    ? dateAtl[0]?.split("-").reverse().join("-")
    : "";
  const accuratePrice = formatPrice(coin?.market_data.current_price.usd);
  return (
    <div>
      <Header
        backgroundColor={props.backgroundColor}
        setBackgroundColor={props.setBackgroundColor}
      />
      <div>
        <button onClick={() => navigate("/")}>Go back</button>
      </div>
      <div>
        <p>
          <img src={coin?.image.small} />
        </p>
        <p>{coin?.name}</p>
        <p>{coin?.symbol}</p>
        <p>Rank #{coin?.market_cap_rank} </p>
        <p> {accuratePrice} $</p>
        <p>{percentageText}% (24h)</p>
        <div>
          <h2>Market Stats</h2>
          <p>Market Cap {marketCap} </p>
          <p>24h Volume {dailyVolume}</p>
          <p>
            Circulating Supply {circulatingSupply} {coin?.symbol}
          </p>
          <p>
            All time High : {allTimeHigh} AT ({formatDateAth})
          </p>
          <p>
            All time Low : {allTimeLow} AT : ({formatDateAtl})
          </p>
        </div>
      </div>
      <div>
        <h2> About {coin?.name}</h2>
        <p>{coin?.description.en}</p>
      </div>
    </div>
  );
}
