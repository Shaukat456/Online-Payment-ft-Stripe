import { Response, Request } from "express";
import dotenv from "dotenv";
import path from "path";
import { stripeConfig } from "../References/stripe";

const stripe = stripeConfig();
export async function checkBalance(req: Request, res: Response) {
  try {
    const balance = await stripe.balance.retrieve();
    res.status(200).json({ success: true, balance });
  } catch (error) {
    console.error(error);
    if (error.type === "StripeInvalidRequestError") {
      res.json({ success: false, message: "Invalid request to Stripe API" });
    } else if (error.type === "StripeAuthenticationError") {
      res.json({
        success: false,
        message: "Authentication with Stripe failed",
      });
    } else if (error.type === "StripePermissionError") {
      res.json({ success: false, message: "Permission error with Stripe API" });
    } else if (error.type === "StripeRateLimitError") {
      res.json({
        success: false,
        message: "Rate limit exceeded with Stripe API",
      });
    } else {
      res.json({ success: false, message: "Error retrieving balance" });
    }
  }
}
