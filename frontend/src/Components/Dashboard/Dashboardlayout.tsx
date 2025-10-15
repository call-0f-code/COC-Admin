
import { Outlet } from "react-router-dom"
import Sidebar from "./Sidebar"


const Dashboardlayout = () => {
  return (
    <div className="flex min-h-screen bg-amber-50">
      <Sidebar />
      <div
        className={`ml-56  w-full bg-amber-50 `}
      >
        <div className="">
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default Dashboardlayout
