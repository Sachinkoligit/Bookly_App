import { configDotenv } from "dotenv";
configDotenv();

import express from "express";
import cookieParser from "cookie-parser";
import { Connection } from "./src/lib/db.js";
import userRoutes from "./src/routes/user.route.js";
import bookRoutes from "./src/routes/book.route.js";
import orderRoutes from "./src/routes/order.route.js";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: "https://fastidious-beijinho-fc2ca1.netlify.app",
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("Hello from backend...");
});

app.use("/api/userRoutes", userRoutes);
app.use("/api/bookRoutes", bookRoutes);
app.use("/api/orderRoutes", orderRoutes);

app.listen(PORT, () => {
  Connection();
  console.log(`Server running on port ${PORT}`);
});
