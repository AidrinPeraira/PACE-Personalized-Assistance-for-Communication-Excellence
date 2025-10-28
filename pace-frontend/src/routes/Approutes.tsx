import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import LoginPage from "@/pages/LoginPage";
import SignupPage from "@/pages/SignupPage";
import { AdminRouteGaurd, PublicRouteGuard, UserRouteGuard } from "./ProtectedRoutes";
import AdminRoutes from "./Admin/AdminRoutes";
import UserRoutes from "./User/UserRoutes";

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route element={<PublicRouteGuard/>}>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      </Route>

      /** Admin Protected Routes */

      <Route element={<AdminRouteGaurd />}>
        <Route path="/admin/*" element={<AdminRoutes />} />
      </Route>

      /**User Protected routes */
      <Route element={<UserRouteGuard />}>
        <Route path="/student/*" element={<UserRoutes />} />
      </Route>

    </Routes>
  );
};

export default AppRoutes;
