import express from "express"; 
const router = express.Router();

import { 
    authUser,
    registerUser,
    logoutUser, 
    getUserProfile,
    updateUserProfile,
    getUsers,
    updateUser,
    deleteUser,
    createUser
} from "../controllers/userController.js";

import { protect, teacher } from "../middleware/authMiddleware.js";

router.post('/home', registerUser);
router.post('/auth', authUser);
router.post('/logout', logoutUser);

router.route('/profile')
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);

router.route('/teacher-dashboard')
  .get(protect, teacher, (req, res) => res.send('Teacher Dashboard'));

router.route('/')
    .get(protect, teacher, getUsers)  // Changed from admin to teacher
    .post(protect, teacher, createUser); // Changed from admin to teacher

router.route('/:id')
    .put(protect, teacher, updateUser)  // Changed from admin to teacher
    .delete(protect, teacher, deleteUser);  // Changed from admin to teacher

export default router; 