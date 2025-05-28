import express from "express";
import { changeEmail, changePassword, confirmPayment, createPaymentIntent, getUsers, updateUser } from "../controllers/user.controller.js";
import protect from "../middlewares/auth.middleware.js";

const router = express.Router();


router.post("/:userId/payment/create-payment-intent", protect, createPaymentIntent);
router.post("/:userId/payment/confirm-payment", protect, confirmPayment);
router.put("/:userId/update", protect, updateUser);
router.put("/:userId/change-email", protect, changeEmail);
router.put("/:userId/change-password", protect, changePassword);
router.get("/users", getUsers);



export default router;
