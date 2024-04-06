const express = require('express');
const jwt = require('jsonwebtoken');
const session = require('express-session');
const customer_routes = require('./router/auth_users.js').authenticated;
const genl_routes = require('./router/general.js').general;

const app = express();

app.use(express.json());

app.use("/customer", session({
  secret: "fingerprint_customer",
  resave: true,
  saveUninitialized: true
}));

// Authentication middleware
app.use("/customer/auth/*", function auth(req, res, next) {
  // Check if the session and the session's accessToken exist
  if (req.session && req.session.accessToken) {
    try {
      // Verify the accessToken from the session
      const decoded = jwt.verify(req.session.accessToken, 'YourSecretKeyHere');
      // You can add more logic here if you want to check something in the decoded token
      next(); // Token is valid, proceed to the next middleware
    } catch (err) {
      // Token verification failed
      return res.status(401).send("Unauthorized: Invalid token");
    }
  } else {
    // No token found in session
    return res.status(403).send("Access denied: No token provided");
  }
});

const PORT = 8000;

app.use("/customer", customer_routes);
app.use("/", genl_routes);

app.listen(PORT, () => console.log("Server is running"));
