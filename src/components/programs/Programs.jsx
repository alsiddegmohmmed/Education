/* eslint-disable no-unused-vars */
import React from 'react'
import '/src/components/programs/Programs.css'
import { useTranslation } from 'react-i18next'
export const Programs = () => {
    const [t, i18n]  = useTranslation();
  return (
    <div className='programs'>
        <div className="program">
            <img src="/program-1.png" alt="" />
            <div className="caption">
                <img src="/program-icon-1.png" alt="" />
                <p>{t("about.grad")}</p>
            </div>
        </div>
        <div className="program">
            <img src="/program-2.png" alt="" />
            <div className="caption">
                <img src="/program-icon-2.png" alt="" />
                <p>{t("about.master")}</p>
            </div>
        </div>
        <div className="program">
            <img src="/program-3.png" alt="" />
            <div className="caption">
                <img src="/program-icon-3.png" alt="" />
                <p>{t("about.post")}</p>
            </div>
        </div>
        </div>
  )
}
