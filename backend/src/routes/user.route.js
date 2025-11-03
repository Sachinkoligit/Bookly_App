import express from "express";
import {
  signup,
  showUsers,
  login,
  logout,
  showUser,
  updateAddress,
  addFavourite,
  deleteFavourite,
  getFavourite,
  addToCart,
  deleteToCart,
  getCartBooks,
  checkAuth,
} from "../controllers/user.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/showUsers", showUsers);

router.post("/signup", signup);

router.post("/login", login);

router.get("/logout", logout);

router.get("/showUser", protectRoute, showUser);

router.get("/getFavourite", protectRoute, getFavourite);

router.put("/updateAddress", protectRoute, updateAddress);

router.put("/addFavourite/:bookId", protectRoute, addFavourite);

router.put("/deleteFavourite/:bookId", protectRoute, deleteFavourite);

router.put("/addToCart/:bookId", protectRoute, addToCart);

router.put("/deleteToCart/:bookId", protectRoute, deleteToCart);

router.get("/getCartBooks", protectRoute, getCartBooks);

router.get("/checkAuth",protectRoute,checkAuth)

export default router;
