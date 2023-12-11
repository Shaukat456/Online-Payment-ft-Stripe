import express from "express";
import { createPriceController } from "./controller";

const router = express.Router();

router.post("/create-price", createPriceController);

export default router;
