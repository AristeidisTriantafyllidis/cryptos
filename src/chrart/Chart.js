import React, { useEffect, useRef } from "react";
import { createChart, AreaSeries } from "lightweight-charts";

export const LineGraph = ({ priceArray }) => {
  const chartContainerRef = useRef(null);

  useEffect(() => {
    const chart = createChart(chartContainerRef.current, {
      width: 600,
      height: 400,
    });

    const areaSeries = chart.addSeries(AreaSeries);

    const formattedData = priceArray.map((price, index) => ({
      time: index,
      value: price,
    }));

    areaSeries.setData(formattedData);

    return () => {
      chart.remove();
    };
  }, [priceArray]);

  return <div ref={chartContainerRef} />;
};
