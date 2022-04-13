import React from "react";

const CurrencyConvert = (amount = 1, firstCurrency, secondCurrency) => {
  const result = (amount * firstCurrency) / secondCurrency;
  return result;
};

export default CurrencyConvert;
