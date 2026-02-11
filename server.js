const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger-output.json");
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const passport = require("passport"); // NEW: Added for GitHub OAuth

// Load environment variables
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());

// NEW: Initialize Passport for GitHub OAuth
app.use(passport.initialize());

//CORS added
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Z-Key, Authorization"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");

  if (req.method === "OPTIONS") return res.sendStatus(204);
  next();
});

// Database Connection - I UPDATED HERE FOR TESTING
if (process.env.NODE_ENV !== "test") {
  mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => console.log("Connected to MongoDB!"))
    .catch((err) => console.error("Could not connect to MongoDB:", err));
}

// Home Route
app.get("/", (req, res) => {
  res.send("Wellness Tracker API is running successfully!");
});

// Routes
app.use("/", require("./src/routes/index"));

// Swagger Documentation
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Export the app for testing
module.exports = app;

// Start Server only if not in test environment
if (process.env.NODE_ENV !== "test") {
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
}