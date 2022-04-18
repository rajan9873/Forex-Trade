import React from "react";

const SellSection = ({ aquiredAmount, aquiredCurrencies }) => {
  return (
    <>
      <div className="sellSection-aquired-amount-container flex justify-around mt-10">
        <div className="sellSection-aquired-amount-label">Aquired Amount</div>
        <div className="sellSection-aquired-amount-value">{aquiredAmount}</div>
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
