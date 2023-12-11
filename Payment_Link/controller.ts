import { Response, Request } from "express";

import { stripeConfig } from "../References/stripe";
import { handleErrorResponse } from "../utils";

const stripe = stripeConfig();

export async function createPaymentLink(req: Request, res: Response) {
  const { priceID, quantity } = req.params;
  try {
    const paymentLink = await stripe.paymentLinks.create({
      line_items: [
        {
          price: priceID || "price_1OM7jnJHWmuzyaR07zKI7ubN",
          quantity: quantity || 1,
        },
      ],
    });

    res.status(200).json({ paymentLink: paymentLink.url });
  } catch (error) {
    console.error("Error creating payment method:", error);
    handleErrorResponse(res, error);
    res.status(500).json({ error: "Error creating payment method" });
  }
}
