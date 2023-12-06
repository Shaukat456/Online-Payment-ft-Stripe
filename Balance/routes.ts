import express from "express";
import { checkBalance } from "./balance";

const router = express.Router();

router.get("/check-balance", checkBalance);

export default router;
