const express = require('express');
const router = express.Router();
const Book = require('../models/Book');
const Review = require('../models/Review');
const { authenticate } = require('../middleware/auth');

// POST /books - Add a new book (requires user to be authenticated)
router.post('/', authenticate, async (req, res) => {
  try {
    const{title,author,genre}=req.body;
    const book = new Book({title,author,genre});
    await book.save();
    res.status(201).json(book);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//GET /books – Get all books (with pagination and optional filters by author and genre)
router.get('/', async (req, res) => {
  try {
    const {  author, genre } = req.query;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const query = {};
    if (author) query.author = new RegExp(author, 'i');
    if (genre) query.genre = new RegExp(genre, 'i');

    const books = await Book.find(query)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    const totalRecords = await Book.countDocuments(query);
    res.json({
      books,
      totalRecords,
      totalPages: Math.ceil(totalRecords / limit),
      currentPage: page,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});


//GET /search – Search books by title or author (partial and case-insensitive)
router.get('/search', async (req, res) => {
  try {
    const { q } = req.query;
    const books = await Book.find({
      $or: [
        { title: new RegExp(q, 'i') },
        { author: new RegExp(q, 'i') },
      ],
    });
    res.json(books);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//GET /books/:id – Get book details by ID, including:Average rating,Reviews (with pagination)
router.get('/:id', async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ message: 'Book not found' });

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const reviews = await Review.find({ bookId: req.params.id })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .populate('userId', 'username')
      .exec();

    const count = await Book.countDocuments({ _id:req.params.id });
    res.json({
      book,
      reviews,
      totalRecords:count,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});



module.exports = router;