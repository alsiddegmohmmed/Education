import React from 'react'
import './About.css'
import { useTranslation } from 'react-i18next'
export const About = () => {
  const [t, i18n]  = useTranslation();
  return (
    <div className='about'>
        <div className="about-left">
            <img src="./about.png" alt="" className='about-img' />
            <img src="./play-icon.png" alt="" className='play-icon' />
        </div>
        <div className="about-right">
            <h3>{t("about.about-uni")}</h3>
            <h2>{t("about.nurt")}</h2>
            <p>{t("about.about-p1")}</p>
                <p>{t("about.about-p2")}</p>
                <p>{t("about.about-p3")}</p>
                    
        </div> 

    </div>
  )
}
