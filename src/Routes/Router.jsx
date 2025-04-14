import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "../pages/Dashboard";

const Router = () => {
  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={<Navigate to="/dashboard" element={<Dashboard />} />}
        />

        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </div>
  );
};

export default Router;
