import { useEffect, useState } from "react";
import { axiosInstance } from "../lib/axios";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../Store/useAuthStore";
import toast from "react-hot-toast";

export default function Setting() {
  const navigate = useNavigate();
  const { authUser } = useAuthStore();
  const [address, setAdd] = useState();

  const setAddress = async () => {
    try {
      await axiosInstance.put("userRoutes/updateAddress", {
        address: address,
      });
      setAdd("");
      toast.success("Address Updated Successfully");
    } catch (error) {
      console.log(error);
    }
  };

  // useEffect(() => {
  //   getUserOrder();
  // }, []);
  return (
    <div className="w-full px-5 md:px-0 md:w-[50%]">
      <h1 className="text-3xl md:text-4xl font-semibold text-zinc-400">Settings</h1>
      <div className="w-full flex justify-start items-center gap-16 md:gap-6 pt-3">
        <div className="flex flex-col">
          <label className="p-2 ">Username</label>
          <p className="bg-zinc-800 p-2 rounded hover:cursor-default">
            {authUser.username}
          </p>
        </div>
        <div className="flex flex-col">
          <label className="p-2 ">Email</label>
          <p className="bg-zinc-800 p-2 rounded hover:cursor-default">
            {authUser.email}
          </p>
        </div>
      </div>
      <div className="flex flex-col">
        <label className="py-2">Address</label>
        <textarea
          className="bg-zinc-800 rounded-md p-2 w-[302px] md:w-[270px] outline-none"
          value={address}
          onChange={(e) => setAdd(e.target.value)}
          rows={3}
        />
      </div>
      <div className="pt-3">
        <button
          onClick={() => setAddress()}
          className="bg-yellow-500 p-2 py-1 text-black rounded font-semibold"
        >
          Update
        </button>
      </div>
    </div>
  );
}
