const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];

const isValid = (username)=>{ //returns boolean
//write code to check is the username is valid
}

const authenticatedUser = (username,password)=>{ //returns boolean
//write code to check if username and password match the one we have in records.
}

SECRET_KEY = jwt;

// Assuming your users array structure is like [{ username, password }, ...]
regd_users.post("/login", (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username && u.password === password);
  
  if (!user) {
    return res.status(401).json({ message: "Invalid credentials" });
  }
  
  const token = jwt.sign({ username: user.username }, SECRET_KEY, { expiresIn: '1h' });
  res.json({ token });
});


regd_users.put("/auth/review/:isbn", (req, res) => {
    const { isbn } = req.params;
    const { review } = req.query; // Assuming review is passed as a query parameter
    const token = req.headers.authorization.split(" ")[1]; // Assuming token is sent as "Bearer <token>"
    
    try {
      const decoded = jwt.verify(token, SECRET_KEY);
      const username = decoded.username;
      
      // Implement logic to add or update the review based on username
      // This is a simplified example. Adjust according to your data structure
      if (!books[isbn].reviews) books[isbn].reviews = {};
      books[isbn].reviews[username] = review;
      
      res.json({ message: "Review added/updated successfully" });
    } catch (error) {
      res.status(401).json({ message: "Unauthorized" });
    }
  });

regd_users.delete("/auth/review/:isbn", (req, res) => {
const { isbn } = req.params;
const token = req.headers.authorization.split(" ")[1]; // Assuming token is sent as "Bearer <token>"

try {
    const decoded = jwt.verify(token, SECRET_KEY);
    const username = decoded.username;
    
    // Implement logic to delete the review for this user
    if (books[isbn] && books[isbn].reviews && books[isbn].reviews[username]) {
    delete books[isbn].reviews[username];
    res.json({ message: "Review deleted successfully" });
    } else {
    res.status(404).json({ message: "Review not found" });
    }
} catch (error) {
    res.status(401).json({ message: "Unauthorized" });
}
});


module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
