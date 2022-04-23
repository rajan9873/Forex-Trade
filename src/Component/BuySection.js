import React, { useEffect, useState } from "react";
import { useGlobalContext } from "../Context";
import CurrencyConvert from "../CurrencyConveter";

const BuySection = ({ currentCurrency, aquiredAmount, aquiredCurrencies }) => {
  const { userData, setUserData } = useGlobalContext();

  const [secondaryCurrency, setSecondaryCurrency] = useState("INR");
  const [secondaryCurrencyAmount, setSecondaryCurrencyAmount] = useState(0);
  const [secondaryCurrencyRate, setSecondaryCurrencyRate] = useState(0);
  const [marketPrice, setMarketPrice] = useState(currentCurrency.rate);
  const [estimatedPrice, setEstimatedPrice] = useState(0);
  const [amount, setAmount] = useState(0);

  useEffect(() => {
    const aquiredCurrency = userData.AquiredCurrency;

    const currentSecondaryCurrency = aquiredCurrency.filter((obj) => {
      return obj.currencyCode === secondaryCurrency;
    });

    const secondaryAmount = currentSecondaryCurrency[0].amount;
    setSecondaryCurrencyAmount(secondaryAmount);

    const secondaryRate = currentSecondaryCurrency[0].rate;
    setSecondaryCurrencyRate(secondaryRate);

    // setting market price

    const result = CurrencyConvert(1, currentCurrency.rate, secondaryRate);
    setMarketPrice(result);
  }, [secondaryCurrency, userData]);

  useEffect(() => {
    const estimatingPrice = () => {
      const result = CurrencyConvert(
        amount,
        currentCurrency.rate,
        secondaryCurrencyRate
      );
      if (amount > 0 && Number) setEstimatedPrice(result);
      else setEstimatedPrice(0);
    };
    estimatingPrice();
  }, [amount, secondaryCurrencyRate]);

  const purchase = () => {
    if (secondaryCurrencyAmount > estimatedPrice && amount > 0) {
      // checking if aquired currency have our current currency in array or not

      const checkCurrentCurrency = userData.AquiredCurrency.filter((obj) => {
        return obj.currencyCode === currentCurrency.currencyCode;
      });

      // if we have current currency in aquired currency array already

      if (checkCurrentCurrency.length > 0) {
        // adding amount in current currency

        const addingAmountInArray = userData.AquiredCurrency.map((obj) => {
          return obj.currencyCode === currentCurrency.currencyCode
            ? { ...obj, amount: obj.amount + amount }
            : { ...obj };
        });

        // subrating purchased amount from currency that we have purchased from

        const subtractingAmountFromArray = addingAmountInArray.map((obj) => {
          return obj.currencyCode === secondaryCurrency
            ? { ...obj, amount: obj.amount - estimatedPrice }
            : { ...obj };
        });

        setUserData((prevState) => ({
          ...prevState,
          AquiredCurrency: subtractingAmountFromArray,
        }));
      }

      // if we do not have current currency in aquired currency we will add it in array on purchasing

      if (checkCurrentCurrency.length == 0) {
        const subtractingAmountFromArray = userData.AquiredCurrency.map(
          (obj) => {
            return obj.currencyCode === secondaryCurrency
              ? { ...obj, amount: obj.amount - estimatedPrice }
              : { ...obj };
          }
        );

        setUserData((prevState) => ({
          ...prevState,
          AquiredCurrency: subtractingAmountFromArray,
        }));

        setUserData((prevState) => ({
          ...prevState,
          AquiredCurrency: [
            ...prevState.AquiredCurrency,
            { ...currentCurrency, amount },
          ],
        }));
      }
    } else {
      console.log("not have enough funds");
    }
  };

  return (
    <>
      <div className="currency-detail-container flex">
        <div className="trading-card-currency-title w-full text-center">
          Buy <span>{currentCurrency.currencyCode}</span>
        </div>
        <div className="aquired-amount w-full">
          <p className="aquired-amount-label">Aquired Amount:</p>
          <p className="aquired-amount-value">{aquiredAmount.toFixed(2)}</p>
        </div>
      </div>
      <div className="amount-container flex justify-around">
        <label className="amount-label" htmlFor="amount-input">
          Amount
        </label>
        <input
          onChange={(e) => {
            setAmount(Number(e.target.value));
          }}
          type="number"
          name="amount-input"
          id="amount-input"
          className="amount-input-value"
        />
      </div>
      <div className="payment-currency-converter flex justify-around mt-10">
        <label
          className="payment-currency-label"
          htmlFor="payment-currency-dropdown"
        >
          Payment currency
        </label>
        <select
          onChange={(e) => {
            setSecondaryCurrency(e.target.value);
          }}
          className="payment-currency-dropdown"
          name="payment-currency-dropdown"
          id="payment-currency-dropdown"
        >
          {aquiredCurrencies.length > 0 ? (
            aquiredCurrencies.map((item, index) => {
              const currencyCode = item.currencyCode;
              return (
                <option key={index} value={currencyCode}>
                  {currencyCode}
                </option>
              );
            })
          ) : (
            <option value="none">none</option>
          )}
        </select>
      </div>
      <div className="market-price-container flex justify-around mt-10">
        <p className="market-price-label">Market Price</p>
        <p className="market-price-value">{marketPrice.toFixed(2)}</p>
      </div>
      <div className="estimated-price-container flex justify-around mt-10">
        <p className="estimates-price-label">Estimated Price</p>
        <p className="estimated-price-value">{estimatedPrice.toFixed(0)}</p>
      </div>
      <div className="purchase-button-container flex justify-center">
        <button
          onClick={purchase}
          className="purchase-button mt-10 cursor-pointer"
        >
          Purchase
        </button>
      </div>
      <div className="funds-container flex justify-center mt-10">
        <p className="funds">
          funds : <span>{secondaryCurrencyAmount.toFixed(2)}</span>
        </p>
      </div>
    </>
  );
};
export default BuySection;
