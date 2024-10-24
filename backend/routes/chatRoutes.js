import express from 'express';
import { protect } from '../middlewares/authMiddleware.js';
import { createOneOnOneRoom, findRoomById, listRoomByUser, refreshChat, sendChat } from '../controllers/chatController.js';

const router = express.Router();

router.post('/createRoom', protect, createOneOnOneRoom)
router.post('/findRoom', protect, findRoomById)
router.post('/listRoom', protect, listRoomByUser)
router.post('/send', protect, sendChat)
router.post('/refresh', protect, refreshChat)

export default router;