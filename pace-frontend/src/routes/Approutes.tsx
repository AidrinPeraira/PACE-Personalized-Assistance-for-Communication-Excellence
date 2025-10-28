import React, { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import type { AuthState } from "@/Features/auth/authTypes";
import { checkAuthStatusThunk } from "@/Features/auth/authThunks";
import { useAppDispatch } from "@/hooks"; 

import Home from "../pages/Home";
import LoginPage from "@/pages/LoginPage";
import SignupPage from "@/pages/SignupPage";
import { AdminRouteGaurd, PublicRouteGuard, UserRouteGuard } from "./ProtectedRoutes";
import AdminRoutes from "./Admin/AdminRoutes";
import UserRoutes from "./User/UserRoutes";
import { setAuthStatus } from "@/Features/auth/authSlice";

const AppRoutes: React.FC = () => {
  const dispatch = useAppDispatch(); 
  const location = useLocation(); 
  const { status } = useSelector((state: { auth: AuthState }) => state.auth);
/**
 * for the developer who reading this, here we face an issue that , when the page reload or try to access login logout routes 
 * the redux state will lost , for solving this issue we can use localstorage to store user credentials like user :{email,name,role}
 * but it is vulnarable , so that i (nandu) created a route in backend called status (in user routes) then in frontend i set some configuration in
 * slice and thunk like a "status" it is in inital state , when the user try to login , after it if any cause the state refresh the authservice route
 * checkstatus will trigger and it goes to the backend and backend middleware(authenticate)validate in and send user to frontend.
 * 
 * I dont no its a good approch or not , if you guys have any idea do it , for this i take lot of time !!!   
 * 
 */
  useEffect(() => {
    const publicPaths = ['/login', '/signup'];
    if (status === 'idle') {
      if (publicPaths.includes(location.pathname)) {
        dispatch(setAuthStatus('failed')); 
      } else {
        dispatch(checkAuthStatusThunk());
      }
    }
  }, [dispatch, status, location.pathname]);

  if (status === 'idle' || status === 'loading') {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <div>Loading application...</div>
      </div>
    );
  }

  return (
    <Routes>
      {/* Public route available to everyone */}
      <Route path="/" element={<Home />} />

      {/* Public routes only for non-logged-in users */}
      <Route element={<PublicRouteGuard />}>
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

