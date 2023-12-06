import express from "express";
import { customersList } from "./customer";

const router = express.Router();

router.get("/customer-list", customersList);
router.post("/create-customer");
router.post("/update-customer/:customerId/:orderId");
router.delete("/get-customer/:customerId");
router.delete("/delete-customer/:customerId");
router.delete("/search-customers");

export default router;
