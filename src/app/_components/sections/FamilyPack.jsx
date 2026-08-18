"use client";

import Link from "next/link";

import { useLanguage } from "@common/LanguageContext";
import {
  PACK_CURRENCY,
  PACK_DISCOUNT,
  exampleFamilyItems,
  formatPackPrice,
  summarizePack,
} from "@library/packs";

const SLOT_META = [
  { group: "kids", labelKey: "kids" },
  { group: "kids", labelKey: "kids" },
  { group: "adults", labelKey: "adults" },
  { group: "adults", labelKey: "adults" },
];

const FamilyPackSection = ({ catalog = { kids: [], adults: [], tote: [] } }) => {
  const { t } = useLanguage();
  const copy = t.pack || {};
  const items = exampleFamilyItems(catalog);
  const summary = summarizePack(items, PACK_DISCOUNT);
  const slots = SLOT_META.map((slot, index) => ({
    ...slot,
    product: items[index] || null,
  }));

  if (!catalog.kids?.length && !catalog.adults?.length) {
    return null;
  }

  return (
    <section className="il-pack" id="family-pack" aria-labelledby="il-pack-title">
      <div className="il-pack__hero">
        <div className="il-pack__copy">
          <div className="il-pack__badges">
            <span className="il-pack__badge">{copy.badge}</span>
            <span className="il-pack__badge il-pack__badge--save">{copy.save}</span>
          </div>
          <p className="il-pack__kicker">{copy.subtitle}</p>
          <h3 id="il-pack-title" className="il-pack__title">
            {copy.title}
          </h3>
          <p className="il-pack__text">{copy.text}</p>
          <p className="il-pack__composition">{copy.composition}</p>

          <div className="il-pack__prices">
            <div className="il-pack__price">
              <span>{copy.was}</span>
              <strong>
                {PACK_CURRENCY} {formatPackPrice(summary.original || 460)}
              </strong>
            </div>
            <div className="il-pack__arrow" aria-hidden="true">
              →
            </div>
            <div className="il-pack__price il-pack__price--now">
              <span>{copy.now}</span>
              <strong>
                {PACK_CURRENCY} {formatPackPrice(summary.original ? summary.total : 410)}
              </strong>
            </div>
            <div className="il-pack__saving">
              {copy.saveAmount} {PACK_CURRENCY} {PACK_DISCOUNT}
            </div>
          </div>

          <div className="il-pack__actions">
            <Link href="/pack?type=family" className="tst-btn il-pack__cta">
              {copy.cta}
            </Link>
            <Link href="/pack" className="il-pack__ghost">
              {copy.viewPacks}
            </Link>
          </div>
        </div>

        <div className="il-pack__mosaic" aria-hidden={!items.length}>
          {slots.map((slot, index) => (
            <article className="il-pack__tile" key={`pack-slot-${slot.group}-${index}`}>
              <span className="il-pack__tile-label">{copy[slot.labelKey]}</span>
              {slot.product ? (
                <img src={slot.product.image} alt={slot.product.name || slot.product.title} />
              ) : (
                <span className="il-pack__tile-empty">+</span>
              )}
            </article>
          ))}
        </div>
      </div>

      <div className="il-pack__offers">
        <h4 className="il-pack__offers-title">{copy.offersTitle}</h4>
        <div className="il-pack__offer-grid">
          {[
            { id: "family", name: copy.familyName, desc: copy.familyDesc, featured: true },
            { id: "kids", name: copy.kidsName, desc: copy.kidsDesc },
            { id: "adults", name: copy.adultsName, desc: copy.adultsDesc },
            { id: "complete", name: copy.completeName, desc: copy.completeDesc },
          ].map((offer) => (
            <Link
              key={offer.id}
              href={`/pack?type=${offer.id}`}
              className={`il-pack__offer ${offer.featured ? "is-featured" : ""}`}
            >
              <span className="il-pack__offer-save">{copy.save}</span>
              <strong>{offer.name}</strong>
              <p>{offer.desc}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FamilyPackSection;
