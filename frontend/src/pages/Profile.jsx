import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { useAuthStore } from "../Store/useAuthStore";
import { Loader } from "lucide-react";

export default function Profile() {
  const location = useLocation();
  const { authUser } = useAuthStore();
  const navigate = useNavigate();
  return (
    <div className="px-2 md:px-12 flex flex-col md:flex-row py-8 gap-4 text-white">
      <div className="w-full md:w-1/6">
        {!authUser && (
          <div className="w-full h-[100%] flex justify-center items-center">
            <Loader />
          </div>
        )}
        <Sidebar data={authUser} />
      </div>
      {authUser && authUser.role === "user" && (
        <div className="md:hidden flex bg-zinc-900 p-3 text-white flex-row justify-evenly font-semibold text-xl">
          <div
            className={`${
              location.pathname === "/profile"
                ? "border-b-2 border-blue-500"
                : ""
            }`}
            onClick={() => navigate("/profile")}
          >
            Favourites
          </div>
          <div
            className={`${
              location.pathname === "/profile/orderHistory"
                ? "border-b-2 border-blue-500"
                : ""
            }`}
            onClick={() => navigate("/profile/orderHistory")}
          >
            Order History
          </div>
          <div
            className={`${
              location.pathname === "/profile/settings"
                ? "border-b-2 border-blue-500"
                : ""
            }`}
            onClick={() => navigate("/profile/settings")}
          >
            Settings
          </div>
        </div>
      )}
      {authUser && authUser.role === "admin" && (
        <div className="md:hidden flex bg-zinc-900 p-3 text-white flex-row justify-evenly font-semibold text-xl">
          <div
            className={`${
              location.pathname === "/profile"
                ? "border-b-2 border-blue-500"
                : ""
            }`}
            onClick={() => navigate("/profile")}
          >
            All_Order_History
          </div>
          <div
            className={`${
              location.pathname === "/profile/addBook"
                ? "border-b-2 border-blue-500"
                : ""
            }`}
            onClick={() => navigate("/profile/addBook")}
          >
            Add_Book
          </div>
        </div>
      )}
      <div className="w-full md:5/6">
        <Outlet />
      </div>
    </div>
  );
}
