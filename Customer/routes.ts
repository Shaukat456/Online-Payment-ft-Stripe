import express from "express";
import {
  createCustomer,
  deleteCustomer,
  getCustomer,
  listCustomers,
  searchCustomer,
  updateCustomer,
} from "./controller";

const router = express.Router();

router.get("/customer-list", listCustomers);
router.post("/create-customer", createCustomer);
router.post("/update-customer/:customerId/:orderId", updateCustomer);
router.delete("/get-customer/:customerId", getCustomer);
router.delete("/delete-customer/:customerId", deleteCustomer);
router.delete("/search-customers", searchCustomer);

export default router;
