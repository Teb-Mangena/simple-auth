import express from "express";
import { clerkWebhook } from "../controllers/clerk.controllers.js";

const router = express.Router();

router.post("/clerk/webhook", clerkWebhook)

export default router;