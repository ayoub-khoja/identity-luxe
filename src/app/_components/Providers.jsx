"use client";

import { LanguageProvider } from "@common/LanguageContext";

const Providers = ({ children }) => {
  return <LanguageProvider>{children}</LanguageProvider>;
};

export default Providers;
