import { List } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../Store/useAuthStore";
import { useEffect } from "react";

export default function Navbar() {
  const { authUser, checkAuth, logout } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <div className="bg-zinc-800 text-white px-8 py-4 flex flex-row justify-between items-center">
      <div
        className="flex flex-row items-center gap-2"
        onClick={() => navigate("/")}
      >
        <img
          src="https://cdn-icons-png.flaticon.com/128/10433/10433049.png"
          height="40px"
          width="40px"
        />
        <h1 className="text-2xl font-semibold hover:cursor-default">Bookly</h1>
      </div>
      <div className="flex flex-row items-center gap-4">
        <div className="hidden md:flex flex-row items-center gap-4 [&>div]:hover:cursor-pointer">
          <div
            className="hover:text-blue-500 transition-colors duration-300"
            onClick={() => navigate("/")}
          >
            Home
          </div>
          <div
            className="hover:text-blue-500 transition-colors duration-300"
            onClick={() => navigate("/allBooks")}
          >
            All Books
          </div>
          {authUser && (
            <div
              className="hover:text-blue-500 transition-colors duration-300"
              onClick={() => navigate("/cart")}
            >
              Cart
            </div>
          )}
          {authUser && (
            <div
              className="hover:text-blue-500 transition-colors duration-300"
              onClick={() => navigate("/profile")}
            >
              {authUser.role === "user" ? "Profile" : "Admin_Profile"}
            </div>
          )}
        </div>
        {!authUser && (
          <div className="hidden md:flex flex-row items-center gap-4">
            <button
              className="hover:bg-white hover:text-zinc-800 duration-300 font-semibold px-4 py-2 border-2 rounded border-blue-500"
              onClick={() => navigate("/login")}
            >
              Login
            </button>
            <button
              className="hover:bg-white hover:text-zinc-800 duration-300 px-4 font-semibold py-2 bg-blue-500 rounded"
              onClick={() => navigate("/signup")}
            >
              SignUp
            </button>
          </div>
        )}
        {authUser && (
          <div className="hidden md:flex flex-row items-center gap-4">
            <button
              className="hover:bg-white hover:text-zinc-800 duration-300 font-semibold px-4 py-2 rounded bg-green-600"
              onClick={() => logout()}
            >
              Logout
            </button>
          </div>
        )}
        <div className="flex md:hidden">
          <button
            className=" active:text-zinc-800"
            popoverTarget="popover-1"
            style={{ anchorName: "--anchor-1" }}
          >
            <List className="size-7" />
          </button>

          <ul
            className="dropdown dropdown-center menu w-[200px] [&_li]:text-xl gap-2 rounded-box bg-zinc-800 shadow-sm p-2"
            popover="auto"
            id="popover-1"
            style={{ positionAnchor: "--anchor-1" }}
          >
            <li>
              <a href="/">Home</a>
            </li>
            <li>
              <a href="/allBooks">All Books</a>
            </li>
            {authUser && (
              <li>
                <a href="/cart">Cart</a>
              </li>
            )}
            {authUser && authUser.role === "user" && (
              <li>
                <a href="/profile">Profile</a>
              </li>
            )}
            {authUser && authUser.role === "admin" && (
              <li>
                <a href="/profile">Admin_Profile</a>
              </li>
            )}
            {!authUser && (
              <li className="px-[10px]">
                <a
                  href="/login"
                  className="hover:bg-white w-[80px] hover:text-zinc-800 duration-300 font-semibold px-3 py-2 border-2 rounded border-blue-500"
                >
                  Login
                </a>
              </li>
            )}
            {!authUser && (
              <li className="px-[10px]">
                <a
                  href="/signup"
                  className="hover:bg-white w-[80px] hover:text-zinc-800 duration-300 px-2 font-semibold py-2 bg-blue-500 rounded"
                >
                  SignUp
                </a>
              </li>
            )}
            {authUser && (
              <li className="px-[10px]">
                <a
                  onClick={() => logout()}
                  className="hover:bg-white w-[80px] hover:text-zinc-800 duration-300 px-2 font-semibold py-2 bg-green-600 rounded"
                >
                  logout
                </a>
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}
