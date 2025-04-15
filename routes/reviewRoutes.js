const express = require("express");
const router = express.Router();
const { addReview, getReviewsByMentor } = require("../controllers/reviewController");
const auth = require("../middleware/auth");

// Ajouter une review pour un mentor (authentifié)
router.post("/:mentorId", auth, addReview);

// Obtenir les reviews d’un mentor (publique)
router.get("/:mentorId", getReviewsByMentor);

module.exports = router;
