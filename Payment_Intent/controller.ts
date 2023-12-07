import { Response, Request } from "express";
import dotenv from "dotenv";
import path from "path";
import { handleErrorResponse } from "../utils";

dotenv.config({
  path: path.resolve(__dirname, "../", ".env"),
});

const API_KEY = process.env.API_KEY;

const stripe = require("stripe")(API_KEY);

type paymentIntentType = {
  amount: number;
  currency: string;
  payment_method_types?: string[];
};

export async function createPaymentIntent(req: Request, res: Response) {
  const { amount, currency, payment_method_types } =
    req.body as paymentIntentType;

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency,
    });

    res.status(200).json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error("Error creating payment intent:", error);
    handleErrorResponse(res, error);
    res.status(500).json({ error: "Error creating payment intent" });
  }
}

export async function retrievePaymentIntent(req: Request, res: Response) {
  const { paymentIntentId } = req.query;
  try {
    const paymentIntent = await stripe.paymentIntents.retrieve(
      String(paymentIntentId)
    );

    return res.status(200).json(paymentIntent);
  } catch (error) {
    console.error("Error retrieving payment intent:", error);
    handleErrorResponse(res, error);
    return res.status(500).send("Error retrieving payment intent");
  }
}
