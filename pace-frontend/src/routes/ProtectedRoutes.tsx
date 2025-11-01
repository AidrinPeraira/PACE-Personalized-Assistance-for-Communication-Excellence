import type { AuthState } from "@/Features/auth/authTypes"
import { useSelector } from "react-redux"
import { Navigate, Outlet } from "react-router-dom";



export const AdminRouteGaurd = () => {

    const { user } = useSelector((state: { auth: AuthState }) => state.auth);

    if (user && user.role === 'seniorCordinator') {
        // if the user is admin give the access to pages
        return <Outlet />
    } else {
        // If not then redirect to login
        return <Navigate to="/login" replace />
    }
};

export const UserRouteGuard = () => {
    const { user } = useSelector((state: { auth: AuthState }) => state.auth);

    if (user && user.role === 'student') {
        // the user is student then they can access the routes 
        return <Outlet />
    } else {
        // else it will redirect
        return <Navigate to="/login"  replace/>
    }
}


export const PublicRouteGuard = () => {
  const { user } = useSelector((state: { auth: AuthState }) => state.auth);

  if (user) {
    // User is logged in, redirect them to their dashboard
    if (user.role === "seniorCordinator") {
      return <Navigate to="/admin" replace />;
    } else if (user.role === "student") {
      return <Navigate to="/student" replace />;
    }
  }

  return <Outlet />;
};
