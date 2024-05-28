import React from 'react'
import '/src/components/Signup/signup.css'
import { useTranslation } from 'react-i18next'
import { Link as RouterLink } from 'react-router-dom'; // Import Link from react-router-dom
import { useState } from 'react';
import axios from 'axios';




const SignupPage = () => {
    const [t] = useTranslation();
    const [formData, setFormData] = useState({
      firstName: '',
      lastName: '',
      email: '',
      password: '',
    });
  
    const handleChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const response = await axios.post('http://localhost:5000/api/signup', formData);
        console.log(response.data);
      } catch (error) {
        console.error('Error signing up', error);
      }
    };
  
  return (
    <>
   <li>
          <RouterLink to="/">Go back to Home page</RouterLink> 
        </li>
    <div className='signup'>
        <div className="signup-col">
            <h3>  Sign up and join our family  <img src="/msg-icon.png" alt="" /> </h3>
            <p>{t("contact.contact-p")}
            </p>
            <ul>
                <li><img src="/mail-icon.png" alt="" />siddegx@gmail.com</li>
                <li><img src="/phone-icon.png" alt="" />+974 6004041</li>
                <li><img src="/location-icon.png" alt="" />{t("contact.contact-city")} <br /> {t("contact.contact-country")} </li>
            </ul>
        </div>
        <div className="signup-col">
        
        <form onSubmit={handleSubmit}>
      <label>{t('signup.firstName')}</label>
      <input type="text" name="firstName" placeholder={t('signup.enterFirstName')} required onChange={handleChange} />
      <label>{t('signup.lastName')}</label>
      <input type="text" name="lastName" placeholder={t('signup.enterLastName')} required onChange={handleChange} />
      <label>{t('signup.email')}</label>
      <input type="email" name="email" placeholder={t('signup.enterEmail')} required onChange={handleChange} />
      <label>{t('signup.password')}</label>
      <input type="password" name="password" placeholder={t('signup.enterPassword')} required onChange={handleChange} />
      <button type="submit" className="btn dark-btn">
        {t('signup.submit')} <img src="/white-arrow.png" alt="Submit" />
      </button>
    </form>
           
        </div>

    </div>
    </>
  )
}


export default SignupPage ; 