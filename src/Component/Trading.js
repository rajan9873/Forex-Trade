import React, { useState } from "react";
import BuySection from "./BuySection";
import SellSection from "./SellSection";

const Trading = () => {
  const [buySection, setBuySection] = useState(false);

  return (
    <>
      <div className="trading-main flex justify-around">
        <div className="trading-section-a">
          <div className="currency-details">
            <h1>₹11.96</h1>
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
            {buySection ? <BuySection /> : <SellSection />}
          </div>
        </div>
      </div>
    </>
  );
};

export default Trading;
