import express from 'express';
import { protect } from '../middlewares/authMiddleware.js';
import { createOneOnOneChat } from '../controllers/chatController.js';

const router = express.Router();

router.post('/createRoom', protect, createOneOnOneChat)

export default router;