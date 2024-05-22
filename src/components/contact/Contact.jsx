import React from 'react'
import './Contact.css'
import { useTranslation } from 'react-i18next'

export const Contact = () => {
  const [t, i18n]  = useTranslation();
    const [result, setResult] = React.useState("");

    const onSubmit = async (event) => {
      event.preventDefault();
      setResult("Sending....");
      const formData = new FormData(event.target);
  
      formData.append("access_key", "2925d93f-74e1-41f8-83a7-effc3d6e1c0d");
  
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      });
  
      const data = await response.json();
  
      if (data.success) {
        setResult("Form Submitted Successfully");
        event.target.reset();
      } else {
        console.log("Error", data);
        setResult(data.message);
      }
    };
  

  return (
    <div className='contact'>
        <div className="contact-col">
            <h3>{t("contact.send-us")}  <img src="/msg-icon.png" alt="" /> </h3>
            <p>{t("contact.contact-p")}
            </p>
            <ul>
                <li><img src="/mail-icon.png" alt="" />siddegx@gmail.com</li>
                <li><img src="/phone-icon.png" alt="" />+974 6004041</li>
                <li><img src="/location-icon.png" alt="" />{t("contact.contact-city")} <br /> {t("contact.contact-country")} </li>
            </ul>
        </div>
        <div className="contact-col">
            <form onSubmit={onSubmit}>
                <label>{t("contact.your-name")}  </label>
                <input type="text" name='name' placeholder={t("contact.enter-name")}  required />
                <label>{t("contact.phone")}  </label>
                <input type="tel" name='phone' placeholder= {t("contact.enter-phone")}  required />
                <label>{t("contact.write-msg")} </label>
                <textarea name="message" id=""  rows="6" placeholder={t("contact.enter-msg")}  required></textarea>
                <button type='submit' className='btn dark-btn'>{t("contact.sub-btn")} <img src="/white-arrow.png" alt="" /></button>

            </form>
            <span>{result}</span>
        </div>

    </div>
  )
}
