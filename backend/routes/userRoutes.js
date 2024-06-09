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
    createUser,
    getStudents,
} from "../controllers/userController.js";

import { protect, teacher } from "../middleware/authMiddleware.js";
import User from "../models/userModel.js";
import asyncHandler from 'express-async-handler';

router.post('/', registerUser);
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
router.route('/students')
    .get( getStudents); 
// router.route('/:id').put(protect, teacher, updateUser) ;
router.route('/:id').delete(protect, deleteUser).put(protect, updateUser);


export default router; 