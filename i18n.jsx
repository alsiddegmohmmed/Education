import i18n from 'i18next';
import { Translation, initReactI18next } from 'react-i18next';

import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import  translationEN from './src/locale/en.json'
import  translationAR from './src/locale/ar.json'

const resources = {
  en:  {
    translation: translationEN
  },
  ar: {
    translation:  translationAR
  },
};


i18n
  
  .use(Backend)
  
  .use(LanguageDetector)
  
  .use(initReactI18next)

  .init({
    resources,
    fallbackLng: 'en',
    debug: true,

    interpolation: {
      escapeValue: false, 
    }, 
    react: {
      useSuspense: false
    }
  });


export default i18n;
