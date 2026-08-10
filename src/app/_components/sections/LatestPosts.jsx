"use client";

import Data from "@data/sections/latest-posts.json";
import Link from "next/link";
import { useLanguage } from "@common/LanguageContext";

import BlogItem from "@components/blog/BlogItem";

const LatestPostsSection = ( { posts } ) => {
    const { t } = useLanguage();
    const latest = t.latestPosts;

    return (
        <>
            <div className="row align-items-center" id="blog">
              <div className="col-lg-12">
                <div className="text-center">
                  <div className="tst-suptitle tst-suptitle-center tst-mb-15" dangerouslySetInnerHTML={{__html : latest.subtitle}} />
                  <h3 className="tst-mb-30" dangerouslySetInnerHTML={{__html : latest.title}} />
                  <p className="tst-text tst-mb-60" dangerouslySetInnerHTML={{__html : latest.description}} />
                </div>
              </div>

              {posts.slice(0, Data.numOfItems).map((item, key) => (
              <div className="col-lg-4" key={`latest-posts-item-${key}`}>
                <BlogItem item={item} />
              </div>
              ))}

              <div className="col-lg-12">
                <div className="tst-read-more">
                  <div className="tst-text" dangerouslySetInnerHTML={{__html : latest.info}} />
                  <Link href={Data.button.link} className="tst-btn tst-anima-link">{latest.button}</Link>
                </div>
              </div>
            </div>
        </>
    );
};

export default LatestPostsSection;
