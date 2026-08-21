import React, { useEffect, useRef } from "react";
import { createChart, AreaSeries } from "lightweight-charts";

export const LineGraph = ({ priceArray }) => {
  const chartContainerRef = useRef(null);

  useEffect(() => {
    if (!chartContainerRef.current || !priceArray?.length) return;

    const chart = createChart(chartContainerRef.current, {
      width: 600,
      height: 400,

      layout: {
        background: {
          color: "transparent",
        },
      },

      grid: {
        vertLines: {
          visible: false,
        },

        horzLines: {
          visible: false,
        },
      },

      leftPriceScale: {
        visible: true,
      },

      rightPriceScale: {
        visible: false,
      },

      timeScale: {
        visible: true,

        tickMarkFormatter: () => "",
      },

      handleScroll: false,
      handleScale: false,
    });

    const areaSeries = chart.addSeries(AreaSeries, {
      priceScaleId: "left",
    });

    const startDate = new Date();
    startDate.setHours(0, 0, 0, 0);
    startDate.setDate(startDate.getDate() - 6);

    const endDate = new Date();
    endDate.setHours(23, 59, 59, 999);

    const totalPoints = priceArray.length;

    const formattedData = priceArray.map((price, index) => {
      const progress = totalPoints === 1 ? 0 : index / (totalPoints - 1);

      const timestamp =
        startDate.getTime() +
        progress * (endDate.getTime() - startDate.getTime());

      return {
        time: Math.floor(timestamp / 1000),
        value: price,
      };
    });

    areaSeries.setData(formattedData);

    chart.timeScale().fitContent();

    return () => {
      chart.remove();
    };
  }, [priceArray]);

  const dates = [];

  for (let i = 0; i < 7; i++) {
    const date = new Date();

    date.setHours(0, 0, 0, 0);
    date.setDate(date.getDate() - (6 - i));

    dates.push({
      key: date.toISOString(),
      label: `${date.getDate()}/${date.getMonth() + 1}`,
    });
  }

  return (
    <div style={{ width: "600px" }}>
      <div
        ref={chartContainerRef}
        style={{
          width: "600px",
          height: "400px",
        }}
      />

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",

          width: "500px",
          marginLeft: "80px",

          paddingTop: "6px",

          fontSize: "11px",
        }}
      >
        {dates.map((date) => (
          <span key={date.key}>{date.label}</span>
        ))}
      </div>
    </div>
  );
};

export const LineGraphForDetailPage = ({ priceArray, days }) => {
  const chartContainerRef = useRef(null);

  useEffect(() => {
    if (!chartContainerRef.current || !priceArray?.length || !days) {
      return;
    }

    const chart = createChart(chartContainerRef.current, {
      width: 600,
      height: 400,

      grid: {
        vertLines: {
          visible: false,
        },
        horzLines: {
          visible: false,
        },
      },

      leftPriceScale: {
        visible: true,
      },

      rightPriceScale: {
        visible: false,
      },

      timeScale: {
        visible: true,

        tickMarkFormatter: (time) => {
          const date = new Date(time * 1000);

          if (days === 1) {
            return date.toLocaleTimeString("en-GB", {
              hour: "2-digit",
              minute: "2-digit",
            });
          }

          if (days === 7) {
            return `${date.getDate()}/${date.getMonth() + 1}`;
          }

          if (days === 30) {
            return `${date.getDate()}/${date.getMonth() + 1}`;
          }

          if (days === 365) {
            return `${date.getMonth() + 1}/${date.getFullYear()}`;
          }

          return "";
        },

        fixLeftEdge: true,
        fixRightEdge: true,
      },

      handleScroll: false,
      handleScale: false,
    });

    const areaSeries = chart.addSeries(AreaSeries, {
      priceScaleId: "left",
    });

    const now = Date.now();

    const periodMilliseconds = days * 24 * 60 * 60 * 1000;

    const totalPoints = priceArray.length;

    const formattedData = priceArray.map((price, index) => {
      const timestamp =
        now -
        periodMilliseconds +
        (index / (totalPoints - 1)) * periodMilliseconds;

      return {
        time: Math.floor(timestamp / 1000),
        value: price,
      };
    });

    areaSeries.setData(formattedData);

    chart.timeScale().fitContent();

    return () => {
      chart.remove();
    };
  }, [priceArray, days]);

  return <div ref={chartContainerRef} />;
};
