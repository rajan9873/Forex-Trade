import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useGlobalContext } from "../Context";

const UserProfile = () => {
  const { currencyData, Loading, userData, setUserData } = useGlobalContext();

  const [popularCurrency, setPopularCurrency] = useState([]);
  const [currentCurrency, setCurrentCurrency] = useState();
  const [userLoading, setUserLoading] = useState(true);
  const [watchlist, setWatchlist] = useState();

  useEffect(() => {
    if (!Loading) {
      const popularCurrencyData = currencyData.filter((obj) => {
        const { currencyCode } = obj;
        return (
          currencyCode === "USD" ||
          currencyCode === "EUR" ||
          currencyCode === "CNY" ||
          currencyCode === "RUB"
        );
      });
      setPopularCurrency(popularCurrencyData);

      let i = 0;
      const watchlistData = currencyData.filter((obj) => {
        const { currencyCode } = obj;
        return (
          currencyCode === "AMD" ||
          currencyCode === "EGP" ||
          currencyCode === "IDR" ||
          currencyCode === "JPY"
        );
      });
      setWatchlist(watchlistData);
      setCurrentCurrency(popularCurrencyData[0]);
      setUserLoading(false);
    }
  }, [Loading]);

  if (userLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="user-profile-main flex justify-around">
        <div className="user-profile-section-a">
          <div className="currency-details">
            <h1>₹{currentCurrency.rate.toFixed(2)}</h1>
          </div>
          <div className="graph"></div>
          <div className="user-details"></div>
        </div>
        <div className="user-profile-section-b">
          <div className="currencies">
            <div className="popular-currency">
              <h1>Popular Currencies</h1>
              {popularCurrency.map((item, index) => {
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
              })}
            </div>
            <div className="watchList">
              <h1>watchList</h1>
              {watchlist.map((item, index) => {
                const price = item.rate.toFixed(2);

                return (
                  <div
                    key={index}
                    style={{ gap: "10px" }}
                    className="currency flex"
                  >
                    <div>{item.currencyCode}</div>
                    <div>₹{price}</div>
                    <button
                      onClick={() => {
                        setCurrentCurrency(item);
                      }}
                      className="currency-details-btn"
                    >
                      <Link
                        to={`/trading/${item.currencyCode}`}
                        style={{ textDecoration: "none", color: "inherit" }}
                      >
                        Details
                      </Link>
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default UserProfile;
