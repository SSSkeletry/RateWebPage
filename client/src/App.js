import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home.jsx";
import Analysis from "./pages/Analysis/Analysis.jsx";
import PrivateRoute from "./app/providers/router/PrivateRoute.js";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/analysis"
          element={
            <PrivateRoute>
              <Analysis />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
