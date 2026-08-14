import React, { Suspense } from "react";
import dynamic from "next/dynamic";

import { getSortedPostsData } from "@library/posts";
import { getBestSellingProducts } from "@library/shopify";

import AppData from "@data/app.json";

import ScrollHint from "@layouts/scroll-hint/Index";
import Divider from "@layouts/divider/Index";

import HeroSection from "@components/sections/Hero";
import AboutSection from "@components/sections/About";
import FeaturesSection from "@components/sections/Features";
import ScheduleSection from "@components/sections/Schedule";
import CountersSection from "@components/sections/Counters";
import CallToActionSection from "@components/sections/CallToAction";
import LatestPostsSection from "@components/sections/LatestPosts";
import SubscribeSection from "@components/sections/Subscribe";
import InstagramSection from "@components/sections/Instagram";
import FaqSection from "@components/sections/Faq";
import BestsellersSection from "@components/sections/Bestsellers";

const TestimonialSlider = dynamic( () => import("@components/sliders/Testimonial"), { ssr: false } );

export const revalidate = 300;

export const metadata = {
  title: {
		default: "Accueil",
	},
  description: AppData.settings.siteDescription,
}

async function Home() {
  const [posts, bestsellers] = await Promise.all([
    getAllPosts(),
    getBestSellingProducts(),
  ]);

  return (
    <>
      <div id="tst-dynamic-banner" className="tst-dynamic-banner">
        <HeroSection bgType={"video"} />
      </div>
      <div id="tst-dynamic-content" className="tst-dynamic-content">
        <div className="tst-content-frame">
          <div className="tst-content-box">
            <div className="container tst-p-60-0">
              <ScrollHint />
              <AboutSection />
              <Divider />
              <BestsellersSection items={bestsellers} />
              <Divider />
              <FeaturesSection />
              <Divider />
              <ScheduleSection />
              <Divider onlyBottom={0} />
              <CountersSection />
            </div>
          </div>
        </div>
        <CallToActionSection />
        <div className="tst-content-frame">
          <div className="tst-content-box">
            <div className="container tst-p-60-60">
              <InstagramSection />
              <Divider />
              <FaqSection />
              <Divider />
              <TestimonialSlider />
              <Divider onlyBottom={0} />
              <Suspense fallback={<div>Loading...</div>}>
                <LatestPostsSection posts={posts} />
              </Suspense>
              <Divider onlyBottom={0} />
              <SubscribeSection />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Home;

async function getAllPosts() {
  const allPosts = getSortedPostsData();
  return allPosts;
}