import express from "express";
import { stripeFlow } from "./Controller";

const router = express.Router();

router.post("/doEverything", stripeFlow);

export default router;
