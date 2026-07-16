import "./App.css";
import React from "react";
import fetchData from "./servises/api";
import { useState, useEffect } from "react";
import MainPage from "./pages/MainPage";
function App() {
  const [coins, setCoins] = useState(null);
  const [error, setError] = useState(false);

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
  console.log(coins);

  return (
    <div className="App">
      <MainPage coins={coins} />
    </div>
  );
}

export default App;
