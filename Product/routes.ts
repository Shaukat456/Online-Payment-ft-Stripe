import express from "express";
import {
  createProductController,
  getProductById,
  getAllProductsController,
} from "./controller";

const router = express.Router();

router.post("/create-product", createProductController);
router.get("/allproducts", getAllProductsController);
router.get("/get-product/:id", getProductById);

export default router;
