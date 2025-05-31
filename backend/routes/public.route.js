import express from "express";
import { getUser, incrementProfileReact, incrementProfileView } from "../controllers/public.controller.js";

const router = express.Router();


router.get("/user/:userId", getUser);
router.put("/increment-profile-view/:userId", incrementProfileView);
router.put("/:id/increment-profile-react/:userId", incrementProfileReact);



export default router;
