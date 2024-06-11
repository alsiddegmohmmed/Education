import React, { useState } from 'react';
import axios from 'axios';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, Select, MenuItem, FormControl, InputLabel, Alert } from '@mui/material';

const ModalForm = ({ show, handleClose, handleSubmit }) => {
  const [formStatus, setFormStatus] = useState({ success: null, message: '' });

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      password: formData.get('password'),
      role: formData.get('role'),
    };

    console.log('Form data:', data); // Log the data being sent

    try {
      const response = await axios.post('/api/addUsers', data);
      handleSubmit(response.data);
      setFormStatus({ success: true, message: 'User created successfully!' });
    } catch (error) {
      console.error('Error adding user:', error);
      setFormStatus({ success: false, message: 'Error adding user. Please try again.' });
    }
  };

  return (
    <Dialog open={show} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>Add New User</DialogTitle>
      <form onSubmit={handleFormSubmit}>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            name="name"
            label="Name"
            type="text"
            fullWidth
            variant="outlined"
            required
          />
          <TextField
            margin="dense"
            id="email"
            name="email"
            label="Email"
            type="email"
            fullWidth
            variant="outlined"
            required
          />
          <TextField
            margin="dense"
            id="password"
            name="password"
            label="Password"
            type="password"
            fullWidth
            variant="outlined"
            required
          />
          <FormControl fullWidth variant="outlined" margin="dense" required>
            <InputLabel id="role-label">Role</InputLabel>
            <Select
              labelId="role-label"
              id="role"
              name="role"
              label="Role"
              defaultValue=""
            >
              <MenuItem value="student">Student</MenuItem>
              <MenuItem value="teacher">Teacher</MenuItem>
            </Select>
          </FormControl>
          {formStatus.message && (
            <Alert severity={formStatus.success ? "success" : "error"}>{formStatus.message}</Alert>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">Cancel</Button>
          <Button type="submit" color="primary">Submit</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default ModalForm;
