"use strict";
const API_KEY = "sk_test_51OItL3JHWmuzyaR0PkOrRH7P8IfVBBvT0rbDGbNmx5MIXg5DfdZdhrA6xK1dR5ssVK3f4bTcjM2f6oBsXEIYF8u500QBnWhbMw";
const stripe = require("stripe")(API_KEY);
const express = require("express");
const app = express();
app.use(express.static("public"));
const _DOMAIN = "http://localhost:80";
app.get("/customers", (req, res) => { });
// app.get("/customers/:id", () => {
// let id =req.params.id
//   return stripe.customers
//     .retrieve(id, {
//       apiKey:
//         "sk_test_51OItL3JHWmuzyaR0PkOrRH7P8IfVBBvT0rbDGbNmx5MIXg5DfdZdhrA6xK1dR5ssVK3f4bTcjM2f6oBsXEIYF8u500QBnWhbMw",
//     })
//     .then((res) => {
//       console.log(res);
//     })
//     .catch((error) => console.log(error));
// });
// app.post("/create-checkout-session", async (req, res) => {
//   const session = await stripe.checkout.sessions.create({
//     line_items: [
//       {
//         price: "{{PRICE_ID}}",
//         quantity: 1,
//       },
//     ],
//     mode: "payment",
//     success_url: `${_DOMAIN}?success=true`,
//     cancel_url: `${_DOMAIN}?canceled=true`,
//   });
//   res.redirect(303, session.url);
// });
app.listen(80, () => console.log("Running on port 80"));
