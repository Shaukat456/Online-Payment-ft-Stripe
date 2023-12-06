import { Response, Request } from "express";
import dotenv from "dotenv";
import path from "path";
import { handleErrorResponse } from "../utils";

dotenv.config({
  path: path.resolve(__dirname, "../", ".env"),
});

const API_KEY = process.env.API_KEY;

const stripe = require("stripe")(API_KEY);
