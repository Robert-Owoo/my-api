// Import required modules
const express = require('express');
const app = express();
const PORT = 5000;

// Middleware
app.use(express.json()); // Parse JSON requests
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

// Sample data
let books = [
    { id: "1", title: "Node.js Essentials", author: "John Doe", year: 2021 },
    { id: "2", title: "Express.js Guide", author: "Jane Smith", year: 2020 }
];

// GET all books
app.get('/books', (req, res) => {
    res.json(books);
});

// GET a book by ID
app.get('/books/:id', (req, res) => {
    const book = books.find(b => b.id === req.params.id);
    if (!book) return res.status(404).json({ message: "Book not found" });
    res.json(book);
});

// POST a new book
app.post('/books', (req, res) => {
    const { id, title, author, year } = req.body;
    if (!id || !title || !author || !year) {
        return res.status(400).json({ message: "All fields are required" });
    }
    books.push({ id, title, author, year });
    res.status(201).json({ message: "Book added successfully" });
});

// PUT (Update a book)
app.put('/books/:id', (req, res) => {
    const book = books.find(b => b.id === req.params.id);
    if (!book) return res.status(404).json({ message: "Book not found" });
    
    const { title, author, year } = req.body;
    if (!title || !author || !year) {
        return res.status(400).json({ message: "All fields are required" });
    }
    
    book.title = title;
    book.author = author;
    book.year = year;
    res.json({ message: "Book updated successfully" });
});

// DELETE a book
app.delete('/books/:id', (req, res) => {
    books = books.filter(b => b.id !== req.params.id);
    res.json({ message: "Book deleted successfully" });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
