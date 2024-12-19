const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  movieId: { type: String, required: true },
  movieName: { type: String, required: true },
  posterPath: { type: String, required: true },
  content: { type: String, required: true },
  rating: { type: Number, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Relación con el modelo de usuario
});

const Review = mongoose.model("Review", reviewSchema);

module.exports = Review;