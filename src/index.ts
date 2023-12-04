import express, { Request, Response } from "express";
import { handleErrorResponse } from "../utils";
import path from "path";
import dotenv from "dotenv";
dotenv.config({
  path: path.resolve(__dirname, "../", ".env"),
});

const API_KEY = process.env.API_KEY;

const stripe = require("stripe")(API_KEY);
const app = express();
app.use(express.json());
app.use(express.static("public"));

app.post("/create-customer", async (req: Request, res: Response) => {
  const { description } = req.body;

  try {
    if (!description) {
      throw new Error("Description is required.");
    }
    const customer = await stripe.customers.create({
      description,
    });

    const successMessage = "Customer created successfully";
    res.json({
      msg: successMessage,
      data: customer,
    });
  } catch (error) {
    handleErrorResponse(res, error);
  }
});

app.listen(80, () => console.log("Running on port 80"));
