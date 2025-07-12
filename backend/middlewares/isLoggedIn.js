import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
export const isLogged = async (req, res, next) => {
  try {
    const token = req.cookies?.accessToken;

    if (!token) {
      return res.status(401).json({
        status: "failed",
        message: "failed to get credentials",
      });
    }

    const decode = jwt.verify(token, process.env.SECRET_KEY);
    req.user = decode;

    next();
  } catch (error) {
    return res.status(500).json({
      status: "failed",
      message: "Server(auth middleware) Internal Problem",
      error: error.message,
    });
  }
};
