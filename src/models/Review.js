const mongoose = require('mongoose'); // Asegúrate de que esta línea esté presente

const reviewSchema = new mongoose.Schema({
  movieId: {
    type: String,
    required: true,
  },
  movieName: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  rating: { // Calificación de la reseña
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Referencia al modelo de usuario
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Review', reviewSchema);

