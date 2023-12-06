import { Response, Request } from "express";
import dotenv from "dotenv";
import path from "path";

dotenv.config({
  path: path.resolve(__dirname, "../", ".env"),
});

const API_KEY = process.env.API_KEY;

const stripe = require("stripe")(API_KEY);
export async function customersList(req: Request, res: Response) {
  const limit = req.query.limit || 10;
  const customers = await stripe.customers.list({
    limit,
  });
  console.log(customers.data);
  return res.send({
    data: customers.data[0],
  });
}
