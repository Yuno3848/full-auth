import { Router } from "express";
import { upload } from "../middlewares/multer.middleware.js";
import {
  forgotPassword,
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
auth.get("/login", loginUser);
auth.get("/logout",isLogged, logoutUser);
auth.get("/forgot-password", forgotPassword);
auth.patch("/reset-password/:token", resetPassword);
export default auth;
