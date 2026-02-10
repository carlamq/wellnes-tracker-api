const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const passport = require('passport');
const session = require('express-session');
const GitHubStrategy = require('passport-github2').Strategy;
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger-output.json");

// Load environment variables
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// 1. Session Middleware (Must be defined before Passport and Routes)
app.use(session({
    secret: process.env.SESSION_SECRET || 'wellness_tracker_secret',
    resave: false,
    saveUninitialized: true
}));

// 2. Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

// 3. GitHub Strategy Configuration
passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: process.env.CALLBACK_URL
  },
  function(accessToken, refreshToken, profile, done) {
    // In a real app, you might save the user to your DB here
    return done(null, profile);
  }
));

passport.serializeUser((user, done) => { done(null, user); });
passport.deserializeUser((user, done) => { done(null, user); });

// 4. Standard Middleware
app.use(bodyParser.json());

// CORS configuration
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

// 5. Database Connection (Skips connection if running Unit Tests)
if (process.env.NODE_ENV !== "test") {
  mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => console.log("Connected to MongoDB!"))
    .catch((err) => console.error("Could not connect to MongoDB:", err));
}

// 6. Auth Routes
app.get('/login', passport.authenticate('github', { scope: [ 'user:email' ] }));

app.get('/logout', function(req, res, next) {
    req.logout(function(err) {
        if (err) { return next(err); }
        req.session.destroy(); // Clear session on logout
        res.redirect('/');
    });
});

app.get('/github/callback', 
  passport.authenticate('github', { failureRedirect: '/api-docs' }),
  function(req, res) {
    req.session.user = req.user; // Set session user for isAuthenticated middleware
    res.redirect('/api-docs');
  }
);

// 6.1 route to confirm who is logged in
app.get("/me", (req, res) => {
  if (!req.session.user) return res.status(401).json({ message: "Not logged in" });

  res.status(200).json({
    id: req.session.user.id,
    username: req.session.user.username,
    displayName: req.session.user.displayName,
  });
});

// 7. Core Routes
app.get("/", (req, res) => {
  res.send("Wellness Tracker API is running successfully!");
});

app.use("/", require("./src/routes/index"));

// 8. Swagger Documentation
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// 9. Export the app for testing
module.exports = app;

// 10. Start Server (Only if not in test environment)
if (process.env.NODE_ENV !== "test") {
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
}