import "./App.css";
import React from "react";
import {
  fetchData,
  fetchTrendingCryptos,
  fetchSpecificCrypto,
  fetchDataForCHart,
  fetchEveryCoin,
} from "./servises/api";
import { useState, useEffect } from "react";
import MainPage from "./pages/MainPage";
import DetailPage from "./pages/DetailPage";
import Watchlist from "./pages/Watchlist";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

function App() {
  const [coins, setCoins] = useState(null);
  const [error, setError] = useState(false);
  const [trendingCoins, setTrendingCoins] = useState(null);
  const [specificCoin, setSpecificCoin] = useState(null);
  const [id, SetId] = useState(null);
  const [chartData, setChartData] = useState(null);
  const [daysForChart, setDaysForChart] = useState(1);
  const [backgroundColor, setBackgroundColor] = useState(() => {
    return localStorage.getItem("backgroundColor") || "white";
  });
  const [allCoins, setAllCoins] = useState(null);
  const [watchlistData, setWatchlistData] = useState([]);

  useEffect(() => {
    async function getData() {
      try {
        const result = await fetchData();
        setCoins(result);
      } catch (error) {
        setError(!error);
      }
    }
    async function getTrendingCryptos() {
      try {
        const result = await fetchTrendingCryptos();
        setTrendingCoins(result);
      } catch (error) {
        setError(!error);
      }
    }
    async function getAllCoins() {
      try {
        const result = await fetchEveryCoin();
        setAllCoins(result);
      } catch (error) {
        setError(!error);
      }
    }

    getTrendingCryptos();
    getData();
    getAllCoins();
  }, []);

  useEffect(() => {
    if (id !== null) {
      async function getSpecificCrypto(id) {
        try {
          const result = await fetchSpecificCrypto(id);
          setSpecificCoin(result);
        } catch (error) {
          setError(!error);
        }
      }

      getSpecificCrypto(id);
    }
  }, [id]);

  useEffect(() => {
    if (id !== null) {
      async function getDataforChart(id, days) {
        try {
          const result = await fetchDataForCHart(id, days);
          setChartData(result);
        } catch (error) {
          setError(!error);
        }
      }

      getDataforChart(id, daysForChart);
    }
  }, [id, daysForChart]);

  useEffect(() => {
    localStorage.setItem("backgroundColor", backgroundColor);
  }, [backgroundColor]);

  const findId = (id) => {
    SetId(id);
  };

  let background = {};
  if (backgroundColor === "white") {
    background = {
      backgroundColor: "white",
      color: "black",
    };
  } else {
    background = {
      backgroundColor: "black",
      color: "white",
    };
  }
  const handleAddtoWatchlist = (crypto) => {
    for (const item of watchlistData) {
      if (item.id === crypto.id) {
        alert("This coin already exists in your Watchlist!");
        return;
      }
    }
    setWatchlistData((prev) => [...prev, crypto]);
  };

  return (
    <div className="App" style={background}>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <MainPage
                coins={coins}
                trendingCoins={trendingCoins?.coins}
                allCoins={allCoins}
                findId={findId}
                backgroundColor={backgroundColor}
                setBackgroundColor={setBackgroundColor}
              />
            }
          />
          <Route
            path="/DetailPage"
            element={
              <DetailPage
                specificCoin={specificCoin}
                backgroundColor={backgroundColor}
                setBackgroundColor={setBackgroundColor}
                chartData={chartData}
                daysForChart={daysForChart}
                setDaysForChart={setDaysForChart}
                watchlistData={watchlistData}
                setWatchlistData={setWatchlistData}
                handleAddtoWatchlist={handleAddtoWatchlist}
                allCoins={allCoins}
                findId={findId}
              />
            }
          />
          <Route
            path="/Watchlist"
            element={
              <Watchlist
                watchlistData={watchlistData}
                findId={findId}
                allCoins={allCoins}
                backgroundColor={backgroundColor}
                setBackgroundColor={setBackgroundColor}
              />
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
