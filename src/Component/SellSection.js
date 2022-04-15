import React from "react";

const SellSection = () => {
  return (
    <>
      <div className="sellSection-aquired-amount-container flex justify-around mt-10">
        <div className="sellSection-aquired-amount-label">Aquired Amount</div>
        <div className="sellSection-aquired-amount-value">157</div>
      </div>
      <div className="amount-container flex justify-around mt-10">
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
      <div className="recieving-currency-converter flex justify-around mt-10">
        <label
          className="recieving-currency-label"
          htmlFor="recieving-currency-dropdown"
        >
          Recieving currency
        </label>
        <select
          className="recieving-currency-dropdown"
          name="recieving-currency-dropdown"
          id="recieving-currency-dropdown"
        >
          <option value="INR">INR</option>
          <option value="USD">USD</option>
          <option value="AMD">AMD</option>
        </select>
      </div>
      <div className="sales-container flex justify-around mt-10">
        <p className="sales-label">Sales</p>
        <p className="sales-value">0</p>
      </div>
      <div className="sell-btn-container flex justify-center mt-10">
        <button className="sell-btn cursor-pointer">Sell</button>
      </div>
    </>
  );
};
export default SellSection;
