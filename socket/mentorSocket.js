// utils/socket.js ou juste socket.js
let io;

const initializeSocket = (server) => {
  const socketIO = require("socket.io")(server, {
    cors: {
      origin: "*", // à ajuster selon le frontend
      methods: ["GET", "POST"]
    }
  });

  io = socketIO;

  io.on("connection", (socket) => {
    console.log("Nouvelle connexion socket :", socket.id);

    // Rejoindre une salle privée entre 2 utilisateurs
    socket.on("joinRoom", ({ roomId }) => {
      socket.join(roomId);
    });

    // Écouter l'envoi de messages
    socket.on("sendMessage", (data) => {
      const { roomId, message } = data;
      io.to(roomId).emit("receiveMessage", message);
    });

    socket.on("disconnect", () => {
      console.log("Déconnexion socket :", socket.id);
    });
  });
};

const getIO = () => {
  if (!io) {
    throw new Error("Socket.io non initialisé !");
  }
  return io;
};

module.exports = {
  initializeSocket,
  getIO
};
