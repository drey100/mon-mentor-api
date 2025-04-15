import express from 'express';
import { sendMessage, getConversation } from '../controllers/messageController.js';

const router = express.Router();

router.post('/', sendMessage); // POST /api/messages
router.get('/:user1/:user2', getConversation); // GET /api/messages/user1/user2

export default router;
