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
      maximumFractionDigits: 1,
    }).format(price));
  };
  const formatNumber = (number) => {
    return (number = new Intl.NumberFormat("en-us", {
      notation: "compact",
      compactDisplay: "short",
    }).format(number));
  };
  const marketCap = coin?.market_data.market_cap.usd;
  const formatMarketCap = formatCryptoPrice(marketCap);
  const dailyVolume = coin?.market_data.total_volume.usd;
  const formatDailyVolume = formatCryptoPrice(dailyVolume);
  const circulatingSupply = coin?.market_data.circulating_supply;
  const formatCirculatingSupply = formatNumber(circulatingSupply);
  const allTimeHigh = coin?.market_data.ath.usd;
  const formatAllTimeHigh = formatCryptoPrice(allTimeHigh);
  const allTimeLow = coin?.market_data.atl.usd;
  const formatAllTimeLow = formatCryptoPrice(allTimeLow);

  return (
    <div>
      <Header />
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
        <p> {coin?.market_data.current_price.usd}</p>
        <p>{percentageText}% (24h)</p>
        <div>
          <h2>Market Stats</h2>
          <p>Market Cap {formatMarketCap} </p>
          <p>24h Volume {formatDailyVolume}</p>
          <p>
            Circulating Supply {formatCirculatingSupply} {coin?.symbol}
          </p>
          <p>
            All time High {formatAllTimeHigh}{" "}
            {coin?.market_data.ath_date.usd}{" "}
          </p>
          <p>
            All time Low {formatAllTimeLow} {coin?.market_data.atl_date.usd}
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
