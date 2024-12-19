const express = require('express');
const Review = require('../models/Review');
const User = require('../models/User');
const router = express.Router();

// Crear una reseña asociada a un usuario
router.post('/', async (req, res) => {
  const { movieId, movieName, content, userId } = req.body;

  try {
    // Validar que el usuario exista
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    // Crear la reseña asociada al usuario
    const review = new Review({ movieId, movieName, content, user: user._id });
    await review.save();

    res.status(201).json(review);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Obtener reseñas por película con información del usuario
router.get('/:movieId', async (req, res) => {
  const { movieId } = req.params;

  try {
    const reviews = await Review.find({ movieId }).populate('user', 'name email');
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
