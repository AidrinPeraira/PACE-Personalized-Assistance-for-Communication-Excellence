import AdminLayout from "@/layout/AdminLayout";
import AdminDash from "@/pages/AdminPages/AdminDash";
import AdminStudents from "@/pages/AdminPages/AdminStudents";
import AdminTasks from "@/pages/AdminPages/AdminTasks";
import { Route, Routes } from "react-router-dom";

const AdminRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<AdminLayout />}>
        <Route path="/" element={<AdminDash />} />
        <Route path="/tasks" element={<AdminTasks />} />
        <Route path="/students" element={<AdminStudents />} />
      </Route>
    </Routes>
  );
};

export default AdminRoutes;
