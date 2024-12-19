const express = require('express');
const Review = require('../models/Review');
const User = require('../models/User');
const router = express.Router();

const TMDB_API_KEY = process.env.TMDB_API_KEY; // Llave de la API de TMDB
const TMDB_BASE_URL = 'https://api.themoviedb.org/3';

// Crear una reseña asociada a un usuario
router.post("/", async (req, res) => {
  const { movieId, movieName, posterPath, content, rating, userId } = req.body;

  try {
    // Buscar el usuario por su ID
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    // Crear la reseña
    const newReview = new Review({
      movieId,
      movieName,
      posterPath,
      content,
      rating,
      user: user._id, // Relación con el usuario
    });

    // Guardar la reseña en la base de datos
    await newReview.save();
    res.status(201).json({ message: "Reseña creada con éxito", review: newReview });
  } catch (error) {
    console.error("Error al guardar la reseña:", error);
    res.status(500).json({ message: "Error al guardar la reseña", error });
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
