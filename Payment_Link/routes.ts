import express from "express";
import { createPaymentLinkController } from "./controller";

const router = express.Router();

router.post("/create-payment-link", createPaymentLinkController);

export default router;
