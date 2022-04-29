import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useGlobalContext } from "../Context";
import BuySection from "./BuySection";
import SellSection from "./SellSection";

const Trading = () => {
  const { id } = useParams();
  const { currencyData, Loading, userData, setUserData } = useGlobalContext();

  const [buySection, setBuySection] = useState(true);
  const [currentCurrency, setCurrentCurrency] = useState();
  const [tradingLoading, setTradingLoading] = useState(true);
  const [aquiredAmount, setAquiredAmount] = useState(0);
  const [aquiredCurrencies, setAquiredCurrencies] = useState([]);
  const [inWatchlist, setInWatchlist] = useState(false);

  useEffect(() => {
    if (currentCurrency) {
      const aquiredAmountData = userData.AquiredCurrency.filter((obj) => {
        return obj.currencyCode === currentCurrency.currencyCode;
      });

      if (aquiredAmountData.length > 0) {
        setAquiredAmount(aquiredAmountData[0].amount);
      } else {
        setAquiredAmount(0);
      }

      const aquiredCurrenciesData = userData.AquiredCurrency.filter((obj) => {
        return obj.currencyCode !== currentCurrency.currencyCode;
      });

      if (aquiredCurrenciesData.length > 0)
        setAquiredCurrencies(aquiredCurrenciesData);
      else setAquiredAmount([]);
    }
  }, [userData, currentCurrency]);

  useEffect(() => {
    if (!Loading) {
      const currentCurrencyData = currencyData.filter((obj) => {
        return obj.currencyCode === id;
      });
      setCurrentCurrency(currentCurrencyData[0]);
      setTradingLoading(false);
    }
  }, [Loading]);

  useEffect(() => {
    if (currentCurrency) {
      const checkWatchlist = userData.Watchlist.filter((obj) => {
        return obj.currencyCode === currentCurrency.currencyCode;
      });

      if (checkWatchlist.length > 0) setInWatchlist(true);
    }
  }, [currentCurrency]);

  const handleWatch = () => {
    if (!inWatchlist) {
      setUserData((prevState) => ({
        ...prevState,
        Watchlist: [...prevState.Watchlist, currentCurrency],
      }));
      setInWatchlist(true);
    }
    if (inWatchlist) {
      // deleting current currency from watchlist
      const newWatchlist = userData.Watchlist.filter((obj) => {
        return obj.currencyCode !== currentCurrency.currencyCode;
      });
      setUserData((prevState) => ({
        ...prevState,
        Watchlist: newWatchlist,
      }));
      setInWatchlist(false);
    }
  };

  if (tradingLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="trading-main flex justify-between">
        <div className="trading-section-a">
          <div className="currency-details">
            <h1>{currentCurrency.currencyName}</h1>
            <h1>₹{currentCurrency.rate.toFixed(2)}</h1>
          </div>
          <div className="graph"></div>
        </div>
        <div className="trading-section-b">
          <div className="trading-card">
            <div className="trading-card-header flex justify-around">
              <div
                onClick={() => {
                  setBuySection(true);
                }}
                className={
                  buySection
                    ? "buy bg-grey border-bottom cursor-pointer"
                    : "buy bg-grey  cursor-pointer"
                }
              >
                Buy
              </div>
              <div
                onClick={() => {
                  setBuySection(false);
                }}
                className={
                  buySection
                    ? "sell bg-grey cursor-pointer"
                    : "sell bg-grey border-bottom  cursor-pointer"
                }
              >
                Sell
              </div>
            </div>
            {buySection ? (
              <BuySection
                currentCurrency={currentCurrency}
                aquiredAmount={aquiredAmount}
                aquiredCurrencies={aquiredCurrencies}
              />
            ) : (
              <SellSection
                currentCurrency={currentCurrency}
                aquiredAmount={aquiredAmount}
                aquiredCurrencies={aquiredCurrencies}
              />
            )}
          </div>
          <div className="watch-btn-container flex justify-center">
            <button onClick={handleWatch} className="watch-btn cursor-pointer">
              {inWatchlist ? "Un-Watch" : "Watch"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Trading;
