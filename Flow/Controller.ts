import { createPaymentLink } from "../Payment_Link/controller";
import { createPrice } from "../Prices/controller";
import { createProduct } from "../Product/controller";
import { Request, Response } from "express";

export const stripeFlow = async (req: Request, res: Response) => {
  console.log("function called");
  const {
    product_name = "flowProduct",
    product_quantity = 3,
    available,
  } = req.body;

  try {
    const productId = await createProduct(product_name, available);
    try {
      const priceId = await createPrice({
        product: productId,
        currency: "usd",
        unit_amount: 2000,
      });

      try {
        const paymentLink = await createPaymentLink({
          priceId,
          quantity: product_quantity,
        });

        res.send({
          msg: "payment link",
          paymentLink: paymentLink,
        });
      } catch (error) {
        console.log(error);
      }
    } catch (error) {
      console.log(error);
    }
  } catch (error) {
    return error;
  } finally {
    console.log("finally");
  }
};
