import { Response, Request } from "express";
import dotenv from "dotenv";
import path from "path";
import { handleErrorResponse } from "../utils";

dotenv.config({
  path: path.resolve(__dirname, "../", ".env"),
});

const API_KEY = process.env.API_KEY;

const stripe = require("stripe")(API_KEY);

export async function createSetupIntents(req: Request, res: Response) {
  const { amount, currency, payment_method_types } = req.body;

  try {
    const setupIntent = await stripe.setupIntents.create({
      payment_method_types: ["card"],
    });
    res.status(200).json({ clientSecret: setupIntent.client_secret });
  } catch (error) {
    console.error("Error creating payment intent:", error);
    handleErrorResponse(res, error);
    res.status(500).json({ error: "Error creating payment intent" });
  }
}
