import express from "express";
import { checkBalance } from "./controller";

const router = express.Router();

router.get("/check-balance", checkBalance);

export default router;
