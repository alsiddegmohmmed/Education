// src/components/Signin/SigninForm.jsx
import React, { useState } from 'react';
import axios from 'axios';
import './SigninForm.css';
import { useTranslation } from 'react-i18next';

const SigninForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { t } = useTranslation();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/signin', formData);
      console.log('User signed in:', response.data);
      // Handle successful sign-in (e.g., store user token, redirect)
    } catch (error) {
      console.error('Error signing in:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>{t('signin.email')}</label>
      <input
        type="email"
        name="email"
        placeholder={t('contact.enter-email')}
        value={formData.email}
        onChange={handleChange}
        required
      />
      <label>{t('contact.password')}</label>
      <input
        type="password"
        name="password"
        placeholder={t('contact.enter-password')}
        value={formData.password}
        onChange={handleChange}
        required
      />
      <button type="submit" className="btn dark-btn">{t('contact.sub-btn')}</button>
    </form>
  );
};

export default SigninForm;
