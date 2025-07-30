import React, { useEffect } from "react";
import ApexCharts from "apexcharts";

const ColumnChart = ({ options }) => {
  useEffect(() => {
    const chart = new ApexCharts(document.querySelector("#chart"), options);
    chart.render();

    return () => {
      chart.destroy();
    };
  }, [options]);

  return <div id="chart" style={{ width: "100%", height: "400px" }}></div>;
};

export default ColumnChart;
