const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');
const connectDB = require('./config/db');
const errorHandler = require('./middleware/errorHandler');
const Message = require('./models/Message');

dotenv.config();
connectDB();

const app = express();
const server = http.createServer(app); // Serveur HTTP pour socket.io

// Configuration de socket.io avec CORS
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5000',
    methods: ['GET', 'POST']
  }
});

// Middlewares globaux
app.use(cors());
app.use(express.json());

// Routes
const authRoutes = require('./routes/authRoutes');
const messageRoutes = require('./routes/messageRoutes');
const mentorRoutes = require('./routes/mentorRoutes');
const sessionRoutes = require('./routes/sessionRoutes');
const reviewRoutes = require('./routes/reviewRoutes'); // au cas où tu veux les ajouter aussi
const userRoutes = require('./routes/userRoutes'); // pour users (mentore ou admin par exemple)

app.use('/api/auth', authRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/mentors', mentorRoutes);
app.use('/api/sessions', sessionRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/users', userRoutes);

// Route de test
app.get('/', (req, res) => {
  res.send('Bienvenue sur Mon Mentor API');
});

// Middleware pour les erreurs et routes 404
app.use((req, res, next) => {
  res.status(404).send("Désolé, cette page n'existe pas !");
});

app.use(errorHandler); // doit être tout en bas, après toutes les routes

// Initialisation de socket.io
const { initializeSocket } = require('./socket'); // ou ./utils/socket
initializeSocket(io); // Passe l’instance socket.io, pas le server ici

// Lancement du serveur
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`🚀 Serveur lancé sur le port ${PORT}`);
});
