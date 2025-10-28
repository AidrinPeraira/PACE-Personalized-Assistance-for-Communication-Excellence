import AdminLayout from "@/layout/AdminLayout";
//import AdminDash from "@/pages/AdminDash";
import { Route, Routes } from "react-router-dom";

const AdminRoutes = () =>{
    return (
        <Routes>
            <Route element={<AdminLayout/>}>
                {/* <Route path="/" element={<AdminDash />}/> */}
            </Route>

        </Routes>

    )
}


export default AdminRoutes;