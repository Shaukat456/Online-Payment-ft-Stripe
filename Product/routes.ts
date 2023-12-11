import express from "express";
import { createProductController, getProductById } from "./controller";

const router = express.Router();

router.post("/create-product", createProductController);
router.get("/get-product/:id", getProductById);
router.get("/", getProductById);

export default router;
