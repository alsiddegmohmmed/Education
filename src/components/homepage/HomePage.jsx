import React from 'react';
import Navbar from '../navbar/Navbar.jsx';
import Hero from '../hero/Hero.jsx';
import { Programs } from '../programs/Programs.jsx';
import { Title } from '../title/Title.jsx';
import { About } from '../about/About.jsx';
import { Campus } from '../campus/Campus.jsx';
import { Testimonials } from '../testimonials/Testimonials.jsx';
import { Contact } from '../contact/Contact.jsx';
import { Footer } from '../footer/Footer.jsx';
import { useTranslation } from 'react-i18next';

const HomePage = () => {
  const [t] = useTranslation();
  return (
    <div>
      <Navbar/>
      <Hero/>
      <div className="container">
        <Title subTitle={t('titles.our-programs')} title={t('titles.what-we-offer')} />
        <Programs/>
        <About />
        <Title subTitle={t('titles.gallery')} title={t('titles.campus-photos')} />
        <Campus />
        <Title subTitle={t('titles.testimonials')} title={t('titles.whatstudent')} />
        <Testimonials />
        <Title subTitle={t('titles.contact')} title={t('titles.get-in-touch')} />
        <Contact />
        <Footer />
      </div>
    </div>
  );
};

export default HomePage;
