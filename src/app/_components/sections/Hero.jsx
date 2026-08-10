"use client";

import Data from "@data/sections/hero.json";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import { ScrollAnimation } from "@common/scrollAnims";
import { useLanguage } from "@common/LanguageContext";

const Hero = ( { bgType } ) => {
    const videoRef = useRef(null);
    const unlockedRef = useRef(false);
    const [muted, setMuted] = useState(true);
    const { t } = useLanguage();
    const hero = t.hero;

    useEffect(() => {
        ScrollAnimation();
    }, []);

    useEffect(() => {
        if (bgType !== "video" || !videoRef.current) return;

        const video = videoRef.current;
        video.muted = true;

        const playMuted = async () => {
            try {
                await video.play();
            } catch {
                // Ignore autoplay rejection.
            }
        };
        playMuted();
    }, [bgType]);

    const unlockSound = async () => {
        if (unlockedRef.current || bgType !== "video") return;

        const video = videoRef.current;
        if (!video) return;

        unlockedRef.current = true;
        video.muted = false;
        setMuted(false);

        try {
            await video.play();
        } catch {
            unlockedRef.current = false;
            video.muted = true;
            setMuted(true);
        }
    };

    const toggleSound = async (e) => {
        e.stopPropagation();
        const video = videoRef.current;
        if (!video) return;

        if (muted) {
            unlockedRef.current = true;
            video.muted = false;
            setMuted(false);
        } else {
            video.muted = true;
            setMuted(true);
        }

        try {
            await video.play();
        } catch {
            // no-op
        }
    };

    const soundLabel = muted ? t.soundOn : t.soundOff;

    return (
        <>
            <div className="tst-banner" onClick={unlockSound} onTouchStart={unlockSound}>
                <div className="tst-cover-frame">
                    {bgType == 'video' ? (
                    <>
                    <video
                      ref={videoRef}
                      className="tst-cover tst-parallax"
                      muted={muted}
                      playsInline
                      autoPlay
                      loop
                      poster={Data.image.url}
                    >
                        <source src={Data.video.url} type="video/mp4" />
                    </video>
                    <button
                      type="button"
                      className="il-hero-sound"
                      onClick={toggleSound}
                      aria-label={soundLabel}
                    >
                      <i className={muted ? "fas fa-volume-mute" : "fas fa-volume-up"}></i>
                      <span>{soundLabel}</span>
                    </button>
                    </>
                    ) : (
                    <img src={Data.image.url} alt={Data.image.alt} className="tst-cover tst-parallax" />
                    )}
                    <div className="tst-overlay"></div>
                </div>
                <div className="tst-banner-content-frame">
                    <div className="container">
                        <div className="tst-main-title-frame">
                        <div className="tst-main-title il-hero-brand">
                            <div className="tst-suptitle tst-suptitle-mobile-center tst-text-shadow tst-white-2 tst-mb-15">{hero.subtitle}</div>
                            <h1 className="tst-white-2 tst-text-shadow tst-mb-20 il-brand-title" dangerouslySetInnerHTML={{__html : hero.title}} />
                            <div className="tst-text tst-text-shadow tst-text-lg tst-white-2 tst-mb-30" dangerouslySetInnerHTML={{__html : hero.description}} />
                            <Link href={Data.button1.link} className="tst-btn tst-btn-lg tst-btn-shadow tst-res-btn tst-mr-30">{hero.button1}</Link>
                            <Link href={Data.button2.link} className="tst-label tst-white-2">{hero.button2}</Link>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
export default Hero;
