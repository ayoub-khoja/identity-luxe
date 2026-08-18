"use client";

import { useMemo, useState } from "react";

import { useLanguage } from "@common/LanguageContext";
import {
  PACKS,
  PACK_CURRENCY,
  PACK_DISCOUNT,
  formatPackPrice,
  getPackById,
  packWhatsAppUrl,
  summarizePack,
} from "@library/packs";

const GROUP_SLOT_KEY = {
  kids: "slotKids",
  adults: "slotAdults",
  tote: "slotTote",
};

const PACK_NAME_KEY = {
  family: "familyName",
  kids: "kidsName",
  adults: "adultsName",
  complete: "completeName",
};

const PACK_DESC_KEY = {
  family: "familyDesc",
  kids: "kidsDesc",
  adults: "adultsDesc",
  complete: "completeDesc",
};

const PackBuilder = ({ catalog = { kids: [], adults: [], tote: [] }, initialType = "family" }) => {
  const { t, locale } = useLanguage();
  const copy = t.pack || {};
  const [packId, setPackId] = useState(initialType);
  const pack = getPackById(packId);
  const [selected, setSelected] = useState({});
  const [activeSlot, setActiveSlot] = useState(pack.slots[0]?.id);

  const products = pack.slots.map((slot) => selected[`${pack.id}:${slot.id}`] || null);
  const summary = useMemo(
    () => summarizePack(products, pack.discount || PACK_DISCOUNT),
    [products, pack.discount]
  );

  const pickerProducts = catalog[pack.slots.find((slot) => slot.id === activeSlot)?.group] || [];

  const selectProduct = (product) => {
    if (!activeSlot) return;

    const key = `${pack.id}:${activeSlot}`;
    const nextSelected = { ...selected, [key]: product };
    setSelected(nextSelected);

    const nextEmpty = pack.slots.find((slot) => !nextSelected[`${pack.id}:${slot.id}`]);
    if (nextEmpty) {
      setActiveSlot(nextEmpty.id);
    }
  };

  const switchPack = (id) => {
    setPackId(id);
    const next = getPackById(id);
    setActiveSlot(next.slots[0]?.id);
  };

  const whatsappHref = summary.complete
    ? packWhatsAppUrl({
        packLabel: copy[PACK_NAME_KEY[pack.id]] || copy.title,
        products,
        summary,
        locale,
      })
    : "#";

  return (
    <div className="il-builder">
      <div className="il-builder__intro">
        <div className="il-pack__badges">
          <span className="il-pack__badge">{copy.badge}</span>
          <span className="il-pack__badge il-pack__badge--save">{copy.save}</span>
        </div>
        <h3 className="il-pack__title">{copy.builderTitle}</h3>
        <p className="il-pack__text">{copy.builderText}</p>
      </div>

      <div className="il-builder__types">
        {PACKS.map((item) => (
          <button
            type="button"
            key={item.id}
            className={`il-builder__type ${packId === item.id ? "is-active" : ""}`}
            onClick={() => switchPack(item.id)}
          >
            <strong>{copy[PACK_NAME_KEY[item.id]]}</strong>
            <span>{copy[PACK_DESC_KEY[item.id]]}</span>
          </button>
        ))}
      </div>

      <div className="il-builder__layout">
        <div className="il-builder__slots">
          <p className="il-builder__progress">
            {copy.progress} {summary.filled}/{summary.needed}
          </p>
          <div className="il-builder__slot-grid">
            {pack.slots.map((slot) => {
              const product = selected[`${pack.id}:${slot.id}`];
              const isActive = activeSlot === slot.id;
              return (
                <button
                  type="button"
                  key={slot.id}
                  className={`il-builder__slot ${isActive ? "is-active" : ""} ${product ? "is-filled" : ""}`}
                  onClick={() => setActiveSlot(slot.id)}
                >
                  {product ? (
                    <img src={product.image} alt={product.name || product.title} />
                  ) : (
                    <span className="il-builder__plus">+</span>
                  )}
                  <span className="il-builder__slot-name">
                    {product ? product.name || product.title : copy[GROUP_SLOT_KEY[slot.group]]}
                  </span>
                  <span className="il-builder__slot-action">{product ? copy.change : copy.choose}</span>
                </button>
              );
            })}
          </div>
        </div>

        <aside className="il-builder__summary">
          <div className={`il-builder__status ${summary.complete ? "is-complete" : ""}`}>
            {summary.complete ? copy.complete : copy.incomplete}
          </div>
          <div className="il-pack__prices il-builder__prices">
            <div className="il-pack__price">
              <span>{copy.was}</span>
              <strong>
                {PACK_CURRENCY} {formatPackPrice(summary.original)}
              </strong>
            </div>
            <div className="il-pack__price il-pack__price--now">
              <span>{copy.now}</span>
              <strong>
                {PACK_CURRENCY} {formatPackPrice(summary.complete ? summary.total : summary.original)}
              </strong>
            </div>
          </div>
          <div className="il-pack__saving">
            {copy.saveAmount} {PACK_CURRENCY} {summary.complete ? pack.discount : 0}
          </div>
          <a
            className={`tst-btn il-pack__cta ${summary.complete ? "" : "is-disabled"}`}
            href={whatsappHref}
            target={summary.complete ? "_blank" : undefined}
            rel={summary.complete ? "noopener noreferrer" : undefined}
            onClick={(event) => {
              if (!summary.complete) event.preventDefault();
            }}
          >
            {copy.orderWhatsapp}
          </a>
          <p className="il-builder__note">{copy.sizesNote}</p>
        </aside>
      </div>

      <div className="il-builder__picker">
        <h4>{copy[pack.slots.find((slot) => slot.id === activeSlot)?.group] || copy.choose}</h4>
        {pickerProducts.length ? (
          <div className="row">
            {pickerProducts.map((product) => {
              const isPicked = products.some((item) => item?.handle === product.handle);
              return (
                <div className="col-lg-3 col-md-4 col-sm-6" key={product.handle}>
                  <button
                    type="button"
                    className={`il-builder__product ${isPicked ? "is-picked" : ""}`}
                    onClick={() => selectProduct(product)}
                  >
                    <img src={product.image} alt={product.name || product.title} />
                    <strong>{product.name || product.title}</strong>
                    <span>
                      {product.currency} {product.price}
                    </span>
                  </button>
                </div>
              );
            })}
          </div>
        ) : (
          <p className="tst-text">{copy.emptyGroup}</p>
        )}
      </div>
    </div>
  );
};

export default PackBuilder;
