/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import { NavDropdown, Badge } from 'react-bootstrap';
import './Navbar.css'
import { useSelector, useDispatch } from 'react-redux';
import { Link as RouterLink, useNavigate } from 'react-router-dom'; // Import Link from react-router-dom
import { Link as ScrollLink } from 'react-scroll'; // Import Link from react-scroll
// import logo from '/logo.png';
import { useTranslation } from 'react-i18next'
import { LinkContainer } from 'react-router-bootstrap';
import { useLogoutMutation } from '../../slices/usersApiSlice';
import { logout } from '../../slices/authSlice';

export default function Navbar() {
  const {userInfo} = useSelector((state) => state.auth );

  const  [logoutApiCall] = useLogoutMutation(); 
  const dispatch = useDispatch(); 
  const navigate = useNavigate(); 

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap(); 
      dispatch(logout()); 
      navigate('/')
    } catch (err) {
      console.log(err);
    }
  };

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
      { userInfo ? (
        <>
         <img src="/logo.png" alt=" " className='logo' />
      <ul className={mobileMenu ? '' : 'hide-mobile-menu'  }>
        <li> <ScrollLink to='hero' smooth={true} offset={0}duration={500}>{t("Home-page.home")}</ScrollLink> </li>
        <li> <ScrollLink to='program' smooth={true} offset={-260}duration={500}>{t("Home-page.program")}</ScrollLink> </li>
        <li> <ScrollLink to='about' smooth={true} offset={-150}duration={500}>{t("Home-page.aboutUs")}</ScrollLink> </li>
        <li> <ScrollLink to='campus' smooth={true} offset={-260}duration={500}>{t("Home-page.campus")}</ScrollLink> </li>
        <li> <ScrollLink to='testimonials' smooth={true} offset={-260}duration={500}>{t("Home-page.testimonial")}</ScrollLink> </li>
        <li> <ScrollLink to='contact' smooth={true} offset={-260}duration={500} className='btn'>{t("Home-page.contactUs")}</ScrollLink></li>
        <li>
        <NavDropdown title= {userInfo.name} id='username'>
          <LinkContainer to= 'profile' >
            <NavDropdown.Item>Profile</NavDropdown.Item>
          </LinkContainer>
          <NavDropdown.Item onClick={logoutHandler}> Logout </NavDropdown.Item>
        </NavDropdown>
        </li>
        

      <li onClick={() => {
        i18n.changeLanguage('ar');
      }}>العربية</li>

      <li onClick={() => {
        i18n.changeLanguage('en');
      }}>English</li> 
      </ul>
      <img src="/menu-icon.png" alt=""  className='menu-icon' onClick={toggleMenu}/>
        




        
        </>
      ) : (
        <> 
        <img src="/logo.png" alt=" " className='logo' />
      <ul className={mobileMenu ? '' : 'hide-mobile-menu'  }>
        <li> <ScrollLink to='hero' smooth={true} offset={0}duration={500}>{t("Home-page.home")}</ScrollLink> </li>
        <li> <ScrollLink to='program' smooth={true} offset={-260}duration={500}>{t("Home-page.program")}</ScrollLink> </li>
        <li> <ScrollLink to='about' smooth={true} offset={-150}duration={500}>{t("Home-page.aboutUs")}</ScrollLink> </li>
        <li> <ScrollLink to='campus' smooth={true} offset={-260}duration={500}>{t("Home-page.campus")}</ScrollLink> </li>
        <li> <ScrollLink to='testimonials' smooth={true} offset={-260}duration={500}>{t("Home-page.testimonial")}</ScrollLink> </li>
        <li> <ScrollLink to='contact' smooth={true} offset={-260}duration={500} className='btn'>{t("Home-page.contactUs")}</ScrollLink></li>
        <li>
          <RouterLink to="/register">Sign Up</RouterLink> {/* Use RouterLink for navigation */}
        </li>
        <li>
          <RouterLink to="/login">Sign in</RouterLink> {/* Use RouterLink for navigation */}
        </li>

      <li onClick={() => {
        i18n.changeLanguage('ar');
      }}>العربية</li>

      <li onClick={() => {
        i18n.changeLanguage('en');
      }}>English</li> 
      </ul>
      <img src="/menu-icon.png" alt=""  className='menu-icon' onClick={toggleMenu}/>
        </>
      ) }
      
    </nav>
  )
}



