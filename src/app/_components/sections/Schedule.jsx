"use client";

import Data from "@data/sections/schedule.json";
import Link from "next/link";
import { useLanguage } from "@common/LanguageContext";

const ScheduleSection = () => {
    const { t } = useLanguage();
    const schedule = t.schedule;

    return (
        <>
            <div className="tst-banner-sm">
              <div className="tst-cover-frame">
                <img src={Data.image.url} alt={Data.image.alt} className="tst-cover" />
                <div className="tst-overlay"></div>
              </div>

              <div className="row align-items-center">
                <div className="col-lg-8">
                  <div className="tst-text-frame">
                    <div className="tst-suptitle tst-suptitle-mobile-center tst-white-2 tst-mb-15">{schedule.subtitle}</div>
                    <h2 className="tst-white-2 tst-mb-30" dangerouslySetInnerHTML={{__html : schedule.title}} />
                    <p className="tst-text tst-white-2 tst-mb-30" dangerouslySetInnerHTML={{__html : schedule.description}} />

                    <div className="tst-btn-mobile">
                      <Link href={Data.button1.link} className="tst-btn tst-res-btn tst-mr-30">{schedule.button1}</Link>
                      <Link href={Data.button2.link} className="tst-label tst-white-2">{schedule.button2}</Link>
                    </div>
                  </div>
                </div>
                <div className="col-lg-4">
                  <div className="tst-wh-frame">
                    {Data.items.map((item, key) => (
                    <div className={key == 0 ? "tst-mb-30": ""} key={`schedule-item-${key}`}>
                      <div className="tst-label tst-mb-15">{schedule.items[key] || item.label}</div>
                      <div className="h5">{item.from.hours} <span className="tst-color">:</span> {item.from.minutes}</div>
                      <div className="h5">{item.to.hours} <span className="tst-color">:</span> {item.to.minutes}</div>
                    </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
        </>
    );
}
export default ScheduleSection;
