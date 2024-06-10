import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';
import generateToken from '../utils/generateToken.js';
import Course from '../models/coursesModel.js';

// @desc Auth user/set token
// @route POST /api/users/auth
// @access Public
const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
        generateToken(res, user._id);
        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
        });
    } else {
        res.status(401);
        throw new Error('Invalid email or password');
    }
});

// @desc Register a new user
// @route POST /api/users
// @access Public
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password, role } = req.body;
    const userExists = await User.findOne({ email });

    if (userExists) {
        res.status(400);
        throw new Error('User already exists');
    }

    const user = await User.create({
        name,
        email,
        password,
        role,
    });

    if (user) {
        generateToken(res, user._id);
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
        });
    } else {
        res.status(400);
        throw new Error('Invalid user data');
    }
});

// @desc Logout user
// @route POST /api/users/logout
// @access Public
const logoutUser = asyncHandler(async (req, res) => {
    res.cookie('jwt', '', {
        httpOnly: true,
        expires: new Date(0),
    });
    res.status(200).json({ message: 'User logged out' });
});

// @desc Get user profile
// @route GET /api/users/profile
// @access Private
const getUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);

    if (user) {
        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
        });
    } else {
        res.status(404);
        throw new Error('User not found');
    }
});

// @desc Update user profile
// @route PUT /api/users/profile
// @access Private
const updateUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);

    if (user) {
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        if (req.body.password) {
            user.password = req.body.password;
        }

        const updatedUser = await user.save();
        res.status(200).json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            role: updatedUser.role,
        });
    } else {
        res.status(404);
        throw new Error('User not found');
    }
});

// @desc Get all users
// @route GET /api/users
// @access Private/Teacher
const getUsers = asyncHandler(async (req, res) => {
    const users = await User.find({});
    res.status(200).json(users);
});

const getStudents = asyncHandler(async (req, res) => {
    const students = await User.find({ role: 'student' }).sort({createdAt: -1});
    res.status(200).json(students); // Make sure to send a proper status code
});

// @desc Get all course titles
// @route GET /api/users/getcoursetitles
// @access Public
const getCourseTitles = asyncHandler(async (req, res) => {
    const courses = await Course.find({}).course.populate('createdBy').execPopulate();
    ; // Only fetch the title field
    res.status(200).json(courses);
  });
  


// @desc Create a new user
// @route POST /api/users
// @access Private/Teacher
const createUser = asyncHandler(async (req, res) => {
    const { name, email, password, role } = req.body;
    const userExists = await User.findOne({ email });

    if (userExists) {
        res.status(400);
        throw new Error('User already exists');
    }

    const user = await User.create({
        name,
        email,
        password,
        role,
    });

    if (user) {
        res.status(201).json(user);
    } else {
        res.status(400);
        throw new Error('Invalid user data');
    }
});

// @desc Update user
// @route PUT /api/users/:id
// @access Private/Teacher
const updateUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);

    if (user) {
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        user.role = req.body.role || user.role;

        const updatedUser = await user.save();
        res.status(200).json(updatedUser);
    } else {
        res.status(404);
        throw new Error('User not found');
    }
});

// @desc Delete user
// @route DELETE /api/users/:id
// @access Private/Teacher
const deleteUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);

    if (user) {
        await user.deleteOne();
        res.status(200).json({ message: 'User removed' });
    } else {
        res.status(404);
        throw new Error('User not found');
    }
});


const addCourse = asyncHandler(async (req, res) => {
    const { title, description, content, createdBy } = req.body;
    const files = req.files['files'] ? req.files['files'].map(file => file.path) : [];
    const images = req.files['images'] ? req.files['images'].map(image => image.path) : [];
  
    // Debugging logs
    console.log('Request Body:', req.body); 
    console.log('Request Files:', req.files); 
    console.log('Title:', title);
    console.log('Description:', description);
    console.log('Content:', content);
    console.log('CreatedBy:', createdBy);
  
    if (!title || !description || !content || !createdBy) {
      console.error('Missing required fields', { title, description, content, createdBy });
      return res.status(400).json({ message: 'Missing required fields' });
    }
  
    try {
      const course = new Course({
        title,
        description,
        content,
        files,
        images,
        createdBy,
      });
      await course.save();
      res.status(201).json(course);
    } catch (error) {
      console.error('Error creating course:', error);
      res.status(400).json({ message: 'Error creating course', error: error.message });
    }
  });

  export const searchCourses = asyncHandler(async (req, res) => {
    const { query } = req.query;
    try {
      const courses = await Course.find({
        $text: { $search: query }
      });
      res.status(200).json(courses);
    } catch (error) {
      res.status(500).json({ message: 'Error searching courses', error });
    }
  });


  
  
  

export {
    authUser,
    registerUser,
    logoutUser,
    getUserProfile,
    updateUserProfile,
    getUsers,
    createUser,
    updateUser,
    deleteUser,
    getStudents, 
    addCourse, 
    getCourseTitles,
    
};
