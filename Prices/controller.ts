import { Response, Request } from "express";
import dotenv from "dotenv";
import path from "path";
import { handleErrorResponse } from "../utils";
import { stripeConfig } from "../References/stripe";

const stripe = stripeConfig();

export async function createPriceController(req: Request, res: Response) {
  const { product_name, currency, unit_amount } = req.body;
  try {
    const price = await stripe.prices.create({
      currency: "usd",
      unit_amount: 1000,
      product_data: {
        name: "random",
      },
    });
    res
      .status(200)
      .json({ msg: " Prices Created Successfully", priceID: price.id });
  } catch (error) {
    console.error("Error creating  Prices :", error);
    res.status(500).json({ msg: "Error creating Prices ", error: error });
  }
}
export async function updatePriceController(req: Request, res: Response) {
  const { product_name, currency, unit_amount, priceId } = req.body;
  try {
    const price = await stripe.prices.update(
      priceId || "price_1MoBy5LkdIwHu7ixZhnattbh",
      {
        metadata: {
          order_id: "6735",
        },
      }
    );
    res
      .status(200)
      .json({ msg: " Prices Created Successfully", priceID: price.id });
  } catch (error) {
    console.error("Error creating  Prices :", error);
    res.status(500).json({ msg: "Error creating Prices ", error: error });
  }
}

type ProductDetails = {
  product?: string;
  product_name?: string;
  currency: string;
  unit_amount: number;
};

export async function createPrice(productDetails: ProductDetails) {
  const { product, product_name, currency, unit_amount } = productDetails;
  try {
    const price = await stripe.prices.create({
      ...(product ? { product } : { product_data: { name: product_name } }),
      currency: currency || "usd",
      unit_amount: 1000 || unit_amount,
    });

    return price.id;
  } catch (error) {
    console.error("Error creating  Prices :", error);
    return {
      msg: "error creating prices",
      error: error.message,
    };
  }
}
