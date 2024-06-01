import express from "express"; 
import path from 'path';
import dotenv from "dotenv"
dotenv.config(); 
import cookieParser from "cookie-parser";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import connectDB from "./config/db.js";
const port = process.env.PORT || 5000;  
import userRoutes from "./routes/userRoutes.js"
import studentRoutes from "./routes/studentRoutes.js"
import mongoose from "mongoose";
import User from "./models/userModel.js";

dotenv.config();

connectDB();  

const app = express(); 
app.use(express.json())
app.get('/api/getUsers', (req, res) => {
  User.find()
    .then(users => res.json(users))
    .catch(err => res.status(500).json({ error: err.message }));
});
app.use(express.urlencoded({extended: true }));  
app.use(cookieParser())
app.use('/api/users', userRoutes);
if (process.env.NODE_ENV === 'production') {
    const __dirname = path.resolve();
    app.use(express.static(path.join(__dirname, '/dist')));
  
    app.get('*', (req, res) =>
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'))
    );
  } else {
    app.get('/', (req, res) => {
      res.send('API is running....');
    });
  }
app.use(notFound); 
app.use(errorHandler); 
app.listen(port, () => console.log(`Server started on  port ${port}`));
