import React from "react";
import { Route, Routes } from "react-router-dom";
import "./Home.css";
import Header from "./Home/Header1";
import Home2 from "./Home/Home2";
import Component1 from "./Home/Component1";
import Component2 from "./Home/Component2";
import Component5 from "./Home/Component5";

import App from "./components/App";

function Home() {
  return (
    <div className="Home">
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Header />
              <Home2 />
              <Component1 />
              <Component2 />
              <Component5 />
            </>
          }
        />

        <Route path="/app" element={<App />} />
      </Routes>
    </div>
  );
}

export default Home;
