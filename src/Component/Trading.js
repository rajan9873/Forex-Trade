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
  useEffect(() => {
    if (currentCurrency) {
      const aquiredAmountData = userData.AquiredCurrency.filter((obj) => {
        return obj.currencyCode === currentCurrency.currencyCode;
      });

      if (aquiredAmount.length > 0) {
        const amount = aquiredAmountData[0].amount;
        setAquiredAmount(amount);
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

  if (tradingLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="trading-main flex justify-around">
        <div className="trading-section-a">
          <div className="currency-details">
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
                    ? "buy bg-red cursor-pointer"
                    : "buy cursor-pointer"
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
                    ? "sell cursor-pointer"
                    : "sell bg-red cursor-pointer"
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
        </div>
      </div>
    </>
  );
};

export default Trading;
