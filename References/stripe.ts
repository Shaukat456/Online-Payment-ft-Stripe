import dotenv from "dotenv";
import path from "path";

dotenv.config({
  path: path.resolve(__dirname, "../", ".env"),
});

export const stripeConfig = () => {
  const API_KEY = process.env.API_KEY;
  const config = require("stripe")(API_KEY);

  return config;
};
