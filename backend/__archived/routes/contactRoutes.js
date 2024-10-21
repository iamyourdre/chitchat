import express from 'express';
import { protect } from '../middlewares/authMiddleware.js';
import { saveContact, searchPhoneNumber, searchContact } from '../controllers/contactController.js';

const router = express.Router();
  
router.post('/search/all', protect, searchPhoneNumber);
router.post('/search/saved', protect, searchContact);
router.post('/save', protect, saveContact);

export default router;