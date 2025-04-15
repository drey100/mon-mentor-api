// controllers/sessionController.js
const Session = require('../models/Session');

// Créer une nouvelle session
const createSession = async (req, res) => {
  try {
    const { mentor, mentee, date, duration, topic } = req.body;

    const newSession = new Session({
      mentor,
      mentee,
      date,
      duration,
      topic,
    });

    await newSession.save();
    res.status(201).json({ message: 'Session créée', session: newSession });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la création de la session' });
  }
};

// Obtenir toutes les sessions d’un utilisateur (mentor ou mentee)
const getUserSessions = async (req, res) => {
  try {
    const userId = req.params.id;

    const sessions = await Session.find({
      $or: [{ mentor: userId }, { mentee: userId }]
    }).populate('mentor mentee', 'name email');

    res.status(200).json(sessions);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération des sessions' });
  }
};

// Mettre à jour le statut d’une session (confirmée, complétée, annulée)
const updateSessionStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const session = await Session.findById(req.params.id);

    if (!session) return res.status(404).json({ message: 'Session non trouvée' });

    session.status = status;
    await session.save();

    res.status(200).json({ message: 'Statut mis à jour', session });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la mise à jour' });
  }
};

// Supprimer une session
const deleteSession = async (req, res) => {
  try {
    const deleted = await Session.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Session non trouvée' });

    res.status(200).json({ message: 'Session supprimée avec succès' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la suppression' });
  }
};

module.exports = {
  createSession,
  getUserSessions,
  updateSessionStatus,
  deleteSession
};
