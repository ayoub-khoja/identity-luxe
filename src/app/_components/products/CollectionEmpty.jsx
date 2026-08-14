"use client";

import { useLanguage } from "@common/LanguageContext";

const CollectionEmpty = () => {
  const { t } = useLanguage();

  return (
    <div className="text-center">
      <p className="tst-text tst-mb-60">{t.shop.emptyCollection}</p>
    </div>
  );
};

export default CollectionEmpty;
