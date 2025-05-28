

import express from "express";
import { getCurrentUser, loginUser, registerUser } from "../controllers/auth.controller.js";
import protect from "../middlewares/auth.middleware.js";

const router = express.Router();


router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/me/:userId", getCurrentUser);



export default router;
