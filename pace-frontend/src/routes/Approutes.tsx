import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import LoginPage from "@/pages/LoginPage";
import SignupPage from "@/pages/SignupPage";
import AdminDash from "@/pages/AdminDash";
import DailyTask from "@/pages/DailyTask";
import Students from "@/pages/Students";

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
    <Route path="/admin" element={<AdminDash/>} />
     <Route path="daily-task" element={<DailyTask />} />
    <Route path="students" element={<Students />} />
    </Routes>
  );
};

export default AppRoutes;
