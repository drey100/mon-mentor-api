// controllers/mentorAuthController.js
const Mentor = require('../models/Mentor');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Inscription mentor
exports.registerMentor = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingMentor = await Mentor.findOne({ email });
    if (existingMentor) {
      return res.status(400).json({ message: 'Email déjà utilisé' });
    }

    const newMentor = new Mentor({ name, email, password });
    await newMentor.save();

    res.status(201).json({ message: 'Inscription réussie' });
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

// Connexion mentor
exports.loginMentor = async (req, res) => {
  try {
    const { email, password } = req.body;
    const mentor = await Mentor.findOne({ email });

    if (!mentor) {
      return res.status(404).json({ message: 'Mentor non trouvé' });
    }

    const isMatch = await bcrypt.compare(password, mentor.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Mot de passe incorrect' });
    }

    const token = jwt.sign({ id: mentor._id, role: 'mentor' }, 'SECRET_KEY', {
      expiresIn: '7d',
    });

    res.status(200).json({ token, mentor });
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur' });
  }
};
