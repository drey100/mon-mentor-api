const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(" MongoDB connecté avec succès !");
  } catch (error) {
    console.error("Erreur de connexion à MongoDB :", error);
    process.exit(1); // Quitte l'application en cas d'erreur
  }
};

module.exports = connectDB;
