import { Router } from "express";
import { getProfile, login, register } from "../controllers/auth.controller.js";

const authRoutes = Router();

authRoutes.post("/register", register);
authRoutes.post("/login", login);
authRoutes.get("/profile", getProfile);
export default authRoutes;