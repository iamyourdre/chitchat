import express from 'express';
import { protect } from '../middlewares/authMiddleware.js';
import { searchContact } from '../controllers/contactController.js';

const router = express.Router();
  
router.post('/search', protect, searchContact);

export default router;