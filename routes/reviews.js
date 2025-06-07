const express = require('express');
const router = express.Router();
const Review = require('../models/Review');
const Book = require('../models/Book');
const { authenticate } = require('../middleware/auth');


//POST /books/:id/reviews – Submit a review (Authenticated users only, one review per user per book)
router.post('/:id/reviews', authenticate, async (req, res) => {
  try {
    const{rating,comment}=req.body;
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ message: 'Book not found' });

    const existingReview = await Review.findOne({
      bookId: req.params.id,
      userId: req.user.userId,
    });
    if (existingReview) {
      return res.status(400).json({ message: 'You have already reviewed this book' });
    }

    const review = new Review({
      bookId: req.params.id,
      userId: req.user.userId,
      rating,comment
    });
    await review.save();

    // Update book's average rating
    const reviews = await Review.find({ bookId: req.params.id });
    const avgRating = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;
    book.averageRating = avgRating;
    await book.save();

    res.status(201).json(review);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});


//PUT /reviews/:id – Update your own review
router.put('/:id', authenticate, async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    if (!review) return res.status(404).json({ message: 'Review not found' });
    if (review.userId.toString() !== req.user.userId) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    Object.assign(review, req.body);
    await review.save();

    // Update book's average rating
    const reviews = await Review.find({ bookId: review.bookId });
    const book = await Book.findById(review.bookId);
    book.averageRating = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;
    await book.save();

    res.json(review);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});


//DELETE /reviews/:id – Delete your own review
router.delete('/:id', authenticate, async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    if (!review) return res.status(404).json({ message: 'Review not found' });
    if (review.userId.toString() !== req.user.userId) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    await review.deleteOne();

    const reviews = await Review.find({ bookId: review.bookId });
    const book = await Book.findById(review.bookId);
    book.averageRating = reviews.length ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length : 0;
    await book.save();

    res.json({ message: 'Review deleted' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;