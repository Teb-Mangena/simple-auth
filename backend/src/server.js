import express from "express";
import morgan from "morgan";
import cors from "cors";
// imports from env
import { ENV } from "./config/env.js";
import { connectDB } from "./config/db.js";
import { clerkMiddleware } from '@clerk/express';
import { serve } from "inngest/express";
import { inngest,functions } from "./lib/inngest.js";

// imports from routes
const app = express();
const { PORT } = ENV;

// middlewares
app.use(express.json());
app.use(morgan("dev"));
app.use(cors({
  origin: ENV.CLIENT_URL,
  credentials: true
}));
app.use(clerkMiddleware());


app.get("/", (req,res) => {
  res.send("Ready to work");
});

app.use("/api/inngest", serve({client:inngest,functions}));

// connect db and listen to ports
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
  });
});