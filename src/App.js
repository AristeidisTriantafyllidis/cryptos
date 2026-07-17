import "./App.css";
import React from "react";
import { fetchData, fetchTrendingCryptos } from "./servises/api";
import { useState, useEffect } from "react";
import MainPage from "./pages/MainPage";
function App() {
  const [coins, setCoins] = useState(null);
  const [error, setError] = useState(false);
  const [trendingCoins, setTrendingCoins] = useState(null);

  useEffect(() => {
    async function getData() {
      try {
        const result = await fetchData();
        setCoins(result);
      } catch {
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
      } catch {
        setError(!error);
      }
    }

    getTrendingCryptos();
  }, []);

  return (
    <div className="App">
      <MainPage coins={coins} trendingCoins={trendingCoins?.coins} />
    </div>
  );
}

export default App;
