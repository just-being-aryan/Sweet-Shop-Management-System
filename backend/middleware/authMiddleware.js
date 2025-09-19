// middleware/authMiddleware.js
import jwt from "jsonwebtoken";
import ApiError from "../utils/apiError.js";

export const protect = (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = decoded; 
      return next();
    } catch (err) {
      return next(new ApiError(401, "Not authorized, token failed"));
    }
  }

  if (!token) {
    return next(new ApiError(401, "Not authorized, no token"));
  }
};

export const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ApiError(403, "You do not have permission to access this resource")
      );
    }
    next();
  };
};
