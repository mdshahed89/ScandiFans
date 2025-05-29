import express from "express";
import { getUser } from "../controllers/public.controller.js";

const router = express.Router();


router.get("/user/:userId", getUser);



export default router;
