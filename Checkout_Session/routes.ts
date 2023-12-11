import express from "express";
import { createCheckoutSessionController } from "./controller";

const router = express.Router();

router.post("/create-checkout-session", createCheckoutSessionController);

export default router;
