"use client";

import { useEffect, useMemo, useState } from "react";

import CartData from "@data/cart.json";
import { useLanguage } from "@common/LanguageContext";

function findVariant(variants, selected) {
  return variants.find((variant) =>
    variant.selectedOptions.every((option) => selected[option.name] === option.value)
  );
}

const ProductBuyBox = ({ product }) => {
  const { t } = useLanguage();
  const shop = t.shop || {};
  const options = product.options || [];
  const variants = product.variants || [];

  const initialSelected = useMemo(() => {
    const first = variants.find((variant) => variant.available) || variants[0];
    const next = {};

    (first?.selectedOptions || []).forEach((option) => {
      next[option.name] = option.value;
    });

    return next;
  }, [variants]);

  const [selected, setSelected] = useState(initialSelected);
  const [quantity, setQuantity] = useState(1);
  const [cartTotal, setCartTotal] = useState(CartData.total);
  const [added, setAdded] = useState(false);

  const variant = findVariant(variants, selected) || variants[0];
  const price = variant?.price || product.price;
  const compare = variant?.old_price || product.old_price;
  const currency = variant?.currency || product.currency;
  const available = variant ? variant.available : product.available;

  useEffect(() => {
    const cartNumberEl = document.querySelector(".tst-cart-number");
    if (cartNumberEl) {
      cartNumberEl.innerHTML = cartTotal;
    }
  }, [cartTotal]);

  const setOption = (name, value) => {
    setSelected((current) => ({ ...current, [name]: value }));
  };

  const addToCart = (event) => {
    event.preventDefault();
    if (!available) return;

    const cartNumberEl = document.querySelector(".tst-cart-number");
    setCartTotal(cartTotal + quantity);
    setAdded(true);
    cartNumberEl?.classList.add("tst-added");

    setTimeout(() => {
      cartNumberEl?.classList.remove("tst-added");
      setAdded(false);
    }, 900);
  };

  return (
    <div className="il-buybox">
      <div className="il-buybox__price">
        <span className="il-buybox__currency">{currency}</span>
        <span className="il-buybox__amount">{price}</span>
        {compare ? (
          <span className="il-buybox__compare">
            {currency} {compare}
          </span>
        ) : null}
      </div>

      {options.map((option) => (
        <div className="il-buybox__option" key={option.id || option.name}>
          <div className="il-buybox__label">{option.name}</div>
          <div className="il-buybox__values">
            {option.values.map((value) => {
              const isActive = selected[option.name] === value;
              return (
                <button
                  type="button"
                  key={value}
                  className={`il-buybox__chip ${isActive ? "is-active" : ""}`}
                  onClick={() => setOption(option.name, value)}
                >
                  {value}
                </button>
              );
            })}
          </div>
        </div>
      ))}

      <div className="il-buybox__actions">
        <div className="tst-input-number-frame">
          <div
            className="tst-input-number-btn tst-sub"
            onClick={() => setQuantity((value) => Math.max(1, value - 1))}
          >
            -
          </div>
          <input type="number" readOnly value={quantity} min={1} max={10} />
          <div
            className="tst-input-number-btn tst-add"
            onClick={() => setQuantity((value) => Math.min(10, value + 1))}
          >
            +
          </div>
        </div>
        <button
          type="button"
          className={`tst-btn tst-btn-with-icon ${added ? "tst-added" : ""}`}
          onClick={addToCart}
          disabled={!available}
        >
          {available ? (added ? shop.added : shop.addToCart) : shop.soldOut}
        </button>
      </div>
    </div>
  );
};

export default ProductBuyBox;
