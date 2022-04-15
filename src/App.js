import React, { useEffect, useState } from "react";
import Header from "./Component/Header";
import Trading from "./Component/Trading";
import UserProfile from "./Component/UserProfile";

const App = () => {
  return (
    <div className="App">
      <Header />
      <UserProfile />
      <Trading />
    </div>
  );
};

export default App;
