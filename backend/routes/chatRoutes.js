import express from 'express';
import { protect } from '../middlewares/authMiddleware.js';
import { createChatRoom } from '../controllers/chatController.js';

const router = express.Router();

router.post('/createRoom', protect, createChatRoom)

export default router;