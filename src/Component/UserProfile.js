import React, { useEffect, useState } from "react";

const UserProfile = ({ currencyData, Loading }) => {
  const [popularCurrency, setPopularCurrency] = useState([]);
  const [popularLoading, setPopularLoading] = useState(true);

  useEffect(() => {
    if (!Loading) {
      const newCurrency = currencyData.filter((obj) => {
        const { currencyCode } = obj;
        return (
          currencyCode === "USD" ||
          currencyCode === "EUR" ||
          currencyCode === "CNY" ||
          currencyCode === "RUB"
        );
      });
      setPopularCurrency(newCurrency);
      setPopularLoading(false);
    }
  }, [Loading]);

  return (
    <>
      <div className="user-profile-main">
        <div className="user-profile-section-a">
          <div className="currency-details"></div>
          <div className="graph"></div>
          <div className="user-details"></div>
        </div>
        <div className="user-profile-section-b">
          <div className="currencies">
            <div className="popular-currency">
              <h1>Popular Currencies</h1>
              {popularLoading ? (
                <div>Loading...</div>
              ) : (
                popularCurrency.map((item, index) => {
                  const price = item.rate.toFixed(2);

                  return (
                    <div
                      key={index}
                      style={{ gap: "10px" }}
                      className="currency flex"
                    >
                      <div>{item.currencyCode}</div>
                      <div>₹{price}</div>
                      <button className="currency-details-btn">details</button>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default UserProfile;
