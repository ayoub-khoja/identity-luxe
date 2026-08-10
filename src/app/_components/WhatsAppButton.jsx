"use client";

import { useLanguage } from "@common/LanguageContext";

const WHATSAPP_NUMBER = "97430209993";
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}`;

const WhatsAppButton = () => {
  const { t } = useLanguage();

  return (
    <a
      href={WHATSAPP_URL}
      className="il-whatsapp"
      target="_blank"
      rel="noopener noreferrer"
      aria-label={t.whatsapp}
    >
      <i className="fab fa-whatsapp" aria-hidden="true"></i>
    </a>
  );
};

export default WhatsAppButton;
