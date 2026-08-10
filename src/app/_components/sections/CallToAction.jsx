"use client";

import Data from "@data/sections/call-to-action.json";
import { useLanguage } from "@common/LanguageContext";

const CallToActionSection = () => {
  const { t } = useLanguage();
  const cta = t.cta;

  return (
    <>
        <div className="tst-call-to-action">
            <div className="container">
                <div className="row align-items-center">
                    <div className="col-lg-6">
                        <div className="tst-cta-frame">
                            <div className="tst-cta">
                                <div className="tst-fade-up">
                                    <div className="tst-suptitle tst-suptitle-mobile-md-center tst-text-shadow tst-white-2 tst-mb-15" dangerouslySetInnerHTML={{__html : cta.subtitle}} />
                                </div>
                                <h2 className="tst-white-2 tst-text-shadow tst-mb-30 tst-fade-up" dangerouslySetInnerHTML={{__html : cta.title}} />
                                <div className="tst-fade-up">
                                    <div className="tst-text tst-text-lg tst-text-shadow tst-white-2" dangerouslySetInnerHTML={{__html : cta.description}} />
                                </div>
                                <a href={Data.button1.link} className="tst-btn tst-btn-lg tst-btn-shadow tst-mt-30 tst-mr-10 tst-fade-up">
                                    <i className={Data.button1.icon}></i> 
                                    {cta.button1}
                                </a>
                                <a href={Data.button2.link} className="tst-btn tst-btn-lg tst-btn-shadow tst-mt-30 tst-fade-up">
                                    <i className={Data.button2.icon}></i> 
                                    {cta.button2}
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <img src={Data.image.url} alt={Data.image.alt} className="tst-cta-image tst-fade-up" />
                    </div>
                </div>
            </div>
        </div>
    </>
  );
};

export default CallToActionSection;
