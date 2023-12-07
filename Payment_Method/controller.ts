import { Response, Request } from "express";
import dotenv from "dotenv";
import path from "path";
import { handleErrorResponse } from "../utils";

dotenv.config({
  path: path.resolve(__dirname, "../", ".env"),
});

const API_KEY = process.env.API_KEY;

const stripe = require("stripe")(API_KEY);

interface CardDetails {
  number: string;
  exp_month: number;
  exp_year: number;
  cvc: string;
}
export async function createPaymentMethod(req: Request, res: Response) {
  const { amount, currency, payment_method_types, cardDetails } = req.body;

  try {
    const paymentMethod = await stripe.paymentMethods.create({
      type: "card",
      card: {
        number: cardDetails.number,
        exp_month: 8,
        exp_year: 2026,
        cvc: "314",
      } as CardDetails,
    });
    res.status(200).json({ paymentMethodId: paymentMethod.id });
  } catch (error) {
    console.error("Error creating payment method:", error);

    res.status(500).json({ error: "Error creating payment method" });
  }
}
