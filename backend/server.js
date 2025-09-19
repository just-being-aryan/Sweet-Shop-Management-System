import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import errorMiddleware from "./middleware/errorMiddleware.js";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.routes.js";
dotenv.config();
connectDB();

const app = express();
app.use(express.json());
const allowedOrigins = ["http://localhost:8000"];
app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);
app.use("/api/auth", authRoutes);


app.get("/", (req, res) => {
  res.send("API is running...");
});

app.use(errorMiddleware);

export default app;