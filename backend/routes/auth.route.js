import { Router } from "express";
import { upload } from "../middlewares/multer.middleware.js";
import {
  forgotPassword,
  getCurrentUser,
  loginUser,
  logoutUser,
  registeredUser,
  resetPassword,
  verifyEmail,
} from "../controller/auth.controller.js";
import { isLogged } from "../middlewares/isLoggedIn.js";

const auth = Router();
auth.post("/registeredUser", upload.single("avatar"), registeredUser);
auth.patch("/verify-email/:token", verifyEmail);
auth.post("/login", loginUser);
auth.get("/logout", isLogged, logoutUser);
auth.post("/forgot-password", forgotPassword);
auth.patch("/reset-password/:token", resetPassword);
auth.get("/profile", isLogged, getCurrentUser);
export default auth;
