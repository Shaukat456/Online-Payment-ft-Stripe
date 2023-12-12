import { Response, Request } from "express";

import { stripeConfig } from "../References/stripe";

const stripe = stripeConfig();

export async function createProductController(req: Request, res: Response) {
  try {
    const product = await stripe.products.create({
      name: "Shaukat Sohail",
    });
    res.status(200).json({ msg: "Product Created Successfully", product });
  } catch (error) {
    console.error("Error creating Product", error);
    res.status(500).json({ msg: "Error creating product", error: error });
  }
}

export async function getProductById(req: Request, res: Response) {
  try {
    const product = await stripe.products.retrieve(req.params.id as string);

    res.status(200).json({ product });
  } catch (error) {
    console.error("Error creating Product", error);
    res.status(500).json({ msg: "Error creating product", error: error });
  }
}
export async function getAllProductsController(req: Request, res: Response) {
  const limit = req.query.limit as string | number | 2;
  try {
    const products = await stripe.products.list({
      limit,
    });

    res.status(200).json({ products });
  } catch (error) {
    console.error("Error creating Product", error);
    res.status(500).json({ msg: "Error creating product", error: error });
  }
}
export async function getAllProducts(req: Request, res: Response) {
  const limit = req.query.limit as string | number | 2;
  try {
    const products = await stripe.products.list({
      limit,
    });

    res.status(200).json({ products });
  } catch (error) {
    console.error("Error creating Product", error);
    res.status(500).json({ msg: "Error creating product", error: error });
  }
}

export async function createProduct(product_name: string, available: boolean) {
  try {
    const product = await stripe.products.create({
      name: product_name,
      active: true,
    });
    return product.id;
  } catch (error) {
    console.error("Error creating Product", error);
    return { msg: "Error creating product", error: error };
  }
}
