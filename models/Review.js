const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  mentorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Mentor", // Référence au modèle Mentor
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Référence au modèle User
    required: true,
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5, // Note de 1 à 5
  },
  comment: {
    type: String,
    required: false,
    maxlength: 500, // Limite du commentaire
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Review", reviewSchema);
