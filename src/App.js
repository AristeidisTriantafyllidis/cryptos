import "./App.css";
import React from "react";
import {
  fetchData,
  fetchTrendingCryptos,
  fetchSpecificCrypto,
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
    return function () {
      SetId(null);
      setSpecificCoin(null);
    };
  }, [id]);

  const findId = (id) => {
    SetId(id);
  };

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <MainPage
                coins={coins}
                trendingCoins={trendingCoins?.coins}
                findId={findId}
              />
            }
          />
          <Route
            path="/DetailPage"
            element={<DetailPage specificCoin={specificCoin} />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
