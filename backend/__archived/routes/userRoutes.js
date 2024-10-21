import express from 'express';
import {
  loginUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
} from '../controllers/userController.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.delete('/logout', logoutUser);
router.get('/profile', protect, getUserProfile)
// router
//   .route('/profile')
//   .get(protect, getUserProfile)
//   .patch(protect, updateUserProfile);

export default router;