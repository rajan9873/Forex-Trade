import React from "react";
import { useGlobalContext } from "../Context";

const Header = () => {
  const { userData, setUserData } = useGlobalContext();

  const temp = () => {
    const data = userData.AquiredCurrency.filter((item) => {
      return item.amount > 0;
    });
    setUserData((prev) => ({
      ...prev,
      AquiredCurrency: data,
    }));
  };

  return (
    <>
      <header>
        <div className="header-section-a flex align-center">
          <div onClick={temp} className="logo">
            LOGO
          </div>
          <div className="search-bar">
            <label htmlFor="search-input"></label>
            <input
              className="search-input"
              type="search"
              name="search-input"
              id="search-input"
              placeholder="Search"
            />
          </div>
        </div>
        <nav className="header-nav">
          <ul className="header-section-b header-list-container flex justify-center">
            <li>User Profile</li>
            <li className="bg-grey">Logout</li>
          </ul>
        </nav>
      </header>
    </>
  );
};
export default Header;
