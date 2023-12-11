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
import mysql from "mysql2";

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
app.use("/payment-link", PaymentLinkRoutes);

app.listen(80, () => console.log("Running on port 80"));

// const connection = mysql.createConnection({
//   host: "127.0.0.1",
//   user: "root",
//   password: "12345678",
//   database: "stripe",
//   port: 3306,
// });

// connection.connect(function (err) {
//   if (err) {
//     console.error("Error connecting to MySQL:", err);
//     return;
//   }
//   console.log("Connected to MySQL");
// });
