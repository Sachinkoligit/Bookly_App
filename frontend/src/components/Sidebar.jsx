import { useLocation } from "react-router-dom";
import { useAuthStore } from "../Store/useAuthStore";

export default function Sidebar({ data }) {
  const location = useLocation();
  const { authUser } = useAuthStore();
  return (
    <div className="bg-zinc-800 h-[25vh] md:h-[80vh] p-4 rounded flex flex-col justify-between items-center">
      <div className="flex flex-col justify-center items-center">
        <img src={data.avatar} className="h-[10vh]" />
        <p className="mt-3 text-xl text-zinc-100 font-semibold">
          {data.username}
        </p>
        <p className="mt-1 text-zinc-300">{data.email}</p>
        <div className="w-full mt-4 h-[1px] bg-zinc-500 hidden md:block"></div>
      </div>
      {authUser && authUser.role === "user" && (
        <div className="w-full flex-col items-center justify-center hidden md:flex">
          <a
            href="/profile"
            className={`text-zinc-100 font-semibold w-full py-2 text-center hover:bg-zinc-900 transition-all duration-300 ${
              location.pathname === "/profile"
                ? "border-b-2 border-blue-500"
                : ""
            }`}
          >
            Favourites
          </a>
          <a
            href="/profile/orderHistory"
            className={`text-zinc-100 font-semibold w-full py-2 text-center hover:bg-zinc-900 transition-all duration-300 ${
              location.pathname === "/profile/orderHistory"
                ? "border-b-2 border-blue-500"
                : ""
            }`}
          >
            Order_History
          </a>
          <a
            href="/profile/settings"
            className={`text-zinc-100 font-semibold w-full py-2 text-center hover:bg-zinc-900 transition-all duration-300  ${
              location.pathname === "/profile/settings"
                ? "border-b-2 border-blue-500"
                : ""
            }`}
          >
            Settings
          </a>
        </div>
      )}
      {authUser && authUser.role === "admin" && (
        <div className="w-full flex-col items-center justify-center hidden md:flex">
          <a
            href="/profile"
            className={`text-zinc-100 font-semibold w-full py-2 text-center hover:bg-zinc-900 transition-all duration-300 ${
              location.pathname === "/profile"
                ? "border-b-2 border-blue-500"
                : ""
            }`}
          >
            All Order History
          </a>
          <a
            href="/profile/addBook"
            className={`text-zinc-100 font-semibold w-full py-2 text-center hover:bg-zinc-900 transition-all duration-300  ${
              location.pathname === "/profile/addBook"
                ? "border-b-2 border-blue-500"
                : ""
            }`}
          >
            Add Book
          </a>
        </div>
      )}
    </div>
  );
}
