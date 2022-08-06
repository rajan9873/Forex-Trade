import React, { useState, useEffect } from "react";
import CanvasJSReact from "../canvasjs.react";
const CanvasJS = CanvasJSReact.CanvasJS;
const CanvasJSChart = CanvasJSReact.CanvasJSChart;

const Graph = ({ currentCurrency }) => {
  const [historicalData, setHistoricalData] = useState([]);
  const [graphData, setGraphData] = useState([]);
  const [graphLoading, setGraphLoading] = useState(true);

  const settingCurrentDate = () => {
    // setting current date
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth();
    const day = today.getDate();

    const monthLength = month.toString().length;
    const dayLength = day.toString().length;

    // adding zero in front of month and date if they are both single digit
    if ((monthLength == 1) & (dayLength == 1)) {
      const date = `${year}-0${month}-0${day}`;
      return date;
    }

    if ((monthLength > 1) & (dayLength == 1)) {
      const date = `${year}-${month}-0${day}`;
      return date;
    }

    if ((monthLength == 1) & (dayLength > 1)) {
      const date = `${year}-0${month}-${day}`;
      return date;
    }
  };

  const fetchingHistoricalData = async (date) => {
    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Host": "currencyscoop.p.rapidapi.com",
        "X-RapidAPI-Key": "bf300f87abmsh24011b6bb15af02p18b479jsn2542ba30b834",
      },
    };

    const historicalDataFetching = async () => {
      const response = await fetch(
        `https://currencyscoop.p.rapidapi.com/historical?date=${date}&base=INR`,
        options
      );

      const data = await response.json();
      const historicalObj = await data.response;
      return historicalObj;
    };

    const currentDateData = await historicalDataFetching();
    const historicalData = JSON.parse(localStorage.getItem("historicalData"));
    // merging currentdateData and historical data
    const newData = historicalData.concat(currentDateData);
    setHistoricalData(newData);
  };

  const settingGraphData = () => {
    //converting the rate object in historical data array into an array
    const convertedData = historicalData.map((item) => {
      const { date, rates } = item;
      return { date, rates: Object.entries(rates) };
    });
    // creating an array in which there is only current currency rate
    const filteredCurrentCurrencyArray = convertedData.map((item) => {
      const { date, rates } = item;
      const filteredItem = rates.filter((obj) => {
        return obj[0] == currentCurrency;
      });
      return { date, rate: filteredItem };
    });
    // modifing data so it become usable to use in graph datapoints
    const modifiedData = filteredCurrentCurrencyArray.map((item, index) => {
      const { date, rate } = item;
      const year = date.split("-")[0];
      const month = date.split("-")[1];
      const day = date.split("-")[2];
      const value = 1 / rate[0][1];
      return { x: new Date(year, 1 - month, day), y: value };
    });
    setGraphData(modifiedData);
  };

  useEffect(() => {
    const date = settingCurrentDate();
    fetchingHistoricalData(date);
  }, []);

  useEffect(() => {
    if (historicalData.length > 0) {
      settingGraphData();
      setGraphLoading(false);
    }
  }, [currentCurrency, historicalData]);

  useEffect(() => {
    console.log(graphData);
  }, [graphData]);

  const options = {
    theme: "light2", // "light1", "dark1", "dark2"
    backgroundColor: null,
    axisY: {
      valueFormatString: " ",
      yValueFormatString: "₹####.00",
      includeZero: false,
      gridThickness: 0,
      tickLength: 0,
    },
    axisX: {
      valueFormatString: " ",
      tickLength: 0,
      crosshair: {
        enabled: true,
        lineDashType: "solid",
        thickness: 2,
      },
    },
    toolTip: {
      enabled: true,
      content:
        "<span style='\"'color: black;'\"'>{x}</span>: <span style='\"'color: #21CE99;'\"'>{y}</span>",
    },
    data: [
      {
        type: "spline",
        markerType: "none",
        lineColor: "#21CE99",
        yValueFormatString: "₹####.00",
        dataPoints: graphData,
      },
    ],
  };

  if (graphLoading) {
    return <div className="graph-skeleton"></div>;
  }

  return (
    <>
      <CanvasJSChart
        className="graph"
        options={options}
        /* onRef={ref => this.chart = ref} */
      />
    </>
  );
};
export default Graph;
