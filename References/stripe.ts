import dotenv from "dotenv";
import path from "path";

export const stripe = () => {
  dotenv.config({
    path: path.resolve(__dirname, "../", ".env"),
  });

  const API_KEY = process.env.API_KEY;

  const config = require("stripe")(API_KEY);

  return config;
};
