import express from "express";
import { createPaymentMethod } from "./controller";

const router = express.Router();

router.post("/create-payment-method", createPaymentMethod);

export default router;
