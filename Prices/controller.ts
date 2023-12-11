import { Response, Request } from "express";
import dotenv from "dotenv";
import path from "path";
import { handleErrorResponse } from "../utils";
import { stripeConfig } from "../References/stripe";

const stripe = stripeConfig();

export async function createPriceController(req: Request, res: Response) {
  try {
    const price = await stripe.prices.create({
      currency: "usd",
      unit_amount: 1000,
      product_data: {
        name: "Gold Plan",
      },
    });
    res.status(200).json({ msg: "Session Created Successfully", price });
  } catch (error) {
    console.error("Error creating payment method:", error);
    res
      .status(500)
      .json({ msg: "Error creating checkout session", error: error });
  }
}
