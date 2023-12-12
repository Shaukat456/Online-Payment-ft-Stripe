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

  let response;

  try {
    const productId = await createProduct(product_name, available);
    console.log("product created ");
    try {
      const priceId = await createPrice({
        product: productId,
        currency: "usd",
        unit_amount: 2000,
      });
      console.log("Price Created ");

      try {
        const paymentLink = await createPaymentLink({
          priceId,
          quantity: product_quantity,
        });

        console.log("Payment Link Created");
        response = {
          msg: "success ",
          paymentLink,
        };
      } catch (error) {
        response = {
          msg: "Error",
          error,
        };
        console.log(error);
      }
    } catch (error) {
      console.log(error);
      response = {
        msg: "Error",
        error,
      };
    }
  } catch (error) {
    response = {
      msg: "Error",
      error,
    };
  } finally {
    res.send(response);
  }
};
