import { createCheckoutSession } from "./Checkout_Session/controller";
import { createPaymentLink } from "./Payment_Link/controller";
import { createPrice } from "./Prices/controller";
import { createProduct, createProductController } from "./Product/controller";
import { Request, Response } from "express";
export const stripeFlow = async (req: Request, res: Response) => {
  const { product_name, product_quantity } = req.body;
  const productId = await createProduct(product_name);
  const priceId = await createPrice({
    product_name,
    currency: "usd",
    unit_amount: 2000,
  });
  //   const sessionId = await createCheckoutSession({
  //     priceID: priceId,
  //     mode: "payment",
  //     quantity: 2,
  //   });

  const paymentLink = await createPaymentLink({
    priceId,
    quantity: product_quantity,
  });

  return res.redirect(paymentLink);
};
