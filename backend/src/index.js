import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import { rateLimit } from 'express-rate-limit'
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import path from "path";
import corsOptions from "./config/cors";
import connectMongoDB from "./config/database";

// middleware
import credentials from "./middleware/credentials";
import errorHandlerMiddleware from "./middleware/error_handler";
import authenticationMiddleware from "./middleware/authentication";

const app = express();
// default port
const PORT = process.env.PORT || 3000;

//connect to mongodb
connectMongoDB();

//---- setup middleware ----//

//allow credentials
app.use(credentials);

// CORS
app.use(cors(corsOptions));

// Application.x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }));

// Set application/json response
app.use(express.json({ limit: '10mb' }));

// Middleware for cookies
app.use(cookieParser());

app.use(authenticationMiddleware);

// Static Frontend File
// app.use(express.static(path.resolve(__dirname, '../public')))

// Default error
app.use(errorHandlerMiddleware);

// Rate limiting
if (process.env.PROJECT_MODE === 'Production') {
  const ms = 10;
  const limit = 60;
  const limiter = rateLimit({
    windowMs: ms * 60 * 1000, // 10 minutes
    limit: limit, // Limit each IP to 60 requests per `window` (here, per 10 minutes)
    message: `Too many requests, please try again later after ${ms} minutes`,
    standardHeaders: 'draft-7', // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  })

  // Apply the rate limiting middleware to all requests
  app.use(limiter)
}

// Routes
import router from "./routes/api/auth";
import heroRouter from "./routes/api/heroes"
import heroRolesRouter from "./routes/api/hero_roles"
import heroSpecialtiesRouter from "./routes/api/hero_specialties"
app.use("/api/v1", router, heroRouter, heroRolesRouter, heroSpecialtiesRouter);

// 404 Not Found
app.all("*", (req, res) => {
  res.status(404);
  req.accepts("json")
    ? res.json({ error: "404 Not Found" })
    : res.type("text").send("404 Not Found");
});


mongoose.connection.once("open", () => {
  console.log(`🍃 MongoDB is connected`);
  app.listen(PORT, () =>
    console.log(`🚀 Server ready at: http://localhost:${PORT}`)
  );
});
