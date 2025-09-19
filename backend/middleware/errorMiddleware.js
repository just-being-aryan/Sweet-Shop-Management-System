// middleware/errorMiddleware.js
const errorMiddleware = (err, req, res, next) => {
  console.error(err);

  const statusCode = err.statusCode || 500;
  const message = err.message || "Something went wrong";

  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
    stack: process.env.NODE_ENV === "production" ? null : err.stack
  });
};

export default errorMiddleware;
