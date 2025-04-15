const express = require('express');
const router = express.Router();
const {
  createSession,
  getUserSessions,
  updateSessionStatus,
  deleteSession,
} = require('../controllers/sessionController');
const auth = require('../middleware/auth'); // Pour sécuriser les routes

// Créer une session (authentifié)
router.post('/', auth, createSession);

// Récupérer toutes les sessions d’un utilisateur (authentifié)
router.get('/user/:userId', auth, getUserSessions);

// Mettre à jour le statut d’une session (authentifié)
router.put('/session/:sessionId', auth, updateSessionStatus);

// Supprimer une session (authentifié)
router.delete('/session/:sessionId', auth, deleteSession);

module.exports = router;
