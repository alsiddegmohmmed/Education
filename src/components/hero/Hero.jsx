/* eslint-disable no-unused-vars */
import React from 'react'
import '/src/components/hero/Hero.css'
import { useTranslation } from 'react-i18next'



function Hero() {

  const [t, i18n]  = useTranslation();
  return (
    <div className='hero contianer' >
      <div className="hero-text">
        <h1>{t('Home-page.hero-h1')}</h1>
        <p>{t("Home-page.hero-p")} </p>
             <button className="btn">{t("Home-page.hero-Explore-button")} <img src="/dark-arrow.png" alt="" /></button>

      </div>
    </div>
  )
}

export default Hero
