import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import {
  getAllOrder,
  getUserOrder,
  orderBook,
  updateOrder,
} from "../controllers/order.controller.js";

const router = express.Router();

router.post("/orderBook/", protectRoute, orderBook);

router.get("/getUserOrder", protectRoute, getUserOrder);

router.get("/getAllOrder", protectRoute, getAllOrder);

router.put("/updateOrder/:orderId", protectRoute, updateOrder);

export default router;
