import express from "express";
// import rateLimit from "express-rate-limit";
import BalanceRoutes from "../Balance/routes";
import CustomerRoutes from "../Customer/routes";
import PaymentIntentRoutes from "../Payment_Intent/routes";
import PaymentMethodRoutes from "../Payment_Method/routes";
import CheckoutSessionRoutes from "../Checkout_Session/routes";
import PricesRoutes from "../Prices/routes";
import ProductRoutes from "../Product/routes";

// const limiter = rateLimit({
//   windowMs: 15 * 60 * 1000,
//   max: 100,
//   message: "Too many requests.",
// });

const app = express();
app.use(express.json());
app.use(express.static("public"));
// app.use(limiter);

app.use("/balance", BalanceRoutes);
app.use("/product", ProductRoutes);
app.use("/price", PricesRoutes);
app.use("/customer", CustomerRoutes);
app.use("/payment-intent", PaymentIntentRoutes);
app.use("/payment-method", PaymentMethodRoutes);
app.use("/checkout", CheckoutSessionRoutes);

app.listen(80, () => console.log("Running on port 80"));
