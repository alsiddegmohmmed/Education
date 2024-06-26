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
    updateTeacher,
    deleteUser,
    createUser,
    getStudents,
    addCourse,
    getCourseTitles,
    updateTeacherProfile,
    searchCourses,
} from "../controllers/userController.js";

import { protect, teacher } from "../middleware/authMiddleware.js";
import User from "../models/userModel.js";
import Course from '../models/coursesModel.js';
import multer from 'multer';
import asyncHandler from 'express-async-handler';


const upload = multer({ dest: 'uploads/' }); // Configure multer for file uploads

router.post('/', registerUser);
router.post('/auth', authUser);
router.post('/logout', logoutUser);
router.route('/profile')
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);

router.route('/teacher/profile')
  .get(protect, getUserProfile)
  .put(protect, updateTeacherProfile);

router.route('/teacher-dashboard')
  .get(protect, teacher, (req, res) => res.send('Teacher Dashboard'));

router.route('/')
    .get(protect, teacher, getUsers)  // Changed from admin to teacher
    .post(protect, teacher, createUser); // Changed from admin to teacher
router.route('/students')
    .get( getStudents); 
// router.route('/:id').put(protect, teacher, updateUser) ;
router.route('/:id').delete(protect, deleteUser).put(protect, updateUser);

router.route('/courses').post(upload.fields([{ name: 'files' }, { name: 'images' }]), addCourse);


router.get('/getcoursetitles', getCourseTitles);

router.get('/courses/search', async (req, res) => {
  try {
    const { query } = req.query;
    console.log(`Searching for courses with query: ${query}`); // Debugging log
    const courses = await Course.find({
      title: { $regex: query, $options: 'i' }  // case-insensitive search
    });
    res.json(courses);
  } catch (error) {
    console.error('Error while searching courses:', error); // Detailed error log
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
});





export default router; 