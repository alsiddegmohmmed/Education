import React from 'react';
import axios from 'axios';
import './ModalForm.css';

const ModalForm = ({ show, handleClose, handleSubmit }) => {
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      role: formData.get('role'),
      password: formData.get('password'), 
    };
    
    try {
      const response = await axios.post('/api/users', data);
      handleSubmit(response.data);
    } catch (error) {
      console.error('Error adding user:', error);
    }
  };

  return (
    <div className={`modal ${show ? 'show' : ''}`} onClick={handleClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <span className="closeBtn" onClick={handleClose}>&times;</span>
        <h2>Add New User</h2>
        <form onSubmit={handleFormSubmit}>
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" name="name" required />
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" required />
          <label htmlFor="text">Password:</label>
          <input type="text" id="password" name="password" required />
          <label htmlFor="role">Role:</label>
          <input type="text" id="role" name="role" />
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default ModalForm;
