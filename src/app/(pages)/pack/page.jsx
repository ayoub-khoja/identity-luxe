import ScrollHint from "@layouts/scroll-hint/Index";
import Divider from "@layouts/divider/Index";

import PageBanner from "@components/PageBanner";
import SubscribeSection from "@components/sections/Subscribe";
import PackBuilder from "@components/packs/PackBuilder";

import { getPackCatalog } from "@library/shopify";
import { PACKS } from "@library/packs";

export const dynamic = "force-dynamic";

export const metadata = {
  title: {
    default: "Family Pack",
  },
  description: "Build a family pack: kids, adults and tote bags with 50 QAR off.",
};

const PackPage = async ({ searchParams }) => {
  const requested = searchParams?.type;
  const initialType = PACKS.some((pack) => pack.id === requested) ? requested : "family";
  const catalog = await getPackCatalog();

  return (
    <>
      <div id="tst-dynamic-banner" className="tst-dynamic-banner">
        <PageBanner
          pageTitle={"Family Pack"}
          description={"2 kids & babies + 2 adults. 460 QAR becomes 410 QAR."}
          breadTitle={"Pack"}
        />
      </div>
      <div id="tst-dynamic-content" className="tst-dynamic-content">
        <div className="tst-content-frame">
          <div className="tst-content-box">
            <div className="container tst-p-60-60">
              <ScrollHint />
              <PackBuilder catalog={catalog} initialType={initialType} />
              <Divider onlyBottom={0} />
              <SubscribeSection />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PackPage;
