import React from "react";

const BuySection = () => {
  return (
    <>
      <div className="currency-detail-container flex">
        <div className="trading-card-currency-title w-full text-center">
          Buy USD
        </div>
        <div className="aquired-amount w-full">
          <p className="aquired-amount-label">Aquired Amount:</p>
          <p className="aquired-amount-value">154</p>
        </div>
      </div>
      <div className="amount-container flex justify-around">
        <label className="amount-label" htmlFor="amount-input">
          Amount
        </label>
        <input
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
          className="payment-currency-dropdown"
          name="payment-currency-dropdown"
          id="payment-currency-dropdown"
        >
          <option value="INR">INR</option>
          <option value="USD">USD</option>
          <option value="AMD">AMD</option>
        </select>
      </div>
      <div className="market-price-container flex justify-around mt-10">
        <p className="market-price-label">Market Price</p>
        <p className="market-price-value">84</p>
      </div>
      <div className="estimated-price-container flex justify-around mt-10">
        <p className="estimates-price-label">Estimated Price</p>
        <p className="estimated-price-value">0</p>
      </div>
      <div className="purchase-button-container flex justify-center">
        <button className="purchase-button mt-10 cursor-pointer">
          Purchase
        </button>
      </div>
      <div className="funds-container flex justify-center mt-10">
        <p className="funds">funds : 50</p>
      </div>
    </>
  );
};
export default BuySection;
