import asyncHandler from 'express-async-handler';
import Student from '../models/studentModel.js';

// @desc    Get all students
// @route   GET /api/students
// @access  Private/Teacher
const getStudents = asyncHandler(async (req, res) => {
    const students = await Student.find({});
    res.json(students);
});

// @desc    Add a student
// @route   POST /api/students
// @access  Private/Teacher
const addStudent = asyncHandler(async (req, res) => {
    const { name, email } = req.body;
    const student = new Student({
        name,
        email,
    });
    const createdStudent = await student.save();
    res.status(201).json(createdStudent);
});

// @desc    Update a student
// @route   PUT /api/students/:id
// @access  Private/Teacher
const updateStudent = asyncHandler(async (req, res) => {
    const { name, email } = req.body;
    const student = await Student.findById(req.params.id);

    if (student) {
        student.name = name;
        student.email = email;

        const updatedStudent = await student.save();
        res.json(updatedStudent);
    } else {
        res.status(404);
        throw new Error('Student not found');
    }
});

// @desc    Delete a student
// @route   DELETE /api/students/:id
// @access  Private/Teacher
const deleteStudent = asyncHandler(async (req, res) => {
    const student = await Student.findById(req.params.id);

    if (student) {
        await student.remove();
        res.json({ message: 'Student removed' });
    } else {
        res.status(404);
        throw new Error('Student not found');
    }
});

export { getStudents, addStudent, updateStudent, deleteStudent };

