import express, { Request, Response } from "express";
import { handleErrorResponse } from "../utils";
import path from "path";
import dotenv from "dotenv";
import rateLimit from "express-rate-limit";
import BalanceRoutes from "../Balance/routes";
import CustomerRoutes from "../Customer/routes";

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: "Too many requests.",
});

dotenv.config({
  path: path.resolve(__dirname, "../", ".env"),
});

const API_KEY = process.env.API_KEY;

const stripe = require("stripe")(API_KEY);

const app = express();
app.use(express.json());
app.use(express.static("public"));
app.use(limiter);

app.use("/balance", BalanceRoutes);
app.use("/customer", CustomerRoutes);
app.use("/customer", CustomerRoutes);

app.delete("/delete-customer/:customerId", async (req, res) => {
  const { customerId } = req.params;

  try {
    const deletedCustomer = await stripe.customers.del(customerId);

    if (deletedCustomer.deleted) {
      res
        .status(200)
        .json({ success: true, message: "Customer deleted successfully" });
    } else {
      res.status(404).json({ success: false, message: "Customer not found" });
    }
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ success: false, message: "Error deleting customer" });
  }
});

app.get("/search-customers", async (req, res) => {
  const { name, id } = req.query;

  try {
    const allCustomers = await stripe.customers.list();
    const filteredCustomers = allCustomers.data.filter((customer) => {
      return customer.name === name && customer.id === id;
    });

    res.status(200).json({ success: true, customers: filteredCustomers });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ success: false, message: "Error searching customers" });
  }
});

// app.get("/check-balance", async (req, res) => {
//   try {
//     const balance = await stripe.balance.retrieve();
//     res.status(200).json({ success: true, balance });
//   } catch (error) {
//     console.error(error);
//     if (error.type === "StripeInvalidRequestError") {
//       res.json({ success: false, message: "Invalid request to Stripe API" });
//     } else if (error.type === "StripeAuthenticationError") {
//       res.json({
//         success: false,
//         message: "Authentication with Stripe failed",
//       });
//     } else if (error.type === "StripePermissionError") {
//       res.json({ success: false, message: "Permission error with Stripe API" });
//     } else if (error.type === "StripeRateLimitError") {
//       res.json({
//         success: false,
//         message: "Rate limit exceeded with Stripe API",
//       });
//     } else {
//       res.json({ success: false, message: "Error retrieving balance" });
//     }
//   }
// });

app.listen(80, () => console.log("Running on port 80"));
