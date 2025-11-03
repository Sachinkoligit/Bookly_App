import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import {
  addBook,
  deleteBook,
  showBooks,
  updateBook,
  showRecentBooks,
  showBook,
  showSearchBook,
} from "../controllers/book.controller.js";

const router = express.Router();

router.get("/showBook/:bookId", showBook);

router.get("/showSearchBook/:title", showSearchBook);

router.get("/showBooks", showBooks);

router.get("/showRecentBooks", showRecentBooks);

router.post("/addBook", protectRoute, addBook);

router.put("/updateBook/:bookId", protectRoute, updateBook);

router.delete("/deleteBook/:bookId", protectRoute, deleteBook);

export default router;
