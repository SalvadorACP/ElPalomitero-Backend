const express = require('express');
const Review = require('../models/Review');
const User = require('../models/User');
const router = express.Router();

const TMDB_API_KEY = process.env.TMDB_API_KEY; // Llave de la API de TMDB
const TMDB_BASE_URL = 'https://api.themoviedb.org/3';

// Crear una reseña asociada a un usuario
router.post('/', async (req, res) => {
  const { movieId, movieName, content, rating, userId } = req.body;

  console.log('Datos recibidos en el backend:', req.body);

  try {
    if (!movieId || !movieName || !content || !rating || !userId) {
      return res.status(400).json({ error: 'Todos los campos son requeridos.' });
    }

    // Crear la reseña asociada al usuario
    const review = new Review({
      movieId,
      movieName,
      content,
      rating,
      user: userId,
    });

    await review.save();
    res.status(201).json({ message: 'Reseña guardada con éxito', review });
  } catch (error) {
    console.error('Error al guardar la reseña:', error);
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

// Obtener reseñas de un usuario con el póster de la película
router.get('/user/:userId', async (req, res) => {
  const { userId } = req.params;

  try {
    const reviews = await Review.find({ user: userId });
    res.json(reviews); // Retorna un array vacío si no hay reseñas
  } catch (error) {
    console.error('Error al obtener reseñas:', error);
    res.status(500).json({ error: 'Error al obtener reseñas.' });
  }
});

module.exports = router;
