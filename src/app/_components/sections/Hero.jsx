"use client";

import Data from "@data/sections/hero.json";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import { ScrollAnimation } from "@common/scrollAnims";

const Hero = ( { bgType } ) => {
    const videoRef = useRef(null);
    const [muted, setMuted] = useState(true);

    useEffect(() => {
        ScrollAnimation();
    }, []);

    useEffect(() => {
        if (bgType !== "video" || !videoRef.current) return;

        const video = videoRef.current;
        video.muted = muted;

        // Browsers block unmuted autoplay — start muted, then unlock sound on click.
        const play = async () => {
            try {
                await video.play();
            } catch {
                // Ignore autoplay rejection; user can still unmute.
            }
        };
        play();
    }, [bgType, muted]);

    const toggleSound = async () => {
        const video = videoRef.current;
        if (!video) return;

        const nextMuted = !muted;
        video.muted = nextMuted;
        setMuted(nextMuted);

        try {
            await video.play();
        } catch {
            // no-op
        }
    };

    return (
        <>
            {/* banner */}
            <div className="tst-banner">
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
                      aria-label={muted ? "Activer le son" : "Couper le son"}
                    >
                      <i className={muted ? "fas fa-volume-mute" : "fas fa-volume-up"}></i>
                      <span>{muted ? "Activer le son" : "Couper le son"}</span>
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
                            <div className="tst-suptitle tst-suptitle-mobile-center tst-text-shadow tst-white-2 tst-mb-15">{Data.subtitle}</div>
                            <h1 className="tst-white-2 tst-text-shadow tst-mb-20 il-brand-title" dangerouslySetInnerHTML={{__html : Data.title}} />
                            <div className="tst-text tst-text-shadow tst-text-lg tst-white-2 tst-mb-30" dangerouslySetInnerHTML={{__html : Data.description}} />
                            <Link href={Data.button1.link} className="tst-btn tst-btn-lg tst-btn-shadow tst-res-btn tst-mr-30">{Data.button1.label}</Link>
                            <Link href={Data.button2.link} className="tst-label tst-white-2">{Data.button2.label}</Link>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* banner end */}
        </>
    );
}
export default Hero;
