import express from "express";
// import rateLimit from "express-rate-limit";
import BalanceRoutes from "../Balance/routes";
import CustomerRoutes from "../Customer/routes";
import PaymentIntentRoutes from "../Payment_Intent/routes";
import PaymentMethodRoutes from "../Payment_Method/routes";
import CheckoutSessionRoutes from "../Checkout_Session/routes";
import PaymentLinkRoutes from "../Payment_Link/routes";
import PricesRoutes from "../Prices/routes";
import ProductRoutes from "../Product/routes";
import FlowRoutes from "../Flow/routes";
import mongoose, { mongo } from "mongoose";
import { stripeFlow } from "../Flow/Controller";

// const limiter = rateLimit({
//   windowMs: 15 * 60 * 1000,
//   max: 100,
//   message: "Too many requests.",
// });
// app.use(limiter);

const app = express();
app.use(express.json());
app.use(express.static("public"));
async function connectToDatabase() {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/stripe");
    console.log("Connection successful");
  } catch (error) {
    console.error("Connection error:", error);
    return error;
  }
}

connectToDatabase();

app.use("/balance", BalanceRoutes);
app.use("/product", ProductRoutes);
app.use("/price", PricesRoutes);
app.use("/customer", CustomerRoutes);
app.use("/payment-intent", PaymentIntentRoutes).routes;
app.use("/payment-method", PaymentMethodRoutes);
app.use("/checkout", CheckoutSessionRoutes);
app.use("/payment-link", PaymentLinkRoutes);
app.use("/flow", FlowRoutes);

app.listen(80, () => console.log("Running on port 80"));
process.on("unhandledRejection", (reason, promise) => {
  console.error("Unhandled Rejection at:", promise, "reason:", reason);
});
