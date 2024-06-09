import React, { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/authContext';
import { useNavigate, Link } from 'react-router-dom';

import { TextField, Button, Container, Typography, Box, Alert } from '@mui/material';

const AddCourseForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [content, setContent] = useState('');
  const [files, setFiles] = useState([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const { user } = useContext(AuthContext);
  const navigate = useNavigate(); 


  const handleFileChange = (e) => {
    setFiles(e.target.files);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('content', content);
    formData.append('createdBy', user._id);

    for (let file of files) {
      formData.append('files', file);
    }

    try {
      await axios.post('http://localhost:5000/api/users/courses', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setSuccess('Course uploaded successfully!');
      setError('');
      // Clear form
      setTitle('');
      setDescription('');
      setContent('');
      setFiles([]);
    } catch (error) {
      console.error('Error adding course', error);
      setError(error.response?.data?.message || 'Something went wrong');
      setSuccess('');
    }
  };

  const handleTeacherHomeRedirect = () => {
    navigate('/teacher-dashboard');
  };


  return (
    <Container maxWidth="sm">
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Add Course
        </Typography>
        {error && <Alert severity="error">{error}</Alert>}
        {success && <Alert severity="success">{success}</Alert>}
        <TextField
          fullWidth
          label="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          margin="normal"
          required
        />
        <TextField
          fullWidth
          label="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          margin="normal"
          required
        />
        <TextField
          fullWidth
          label="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          margin="normal"
          multiline
          rows={4}
          required
        />
        <Button
          variant="contained"
          component="label"
          fullWidth
          sx={{ mt: 2, mb: 2 }}
        >
          Upload Files
          <input
            type="file"
            multiple
            hidden
            onChange={handleFileChange}
          />
        </Button>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
        >
          Add Course
        </Button>
      </Box>
      <Button variant="primary" onClick={handleTeacherHomeRedirect} className='me-2'>Go to home page </Button>

    </Container>
  );
};

export default AddCourseForm;
