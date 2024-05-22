import React from 'react'
import '/src/components/Signup/signup.css'
import { useTranslation } from 'react-i18next'

export const Signup = () => {
    const [t, i18n]  = useTranslation();
  return (
    <div className='signup'>
        <div className="signup-col">
            <h3>{t("contact.send-us")}  <img src="/msg-icon.png" alt="" /> </h3>
            <p>{t("contact.contact-p")}
            </p>
            <ul>
                <li><img src="/mail-icon.png" alt="" />siddegx@gmail.com</li>
                <li><img src="/phone-icon.png" alt="" />+974 6004041</li>
                <li><img src="/location-icon.png" alt="" />{t("contact.contact-city")} <br /> {t("contact.contact-country")} </li>
            </ul>
        </div>
        <div className="signup-col">
            <form >
                <label>{t("contact.your-name")}  </label>
                <input type="text" name='name' placeholder={t("contact.enter-name")}  required />
                <label>{t("contact.phone")}  </label>
                <input type="tel" name='phone' placeholder= {t("contact.enter-phone")}  required />
                <label>{t("contact.write-msg")} </label>
                <textarea name="message" id=""  rows="6" placeholder={t("contact.enter-msg")}  required></textarea>
                <button type='submit' className='btn dark-btn'>{t("contact.sub-btn")} <img src="/white-arrow.png" alt="" /></button>

            </form>
           
        </div>

    </div>
  )
}
