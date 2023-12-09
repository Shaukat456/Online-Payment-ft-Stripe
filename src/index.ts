import express, { Request, Response } from "express";
import { handleErrorResponse } from "../utils";
import path from "path";
import dotenv from "dotenv";
import rateLimit from "express-rate-limit";
import BalanceRoutes from "../Balance/routes";
import CustomerRoutes from "../Customer/routes";
import PaymentIntentRoutes from "../Payment_Intent/routes";
import PaymentMethodRoutes from "../Payment_Method/routes";
import Stripe from "stripe";

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: "Too many requests.",
});

const app = express();
app.use(express.json());
app.use(express.static("public"));
app.use(limiter);

app.use("/balance", BalanceRoutes);
app.use("/customer", CustomerRoutes);
app.use("/payment-intent", PaymentIntentRoutes);
app.use("/payment-method", PaymentMethodRoutes);

app.listen(80, () => console.log("Running on port 80"));
