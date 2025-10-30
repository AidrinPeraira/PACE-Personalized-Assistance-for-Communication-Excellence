import { Outlet } from "react-router-dom";

const UserLayout = () => {
  return (
    <div className="flex">
      {/* <StudentSidebar /> */}
      <main className="flex-1 p-6">
        <Outlet />
      </main>
    </div>
  );
};

export default UserLayout;
