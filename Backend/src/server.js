import express from "express";
import { ENV } from "./config/env.js";
import { connectDB } from "./config/db.js";
import { functions, inngest } from "./config/inngest.js";
import { serve } from "inngest/express";

const app = express();
app.use(express.json());
// app.use(cors({ origin: process.env.CLIENT_URL }));
app.use("/api/inngest", serve({ client: inngest, functions }));

const startServer = async () => {
  try {
    await connectDB(); // now connects to Neon

    app.listen(ENV.PORT, () => {
      console.log("Server running on port", ENV.PORT);
    });
  } catch (error) {
    console.error("Error starting server", error);
    process.exit(1);
  }
};

startServer();

export default app;
