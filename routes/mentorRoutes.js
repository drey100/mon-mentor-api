const express = require("express");
const router = express.Router();
const {
  getMentors, 
  getMentorById, 
  updateMentorProfile, 
  deleteMentor,
  createSession, 
  getSessionsByMentor,
  bookSession, 
  cancelSession,
} = require("../controllers/mentorController");

const auth = require("../middleware/auth");
const checkRole = require("../middleware/checkRole");

//  Obtenir tous les mentors (accessible à tous, même non connecté)
router.get("/", getMentors);

//  Obtenir un mentor par ID (accessible à tous)
router.get("/:id", getMentorById);

//  Mettre à jour le profil d'un mentor (auth + rôle mentor)
router.put("/:id", auth, checkRole("mentor"), updateMentorProfile);

//  Supprimer un mentor (auth + rôle mentor)
router.delete("/:id", auth, checkRole("mentor"), deleteMentor);

//  Créer une session (auth + rôle mentor)
router.post("/:mentorId/sessions", auth, checkRole("mentor"), createSession);

//  Obtenir les sessions d’un mentor (auth + rôle mentor)
router.get("/:mentorId/sessions", auth, checkRole("mentor"), getSessionsByMentor);

//  Réserver une session (auth + rôle user = mentoré)
router.post("/:mentorId/sessions/book", auth, checkRole("user"), bookSession);

//  Annuler une session (auth + rôle user = mentoré)
router.delete("/:mentorId/sessions/:sessionId", auth, checkRole("user"), cancelSession);

module.exports = router;
