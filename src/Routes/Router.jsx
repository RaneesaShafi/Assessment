import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import Races from "../pages/Races";
import Drivers from "../pages/Drivers";
import Constructors from "../pages/Constructors";
import Feedback from "../pages/Feedback";

const Router = () => {
  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={<Navigate to="/dashboard" element={<Dashboard />} />}
        />

        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/races" element={<Races />} />
        <Route path="/drivers" element={<Drivers />} />
        <Route path="/constructors" element={<Constructors />} />
        <Route path="/feedback" element={<Feedback />} />
      </Routes>
    </div>
  );
};

export default Router;