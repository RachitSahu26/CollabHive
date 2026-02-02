import express from "express";
// import cors from "cors";
import { ENV } from "./config/env.js";
import { connectDB } from "./config/db.js";



const app = express();

// app.use(cors({ origin: process.env.CLIENT_URL }));

app.listen(ENV.PORT, () =>{
console.log('Server running on port',ENV.PORT)
    connectDB()
}
  
);