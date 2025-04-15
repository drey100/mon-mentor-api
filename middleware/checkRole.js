const checkRole = (role) => {
    return (req, res, next) => {
      // Vérifier que le rôle de l'utilisateur correspond à celui requis pour la route
      if (req.user.role !== role) {
        return res.status(403).json({ message: "Accès interdit, rôle insuffisant." });
      }
      // Si les rôles correspondent, passer au prochain middleware ou contrôleur
      next();
    };
  };
  
  module.exports = checkRole;
  