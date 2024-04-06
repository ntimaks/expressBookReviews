const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req, res) => {
    const { username, password } = req.body;
  
    // Check if both username and password are provided
    if (!username || !password) {
      return res.status(400).json({ message: "Username and password are required" });
    }
  
    // Check if the username already exists
    const exists = users.some(user => user.username === username);
    if (exists) {
      return res.status(409).json({ message: "Username already exists" });
    }
  
    // Register the new user
    users.push({ username, password });
    res.status(201).json({ message: "User registered successfully" });
  });
  
  

public_users.get('/', function (req, res) {
    res.status(200).send(JSON.stringify(books, null, 2));
  });
  

public_users.get('/isbn/:isbn', function (req, res) {
const bookId = req.params.isbn; // Assuming 'isbn' param is actually the book ID
const book = books[bookId];
if (!book) {
    return res.status(404).send('Book not found');
}
res.status(200).json(book);
});
  
  
  
public_users.get('/author/:author', function (req, res) {
    const author = req.params.author.toLowerCase();
    const filteredBooks = Object.values(books).filter(b => b.author.toLowerCase() === author);
    res.status(200).json(filteredBooks);
  });
  
  

  public_users.get('/title/:title', function (req, res) {
    const title = req.params.title.toLowerCase();
    const filteredBooks = Object.values(books).filter(b => b.title.toLowerCase().includes(title));
    res.status(200).json(filteredBooks);
  });
  
  

  public_users.get('/review/:isbn', function (req, res) {
    const isbn = req.params.isbn;
    // Convert the books object to an array of its values and find the book by isbn
    const book = Object.values(books).find(b => b.isbn === isbn);
    if (!book || !book.reviews) {
      return res.status(404).send('Book or reviews not found');
    }
    res.status(200).json(book.reviews);
});









  




module.exports.general = public_users;
