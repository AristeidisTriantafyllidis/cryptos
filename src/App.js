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
import MainPage from "./appPages/MainPage";
import DetailPage from "./appPages/DetailPage";
import Watchlist from "./appPages/Watchlist";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import SkeletonPlaceholder from "./pages/skeletons/SkeletonMain";
import DetailSkeletonPlaceholder from "./pages/skeletons/SkeletonDetail";
import "react-loading-skeleton/dist/skeleton.css";

function App() {
  const [coins, setCoins] = useState(null);
  const [loading, setLoading] = useState(true);
  const [detailLoading, setDetailLoading] = useState(true);
  const [, setError] = useState();
  const [trendingCoins, setTrendingCoins] = useState(null);
  const [specificCoin, setSpecificCoin] = useState(null);
  const [id, SetId] = useState(null);
  const [chartData, setChartData] = useState(null);
  const [daysForChart, setDaysForChart] = useState(1);
  const [backgroundColor, setBackgroundColor] = useState(() => {
    return localStorage.getItem("backgroundColor") || "white";
  });
  const [allCoins, setAllCoins] = useState(null);
  const [watchlistData, setWatchlistData] = useState(() => {
    const savedWatchlist = localStorage.getItem("cryptoWatchlist");
    return savedWatchlist ? JSON.parse(savedWatchlist) : [];
  });
  const [detailError, setDetailError] = useState(null);
  const [chartError, setChartError] = useState(null);

  useEffect(() => {
    async function getData() {
      try {
        const [coins, trending, allCoins] = await Promise.all([
          fetchData(),
          fetchTrendingCryptos(),
          fetchEveryCoin(),
        ]);

        setCoins(coins);
        setTrendingCoins(trending);
        setAllCoins(allCoins);
      } catch (error) {
        setError(() => {
          throw error;
        });
      } finally {
        setLoading(false);
      }
    }

    getData();
  }, []);

  useEffect(() => {
    if (id !== null) {
      async function getSpecificCrypto() {
        setDetailLoading(true);
        setSpecificCoin(null);
        setChartData(null);
        setDetailError(null);

        try {
          const result = await fetchSpecificCrypto(id);
          setSpecificCoin(result);
        } catch (error) {
          if (error.message.includes("429")) {
            setDetailError("Too many requests. Please try again in a moment.");
          } else {
            setError(() => {
              throw error;
            });
          }
        } finally {
          setDetailLoading(false);
        }
      }

      getSpecificCrypto();
    }
  }, [id]);

  useEffect(() => {
    if (id !== null) {
      setChartData(null);
      setChartError(null);

      async function getChartData() {
        try {
          const result = await fetchDataForCHart(id, daysForChart);
          setChartData(result);
        } catch (error) {
          if (error.message.includes("429")) {
            setChartError("Too many requests. Please try again in a moment.");
          } else {
            setError(() => {
              throw error;
            });
          }
        }
      }

      getChartData();
    }
  }, [id, daysForChart]);

  useEffect(() => {
    localStorage.setItem("backgroundColor", backgroundColor);
  }, [backgroundColor]);

  useEffect(() => {
    localStorage.setItem("cryptoWatchlist", JSON.stringify(watchlistData));
  }, [watchlistData]);

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
              loading ? (
                <SkeletonPlaceholder />
              ) : (
                <MainPage
                  coins={coins}
                  trendingCoins={trendingCoins?.coins}
                  allCoins={allCoins}
                  findId={findId}
                  backgroundColor={backgroundColor}
                  setBackgroundColor={setBackgroundColor}
                />
              )
            }
          />
          <Route
            path="/DetailPage/:id"
            element={
              detailLoading ? (
                <DetailSkeletonPlaceholder />
              ) : (
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
                  chartError={chartError}
                  detailError={detailError}
                />
              )
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
                setWatchlistData={setWatchlistData}
              />
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
