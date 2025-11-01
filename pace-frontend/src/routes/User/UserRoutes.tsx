import UserLayout from "@/layout/UserLayout";
import UserFeedbacks from "@/pages/UserPages/UserFeedbacks";
import UserHome from "@/pages/UserPages/UserHome";
import UserTasks from "@/pages/UserPages/UserTasks";
import { Route, Routes } from "react-router-dom";

function UserRoutes() {
  return (
    <Routes>
      <Route path="/" element={<UserLayout />}>
        <Route path="/" element={<UserHome />} />
        <Route path="/tasks" element={<UserTasks />} />
        <Route path="/feedbacks" element={<UserFeedbacks />} />
      </Route>
    </Routes>
  );
}

export default UserRoutes;
