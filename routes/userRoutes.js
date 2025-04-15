const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  getUserProfile,
  updateUserProfile,
  deleteUser,
  getUsersByRole,
} = require("../controllers/userController");

const auth = require("../middleware/auth"); // vérifie le token
const checkRole = require("../middleware/checkRole"); // vérifie le rôle

// Inscription (pas besoin d'être connecté)
router.post("/register", registerUser);

// Connexion (pas besoin d'être connecté)
router.post("/login", loginUser);

// Obtenir un profil utilisateur (authentifié + rôle "user")
router.get("/:id", auth, checkRole("user"), getUserProfile);

//  Mettre à jour un profil (authentifié + rôle "user")
router.put("/:id", auth, checkRole("user"), updateUserProfile);

// Supprimer un utilisateur (authentifié + rôle "user")
router.delete("/:id", auth, checkRole("user"), deleteUser);

// Obtenir tous les utilisateurs selon leur rôle (authentifié + rôle "user")
router.get("/role/:role", auth, checkRole("user"), getUsersByRole);

module.exports = router;

