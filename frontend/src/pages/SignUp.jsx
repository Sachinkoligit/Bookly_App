import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../Store/useAuthStore";

export default function SignUp() {
  const { signup } = useAuthStore();
  const navigate = useNavigate();
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
    address: "",
  });
  const handleSubmit = async () => {
    if (
      user.username === "" ||
      user.email === "" ||
      user.password === "" ||
      user.address === ""
    ) {
      toast.error("All Fields are required");
      return;
    }
    const res = await signup(user);
    if (res) {
      navigate("/login");
    }
    setUser({
      username: "",
      email: "",
      password: "",
      address: "",
    });
  };
  return (
    <div className="bg-zinc-900 p-5 flex justify-center items-center pb-10">
      <div className="bg-zinc-800 p-6 w-[90%] md:w-[40%] text-zinc-300">
        <h1 className="text-2xl text-white">Sign Up</h1>
        <div className="pt-3 flex flex-col gap-3 [&_div]:flex [&_div]:flex-col [&_div]:gap-2 [&_div>input]:p-2 [&_div>input]:outline-none">
          <div>
            <label>Username</label>
            <input
              type="text"
              value={user.username}
              onChange={(e) => setUser({ ...user, username: e.target.value })}
              placeholder="username"
              className="bg-zinc-900"
              required
            />
          </div>
          <div>
            <label>Email</label>
            <input
              type="email"
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
              placeholder="xyz@gmail.com"
              className="bg-zinc-900"
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
              className="bg-zinc-900"
              required
            />
          </div>
          <div>
            <label>Address</label>
            <textarea
              rows={5}
              className="bg-zinc-900 p-2 outline-none"
              placeholder="address"
              value={user.address}
              onChange={(e) => setUser({ ...user, address: e.target.value })}
              required
            />
          </div>
          <div>
            <button
              onClick={handleSubmit}
              className="bg-blue-500 text-white py-2 rounded transition duration-150 hover:bg-blue-800"
            >
              SignUp
            </button>
          </div>
          <div className="flex flex-col justify-center items-center">
            <p>Or</p>
            <p>
              Already have an account?{" "}
              <span
                className="underline hover:cursor-pointer hover:text-blue-700"
                onClick={() => navigate("/login")}
              >
                Login
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
