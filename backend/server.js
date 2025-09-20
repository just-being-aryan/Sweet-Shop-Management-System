import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import errorMiddleware from "./middleware/errorMiddleware.js";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.routes.js";
import sweetRoutes from "./routes/sweet.route.js";

dotenv.config();
connectDB();

const app = express();


app.use(express.json());


const allowedOrigins = [
  "http://localhost:8000", 
  process.env.FRONTEND_URL 
];


app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

app.use("/api/auth", authRoutes);
app.use("/api/sweets", sweetRoutes)


app.get("/", (req, res) => {
  res.send("API is running...");
});

app.use(errorMiddleware);

export default app;