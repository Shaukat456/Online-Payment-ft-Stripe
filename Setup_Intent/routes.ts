import express from "express";
import { createSetupIntents } from "./controller";

const router = express.Router();

router.post("/create-setup-intent", createSetupIntents);

export default router;
