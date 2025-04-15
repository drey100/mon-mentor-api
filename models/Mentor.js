const mongoose = require('mongoose');

const mentorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  bio: String,
  expertise: [String], // ex: ["Développement Web", "RH"]
  experience: String,
  availability: [String], // ex: ["Lundi 10h-12h", "Jeudi 14h-16h"]
  ratings: [Number], // pour stocker les étoiles
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Mentor', mentorSchema);
