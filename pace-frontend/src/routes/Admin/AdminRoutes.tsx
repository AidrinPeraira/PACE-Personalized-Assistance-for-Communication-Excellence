import AdminLayout from "@/layout/AdminLayout";
import AdminDash from "@/pages/AdminPages/AdminDash";
import { Route, Routes } from "react-router-dom";

const AdminRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<AdminLayout />}>
        <Route path="/" element={<AdminDash />} />
        <Route path="/daily-task" element={<AdminDash />} />
        <Route path="/students" element={<AdminDash />} />
      </Route>
    </Routes>
  );
};

export default AdminRoutes;
