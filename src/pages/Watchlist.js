import React, { useEffect, useState } from "react";
import Header from "./Header";
import { useNavigate } from "react-router-dom";

export default function Watchlist(props) {
  const [allCryptos, setAllCryptos] = useState([]);
  const [searchCrypto, setSearchCrypto] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (props.allCoins) {
      setAllCryptos(props.allCoins);
    }
  }, [props.coins, props.trendingCoins, props.allCoins]);

  const handleClick = (crypto) => {
    props.findId(crypto.id || crypto.coin_id || crypto.item?.id);
    navigate("/DetailPage");
  };

  const filteredCryptos = allCryptos.filter((crypto) =>
    crypto.name.toLowerCase().startsWith(searchCrypto.toLowerCase()),
  );

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
  let watchlistPage = props?.watchlistData.map((crypto) => {
    return (
      <div key={crypto.id} onClick={() => handleClick(crypto)}>
        <p>{crypto?.name}</p>
        <img src={crypto.image} />
        <p>Current price {crypto.price}</p>
        <p> Daily percentagee:{crypto.percentage24h} %</p>
      </div>
    );
  });

  return (
    <div>
      <Header
        searchCrypto={searchCrypto}
        setSearchCrypto={setSearchCrypto}
        setBackgroundColor={props.setBackgroundColor}
      />
      {searchCrypto !== "" ? searchPage : watchlistPage}
    </div>
  );
}
