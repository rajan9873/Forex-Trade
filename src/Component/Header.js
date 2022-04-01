import React from "react";

const Header = () => {
  return (
    <>
      <header>
        <div className="header-section-a flex">
          <div className="logo">LOGO</div>
          <div className="search-bar">
            <label htmlFor="search-input"></label>
            <input type="search" name="search-input" id="search-input" />
          </div>
        </div>
        <nav className="header-nav">
          <ul className="header-section-b header-list-container">
            <li>User Profile</li>
            <li>Logout</li>
          </ul>
        </nav>
      </header>
    </>
  );
};
export default Header;
