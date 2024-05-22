import React, { useRef } from 'react'
import './Testimonials.css'
import { useTranslation } from 'react-i18next'

export const Testimonials = () => {
  const [t, i18n]  = useTranslation();
  
  const slider = useRef(); 

  let tx = 0 ; 
  
  const slideForward = () => {
    if (tx > -50) {
      tx -= 25; 
    }
    slider.current.style.transform = `translateX(${tx}%)`
    
  }

  const slideBackward = () => {
    if (tx < 0) {
      tx += 25; 
    }
    slider.current.style.transform = `translateX(${tx}%)`


  }
  
  
  
  return (
    <div className='testimonials'>
      <img src="/next-icon.png" alt="" className="next-btn" onClick={slideForward}/>
      <img src="/back-icon.png" alt="" className="back-btn" onClick={slideBackward}/>
      <div className="slider">
        <ul ref={slider}>
          <li>
            <div className="slide">
              <div className="user-info">
                <img src="/user-1.png" alt="" />
                <div>
                  <h3>{t("testimonial.username-1")}</h3>
                  <span>{t("testimonial.user1-loc")}</span>
                </div>
              </div>
              <p>{t("testimonial.user1p")}</p>
            </div>
          </li>

          <li>
            <div className="slide">
              <div className="user-info">
                <img src="/user-2.png" alt="" />
                <div>
                  <h3>{t("testimonial.username-2")}</h3>
                  <span>{t("testimonial.user2-loc")}</span>
                </div>
              </div>
              <p>{t("testimonial.user1p")}</p>
            </div>
          </li>
          <li>
            <div className="slide">
              <div className="user-info">
                <img src="/user-3.png" alt="" />
                <div>
                  <h3>{t("testimonial.username-3")}</h3>
                  <span>user3-loc</span>
                </div>
              </div>
              <p> {t("testimonial.user1p")}
                 </p>
            </div>
          </li>
          <li>
            <div className="slide">
              <div className="user-info">
                <img src="/user-4.png" alt="" />
                <div>
                  <h3>{t("testimonial.username-4")}</h3>
                  <span>{t("testimonial.user4-loc")}</span>
                </div>
              </div>
              <p>{t("testimonial.user1p")}</p>
            </div>
          </li>
        </ul>
      </div>
    </div>
    
  )
}
