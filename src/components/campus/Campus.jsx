import React from 'react'
import './Campus.css'
import { useTranslation } from 'react-i18next'
export const Campus = () => {
  const [t, i18n]  = useTranslation();
  return (
    <div className='campus'>
        <div className="gallery">
            <img src="/gallery-1.png" alt="" />
            <img src="/gallery-2.png" alt="" />
            <img src="/gallery-3.png" alt="" />
            <img src="/gallery-4.png" alt="" />
        </div>

        <button className='btn dark-btn'>{t("campus.camp-btn")}<img src="/white-arrow.png" alt="" /></button>
    </div>
  )
}
