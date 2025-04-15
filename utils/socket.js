// socket.js
const messageSocket = (io) => {
    io.on('connection', (socket) => {
      console.log('Un utilisateur est connecté à Socket.IO');
  
      socket.on('send_message', (messageData) => {
        // Logique pour gérer l'envoi de messages
        console.log('Message reçu:', messageData);
        // Par exemple, on peut diffuser le message à tous les clients connectés
        io.emit('new_message', messageData);
      });
  
      socket.on('disconnect', () => {
        console.log('Un utilisateur a quitté la connexion');
      });
    });
  };
  
  module.exports = { initializeSocket: messageSocket };
  