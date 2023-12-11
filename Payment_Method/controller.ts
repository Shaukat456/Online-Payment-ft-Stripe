import { Response, Request } from "express";
import dotenv from "dotenv";
import path from "path";

import { stripeConfig } from "../References/stripe";
import { handleErrorResponse } from "../utils";

const stripe = stripeConfig();

type CardDetailType = {
  number: string;
  exp_month: number;
  exp_year: number;
  cvc: string;
};
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
      } as CardDetailType,
    });
    res.status(200).json({ paymentMethodId: paymentMethod.id });
  } catch (error) {
    console.error("Error creating payment method:", error);
    handleErrorResponse(res, error);
    res.status(500).json({ error: "Error creating payment method" });
  }
}
