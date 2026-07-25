import "./App.css";
import React from "react";
import {
  fetchData,
  fetchTrendingCryptos,
  fetchSpecificCrypto,
  fetchDataForCHart,
} from "./servises/api";
import { useState, useEffect } from "react";
import MainPage from "./pages/MainPage";
import DetailPage from "./pages/DetailPage";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

function App() {
  const [coins, setCoins] = useState(null);
  const [error, setError] = useState(false);
  const [trendingCoins, setTrendingCoins] = useState(null);
  const [specificCoin, setSpecificCoin] = useState(null);
  const [id, SetId] = useState(null);
  const [backgroundColor, setBackgroundColor] = useState("white");
  const [chartData, setChartData] = useState(null);
  const [daysForChart, setDaysForChart] = useState(1);
  useEffect(() => {
    async function getData() {
      try {
        const result = await fetchData();
        setCoins(result);
      } catch (error) {
        setError(!error);
      }
    }

    getData();
  }, []);

  useEffect(() => {
    async function getTrendingCryptos() {
      try {
        const result = await fetchTrendingCryptos();
        setTrendingCoins(result);
      } catch (error) {
        setError(!error);
      }
    }

    getTrendingCryptos();
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
  console.log(daysForChart);
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
              />
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
