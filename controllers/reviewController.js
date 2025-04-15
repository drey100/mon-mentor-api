const Review = require("../models/Review");
const auth = require('../middleware/auth');  // Importer le middleware d'authentification

// Ajouter une review pour un mentor
const addReview = async (req, res) => {
  const { mentorId } = req.params;
  const { rating, comment } = req.body;
  const userId = req.user.id; // L'ID de l'utilisateur connecté, extrait du token

  try {
    // Vérifier que l'utilisateur n'a pas déjà laissé une review pour ce mentor
    const existingReview = await Review.findOne({ mentorId, userId });
    if (existingReview) {
      return res.status(400).json({ message: "Vous avez déjà laissé une review pour ce mentor." });
    }

    const newReview = new Review({
      mentorId,
      userId,
      rating,
      comment,
    });

    await newReview.save();
    res.status(201).json({ message: "Review ajoutée avec succès !" });
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de l'ajout de la review" });
  }
};

// Obtenir les reviews d'un mentor
const getReviewsByMentor = async (req, res) => {
  const { mentorId } = req.params;

  try {
    const reviews = await Review.find({ mentorId }).populate("userId", "name email").exec(); // Peupler avec les informations de l'utilisateur
    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la récupération des reviews" });
  }
};

module.exports = {
  addReview,
  getReviewsByMentor,
};
