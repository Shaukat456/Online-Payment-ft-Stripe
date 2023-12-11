import { Response, Request } from "express";
import dotenv from "dotenv";
import path from "path";
import { handleErrorResponse } from "../utils";
import { stripeConfig } from "../References/stripe";

let stripe = stripeConfig();
type PaymentModeType = "payment" | "setup" | "subscription";

type checkoutSessionType = {
  priceID: string;
  quantity: number;
  mode: PaymentModeType;
};

export async function createCheckoutSession(req: Request, res: Response) {
  const {
    priceID,
    quantity,
    mode = "payment",
  } = req.body as checkoutSessionType;

  try {
    const session = await stripe.checkout.sessions.create({
      success_url: "https://example.com/success",
      line_items: [
        {
          price: priceID || "price_1OM7jnJHWmuzyaR07zKI7ubN",
          quantity: quantity | 1,
        },
      ],
      mode: mode as PaymentModeType | "payment",
    });
    res
      .status(200)
      .json({ msg: "Session Created Successfully", Session: session });
  } catch (error) {
    console.error("Error creating payment method:", error);
    res
      .status(500)
      .json({ msg: "Error creating checkout session", error: error });
  }
}
