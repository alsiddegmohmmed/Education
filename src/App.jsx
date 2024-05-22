import React from 'react'
import Navbar from './components/navbar/Navbar.jsx'
import Hero from './components/hero/Hero.jsx';
import { Programs } from './components/programs/Programs.jsx';
import { Title } from './components/title/Title.jsx';
import { About } from './components/about/About.jsx';
import { Campus } from './components/campus/Campus.jsx';
import { Testimonials } from './components/testimonials/Testimonials.jsx';
import { Contact } from './components/contact/Contact.jsx';
import { Footer } from './components/footer/Footer.jsx';
import { useTranslation } from 'react-i18next'
import { Signup } from '/src/components/Signup/Signup.jsx';


const App = () => {
  const [t, i18n]  = useTranslation();
  return (
    <div>
      <Navbar/>
      <Hero/>
      <div className="contianer">
        <Title subTitle = {t('titles.our-programs')} title={t("titles.what-we-offer")}/>

      <Programs/>
      <About />
      <Title subTitle = {t("titles.gallary")} title={t("titles.campus-photos")}/>
        <Campus />
        <Title subTitle = {t("titles.testimonials")} title=  {t("titles.whatstudent")}/>
        <Testimonials />
        <Title subTitle = {t('titles.contact')} title= {t("titles.get-in-touch")}/>
        <Contact />
        <Title subTitle = "Join Our Family" title= "Signup Now" />
        <Signup /> 

        <Footer />
      </div>
    </div>

  )
}


export default App; 