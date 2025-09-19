import rateLimit from "express-rate-limit";

export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, 
  max: 50,
  message: {
    status: "error",
    message: "Too many attempts from this IP, please try again later."
  }
});
