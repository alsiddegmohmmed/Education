/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import './Navbar.css'
import { Link } from 'react-scroll';
// import logo from '/logo.png';
import { useTranslation } from 'react-i18next'


export default function Navbar() {
  
  const [sticky, setSticky] = useState('false');  
  
  const [t, i18n]  = useTranslation();

  useEffect(() =>{
    window.addEventListener('scroll', () => {
      window.scrollY > 50 ? setSticky(true) : setSticky(false);
    })
  }, []);

  const [mobileMenu, setMobileMenu]  = useState(false);
  const toggleMenu = () =>  {
   mobileMenu  ?   setMobileMenu(false) : setMobileMenu(true); 
  }

  
  return (
    <nav className={`'contianer ${sticky? 'dark-nav' : ''}`}>
      <img src="/logo.png" alt=" " className='logo' />
      <ul className={mobileMenu ? '' : 'hide-mobile-menu'  }>
        <li> <Link to='hero' smooth={true} offset={0}duration={500}>{t("Home-page.home")}</Link> </li>
        <li> <Link to='program' smooth={true} offset={-260}duration={500}>{t("Home-page.program")}</Link> </li>
        <li> <Link to='about' smooth={true} offset={-150}duration={500}>{t("Home-page.aboutUs")}</Link> </li>
        <li> <Link to='campus' smooth={true} offset={-260}duration={500}>{t("Home-page.campus")}</Link> </li>
        <li> <Link to='testimonials' smooth={true} offset={-260}duration={500}>{t("Home-page.testimonial")}</Link> </li>
        <li> <Link to='contact' smooth={true} offset={-260}duration={500} className='btn'>{t("Home-page.contactUs")}</Link></li>
        <li> <a href="src/components/signup/Signup.jsx"  className='btn'> sign up </a> </li>

      <li onClick={() => {
        i18n.changeLanguage('ar');
      }}>العربية</li>

      <li onClick={() => {
        i18n.changeLanguage('en');
      }}>English</li>
      </ul>
      <img src="/menu-icon.png" alt=""  className='menu-icon' onClick={toggleMenu}/>
    </nav>
  )
}



