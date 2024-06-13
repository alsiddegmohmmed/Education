import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        role: {
            type: String,
            enum: ['student', 'teacher', 'admin'],
            required: true,
        },
        phone: {
            type: String,
        },
        website: {
            type: String,
        },
        dateOfBirth: {
            type: Date,
        },
        profilePicture: {
            type: String,
        },
        biography: {
            type: String,
        },
        gender: {
            type: String,
            enum: ['male', 'female', 'other'],
        },
        subjectsTaught: {
            type: [String],
        },
        yearsOfExperience: {
            type: Number,
            min: 0,
        },
        educationLevel: {
            type: String,
            enum: ['bachelors', 'masters', 'phd', 'other'],
        },
        certifications: {
            type: String,
        },
        address: {
            type: String,
        },
        preferredLanguage: {
            type: String,
        },
      
    },
    {
        timestamps: true,
    }
);

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next();
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model('User', userSchema);

export default User;
