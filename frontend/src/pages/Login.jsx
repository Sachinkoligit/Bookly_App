import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../Store/useAuthStore";
import { useState } from "react";
import toast from "react-hot-toast";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuthStore();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const handleSubmit = async () => {
    if (user.email === "" || user.password === "") {
      toast.error("Fields are required");
      return;
    }
    const data = await login(user);
    if (data) {
      navigate("/");
    }
    setUser({
      email: "",
      password: "",
    });
  };
  return (
    <div className="bg-zinc-900 p-5 flex justify-center items-center h-[80vh] md:h-[90vh]">
      <div className="bg-zinc-800 p-6 w-[90%] md:w-[40%] text-zinc-300">
        <h1 className="text-2xl text-white">Login</h1>
        <div className="pt-3 flex flex-col gap-3 [&_div]:flex [&_div]:flex-col [&_div]:gap-2 [&_div>input]:p-2">
          <div>
            <label>Email</label>
            <input
              type="email"
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
              placeholder="xyz@gmail.com"
              className="bg-zinc-900 outline-none"
              required
            />
          </div>
          <div>
            <label>Password</label>
            <input
              type="password"
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              placeholder="password"
              className="bg-zinc-900 outline-none"
              required
            />
          </div>
          <div>
            <button
              onClick={handleSubmit}
              className="bg-blue-500 text-white py-2 rounded transition duration-150 hover:bg-blue-800"
            >
              Login
            </button>
          </div>
          <div className="flex flex-col justify-center items-center">
            <p>Or</p>
            <p>
              Create an account?{" "}
              <span
                className="underline hover:cursor-pointer hover:text-blue-700"
                onClick={() => navigate("/signup")}
              >
                SignUp
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
