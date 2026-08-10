"use client";

import { useEffect } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";

import AppData from "@data/app.json";
import { useLanguage } from "@common/LanguageContext";

import { ScrollAnimation } from "@common/scrollAnims";

const FooterGallery = dynamic( () => import("@layouts/footers/Gallery"), { ssr: false } );

const DefaultFooter = () => {
  const { t } = useLanguage();
  const footer = t.footer;
  
  useEffect(() => {
    ScrollAnimation();
  }, []);

  const scrollToTop = (e) => {
    window.scrollTo({top: 0, behavior: 'smooth'});
    e.preventDefault();
  }

  const galleryButton = {
    ...AppData.footer.gallery.button,
    label: footer.galleryButton,
  };

  return (
    <>
        <footer className="tst-white tst-fade-down">
            <div className="container">
                <div className="tst-footer-top">
                    <img src={AppData.footer.logo.url} alt={AppData.footer.logo.alt} className="tst-logo" />

                    <div className="tst-social">
                        {AppData.social.map((item, key) => (
                        <a href={item.link} target="_blank" title={item.title} className="tst-icon-link" key={`footer-social-item-${key}`}><i className={item.icon}></i></a>
                        ))}
                    </div>
                </div>
                <div className="tst-spacer tst-white"></div>

                <div className="row">
                    <div className="col-lg-4">
                        <div className="tst-mb-60">
                            <h5 className="tst-mb-30 tst-text-shadow" dangerouslySetInnerHTML={{__html : footer.aboutTitle}} />
                            <div className="tst-text tst-text-shadow tst-mb-30" dangerouslySetInnerHTML={{__html : footer.aboutText}} />
                            <Link href={AppData.footer.about.button.link} className="tst-label tst-color tst-anima-link">{footer.aboutButton}</Link>
                        </div>
                    </div>
                    <div className="col-lg-4">
                        <div className="tst-mb-60">
                            <h5 className="tst-mb-30 tst-text-shadow" dangerouslySetInnerHTML={{__html : footer.contactTitle}} />
                            <ul className="tst-footer-contact tst-text-shadow tst-mb-30">
                                {footer.contactItems.map((item, key) => (
                                <li key={`footer-contact-item-${key}`}><span className="tst-label">{item.label} :</span><span className="tst-text">{item.value}</span></li>
                                ))}
                            </ul>
                            <Link href={AppData.footer.contact.button.link} className="tst-label tst-color tst-anima-link">{footer.contactButton}</Link>
                        </div>
                    </div>
                    <div className="col-lg-4">
                        <div className="tst-mb-60">
                            <h5 className="tst-mb-30 tst-text-shadow" dangerouslySetInnerHTML={{__html : footer.galleryTitle}} />
                            <FooterGallery items={AppData.footer.gallery.items} button={galleryButton} />
                        </div>
                    </div>
                </div>
                <div className="tst-spacer tst-white tst-spacer-only-bottom-space"></div>

                <div className="tst-footer-bottom">
                    <div className="tst-text" dangerouslySetInnerHTML={{__html : footer.copy}} />
                    <a href="#tst-app" className="tst-label tst-color tst-anchor-scroll" onClick={ (e) => scrollToTop(e) }>{t.backToTop}</a>
                </div>
            </div>
        </footer>
    </>
  );
};
export default DefaultFooter;
