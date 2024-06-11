Educational Website Documentation
Overview
This educational website provides a platform for students and teachers to interact with educational content. It features a full user authentication system with different access levels depending on the user's role. There is also a separate admin portal for managing the overall user base and content.

Features
General Features
User authentication system
Role-based access control
Profile management
Course management
Student Features
Access to website content
Ability to edit their profile
Search for courses uploaded by teachers
Teacher Features
Access to a full list of students registered on the website
Ability to post courses
Ability to add new students
Browse the list of courses posted on the website
Edit their profile
Logout functionality
Admin Features
Separate admin portal
View list of teachers
View list of students
View list of courses
Ability to add or delete users
User Roles and Permissions
Students
Access: Website content
Actions:
Edit profile
Search courses
View course details
Teachers
Access: List of students, courses
Actions:
Post new courses
Add new students
Edit profile
Logout
Admins
Access: Admin portal, list of teachers, students, courses
Actions:
Add users
Delete users
View detailed user and course information
Technical Details
User Authentication System
Registration: Users can register with their email, name, and role (student, teacher).
Login: Users authenticate using their email and password.
Role Management: Different roles (student, teacher, admin) have different permissions.
JWT: JSON Web Tokens (JWT) are used for maintaining user sessions.
Profile Management
Edit Profile: Users (students and teachers) can update their profile information, including name, email, and password.
Course Management
Add Course (Teachers): Teachers can upload new courses, including title, description, content, files, and images.
Browse Courses (Students and Teachers): All users can browse and search for courses.
Admin Portal
Access Control: Only admins can access the admin portal.
User Management: Admins can view, add, and delete users (students and teachers).
Course Management: Admins can view all courses uploaded by teachers.
Running the Application
To run both the student and admin applications simultaneously, different ports should be used.

Step 1: Change Port for Admin Application
In the server.js of the admin application, set a different port:

javascript
Copy code
const express = require('express');
const app = express();
const PORT = process.env.PORT || 5001;

app.listen(PORT, () => console.log(`Admin app running on port ${PORT}`));
Step 2: Start Both Servers
Start Student Application:

bash
Copy code
cd student-app
npm start
Start Admin Application:

bash
Copy code
cd admin-app
npm start
Step 3: Update API Endpoints
Ensure API endpoints in the frontend are pointing to the correct ports.

Running Concurrently
You can use concurrently to run both applications with a single command.

Install concurrently:

bash
Copy code
npm install concurrently --save-dev
Update package.json:

json
Copy code
"scripts": {
  "start": "concurrently \"npm run start-student\" \"npm run start-admin\"",
  "start-student": "cd student-app && npm start",
  "start-admin": "cd admin-app && npm start"
}
Start both servers:

bash
Copy code
npm start