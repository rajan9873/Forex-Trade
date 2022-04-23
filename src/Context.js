import React, { useState, useContext, useEffect } from "react";

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [currencyData, setCurrencyData] = useState([]);
  const [Loading, setLoading] = useState(true);
  const [userData, setUserData] = useState(
    JSON.parse(localStorage.getItem("user"))
  );

  useEffect(() => {
    console.log(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  }, [userData]);

  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Host": "currencyscoop.p.rapidapi.com",
      "X-RapidAPI-Key": "bf300f87abmsh24011b6bb15af02p18b479jsn2542ba30b834",
    },
  };

  const optionForList = {
    method: "GET",
    headers: {
      "X-RapidAPI-Host": "currencyscoop.p.rapidapi.com",
      "X-RapidAPI-Key": "bf300f87abmsh24011b6bb15af02p18b479jsn2542ba30b834",
    },
  };

  useEffect(async () => {
    const fetchingLatestCurrencyRate = async () => {
      const response = await fetch(
        "https://currencyscoop.p.rapidapi.com/latest?base=INR",
        options
      );
      const data = await response.json();
      const rates = await data.response.rates;
      return rates;
    };

    const fectchingCurrencyCode = async () => {
      const response = await fetch(
        "https://currencyscoop.p.rapidapi.com/currencies",
        options
      );
      const data = await response.json();
      const currencyList = await data.response.fiats;
      return currencyList;
    };

    const joiningBothArray = () => {
      const currencyListArray = Object.values(currencyList);
      const ratesArray = Object.entries(rates);

      let i = 0;
      for (i; i < ratesArray.length; i++) {
        const newArray = currencyListArray.filter((obj) => {
          return obj.currency_code === ratesArray[i][0];
        });
        if (newArray.length > 0) {
          const { currency_name, currency_code, countries } = newArray[0];
          setCurrencyData((prev) =>
            prev.concat({
              currencyName: currency_name,
              currencyCode: currency_code,
              countryName: countries,
              rate: 1 / ratesArray[i][1],
            })
          );
        }
      }
    };

    const rates = await fetchingLatestCurrencyRate();
    const currencyList = await fectchingCurrencyCode();
    joiningBothArray();
    setLoading(false);
  }, []);

  return (
    <AppContext.Provider
      value={{
        currencyData,
        Loading,
        userData,
        setUserData,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
