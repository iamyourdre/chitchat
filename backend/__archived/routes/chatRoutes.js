import express from 'express';
import { protect } from '../middlewares/authMiddleware.js';
import { createChatRoom, sendChat } from '../controllers/chatController.js';

const router = express.Router();

router.post('/createRoom', protect, createChatRoom)
router.post('/send', protect, sendChat)

export default router;