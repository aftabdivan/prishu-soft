import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../comman/Login";
import Organization from "../comman/Organization";
import AddOrganization from "../comman/AddOrganization";
import RequireAuth from "./RequireAuth";

export const DASHBOARD_PATH = "/";
export const AppRouter: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="login" element={<Login />} />
        <Route
          path="organization"
          element={
            <RequireAuth>
              <Organization />
            </RequireAuth>
          }
        />
        <Route
          path="add-organization"
          element={
            <RequireAuth>
              <AddOrganization />
            </RequireAuth>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};
