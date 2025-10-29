import UserLayout from "@/layout/UserLayout"
import { Route, Routes } from "react-router-dom"

function UserRoutes() {
  return (
    <Routes>
      <Route element={<UserLayout />}>
        
        {/* <Route path="/" element={<DailyTask />} /> */}
        
        
      </Route>
    </Routes>
  )
}

export default UserRoutes

