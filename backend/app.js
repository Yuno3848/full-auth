import express from "express";
import auth from "./routes/auth.route.js";
import cookie from "cookie-parser";
import cors from "cors";
const app = express();
app.use(cookie());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use("/api/v1/user", auth);

export default app;
