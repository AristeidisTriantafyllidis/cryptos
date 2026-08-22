import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import { LineGraphForDetailPage } from "../chrart/Chart";

export default function DetailPage(props) {
  const [coin, setCoin] = useState(null);
  const [chartData, setChartData] = useState([]);
  const [allCryptos, setAllCryptos] = useState([]);
  const [searchCrypto, setSearchCrypto] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (props.specificCoin) {
      setCoin(props.specificCoin);
    }
    if (props.chartData?.prices) {
      setChartData(props.chartData.prices.map((item) => item[1]));
    }
    if (props.allCoins) {
      setAllCryptos(props.allCoins);
    }
  }, [props.specificCoin, props.chartData, props.allCoins]);

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
    return new Intl.NumberFormat("en-US", {
      maximumFractionDigits: 7,
    }).format(number);
  };

  const marketCap = formatCryptoPrice(coin?.market_data.market_cap?.usd);
  const dailyVolume = formatCryptoPrice(coin?.market_data.total_volume?.usd);
  const circulatingSupply = formatNumber(coin?.market_data?.circulating_supply);
  const allTimeHigh = formatCryptoPrice(coin?.market_data?.ath?.usd);
  const allTimeLow = formatCryptoPrice(coin?.market_data?.atl?.usd);
  const dateAth = coin?.market_data?.ath_date?.usd?.split("T");
  const formatDateAth = dateAth
    ? dateAth[0]?.split("-").reverse().join("-")
    : "";
  const dateAtl = coin?.market_data?.atl_date?.usd?.split("T");
  const formatDateAtl = dateAtl
    ? dateAtl[0]?.split("-").reverse().join("-")
    : "";
  const accuratePrice = formatPrice(coin?.market_data?.current_price?.usd);
  const filteredCryptos = allCryptos.filter((crypto) =>
    crypto.name.toLowerCase().startsWith(searchCrypto.toLowerCase()),
  );
  const handleClick = (crypto) => {
    props.findId(crypto.id || crypto.coin_id || crypto.item?.id);
    setSearchCrypto("");
  };

  let searchPage;

  if (searchCrypto !== "") {
    if (filteredCryptos.length > 0) {
      searchPage = filteredCryptos.map((crypto) => {
        return (
          <div
            key={crypto.id || crypto.name}
            onClick={() => handleClick(crypto)}
          >
            <p>{crypto.name}</p>
          </div>
        );
      });
    } else {
      searchPage = (
        <div className="empty-state">
          <p>No crypto found</p>
        </div>
      );
    }
  }

  return (
    <div>
      <Header
        backgroundColor={props.backgroundColor}
        setBackgroundColor={props.setBackgroundColor}
        searchCrypto={searchCrypto}
        setSearchCrypto={setSearchCrypto}
      />

      {searchCrypto !== "" ? (
        <div>{searchPage}</div>
      ) : (
        <>
          <div>
            <button onClick={() => navigate("/")}>Go back</button>
          </div>
          <div style={{ marginTop: "50px" }}>
            <button
              onClick={() => {
                if (coin) {
                  props.handleAddtoWatchlist({
                    id: coin.id,
                    name: coin.name,
                    image: coin.image?.small,
                    price: coin.market_data?.current_price?.usd,
                    percentage24h:
                      coin.market_data?.market_cap_change_percentage_24h,
                  });
                }
              }}
            >
              Add this coin to watchlist
            </button>
          </div>
          <div>
            <p>
              <img src={coin?.image.small} alt={coin?.name} />
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
                All time High : {allTimeHigh} AT {formatDateAth}
              </p>
              <p>
                All time Low : {allTimeLow} AT : {formatDateAtl}
              </p>
            </div>
          </div>
          <div>
            <div>
              <LineGraphForDetailPage
                priceArray={chartData}
                days={props.daysForChart}
              />
            </div>
            <button onClick={() => props.setDaysForChart(1)}>1d</button>
            <button onClick={() => props.setDaysForChart(7)}>7d</button>
            <button onClick={() => props.setDaysForChart(30)}>30d</button>
            <button onClick={() => props.setDaysForChart(365)}>1Y</button>
          </div>
          <div>
            <h2> About {coin?.name}</h2>
            <p>
              {coin?.description?.en
                ? coin.description.en
                : "No information about this coin"}
            </p>
          </div>
        </>
      )}
    </div>
  );
}
