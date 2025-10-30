import React, { useEffect } from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import type { AuthState } from "@/Features/auth/authTypes";
import { checkAuthStatusThunk } from "@/Features/auth/authThunks";
import { useAppDispatch } from "@/hooks";

import Home from "../pages/Home";
import LoginPage from "@/pages/LoginPage";
import SignupPage from "@/pages/SignupPage";
import {
  AdminRouteGaurd,
  PublicRouteGuard,
  UserRouteGuard,
} from "./ProtectedRoutes";
import AdminRoutes from "./Admin/AdminRoutes";
import UserRoutes from "./User/UserRoutes";
import { setAuthStatus } from "@/Features/auth/authSlice";

const AppRoutes: React.FC = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const { status } = useSelector((state: { auth: AuthState }) => state.auth);

  useEffect(() => {
    const publicPaths = ["/login", "/signup"];
    if (status === "idle") {
      if (publicPaths.includes(location.pathname)) {
        dispatch(setAuthStatus("failed"));
      } else {
        dispatch(checkAuthStatusThunk());
      }
    }
  }, [dispatch, status, location.pathname]);

  if (status === "idle" || status === "loading") {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <div>Loading application...</div>
      </div>
    );
  }

  return (
    <Routes>
      {/* Public route available to everyone */}

      {/* Public routes only for non-logged-in users */}
      <Route element={<PublicRouteGuard />}>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
      </Route>

      {/* Admin Protected Routes */}
      <Route element={<AdminRouteGaurd />}>
        <Route path="/admin/*" element={<AdminRoutes />} />
      </Route>

      {/* User Protected routes */}
      <Route element={<UserRouteGuard />}>
        <Route path="/student/*" element={<UserRoutes />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
