import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

export const useAuthStore = create((set) => ({
  authUser: null,
  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/userRoutes/checkAuth");
      set({ authUser: res.data });
    } catch (error) {
      set({ authUser: null });
    }
  },
  login: async (data) => {
    try {
      const res = await axiosInstance.post("/userRoutes/login", data);
      set({ authUser: res.data });
      toast.success("Logged In Successfully ");
      return res.data;
    } catch (error) {
      toast.error("Invalid Credentials");
      return null;
    }
  },
  signup: async (data) => {
    try {
      const res = await axiosInstance.post("/userRoutes/signup", data);
      toast.success("Account created successfully");
      return res;
    } catch (error) {
      toast.error(error.response.data.message);
      return null;
    }
  },
  logout: async () => {
    try {
      await axiosInstance.get("/userRoutes/logout");
      set({ authUser: null });
      toast.success("Logged out successfully");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  },
  // addFavourite:async()=>{
  //   try{
  //     await axiosInstance.put("/userRoutes/addFavourite/:bookId");
  //   }catch(error){
  //     toast.error(error.response.data.message)
  //   }
  // }
}));
