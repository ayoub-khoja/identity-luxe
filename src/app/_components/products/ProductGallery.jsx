"use client";

import { useMemo, useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

const ProductGallery = ({ images = [], title }) => {
  const slides = useMemo(
    () => images.map((image) => ({ src: image.url, alt: image.alt || title })),
    [images, title]
  );
  const [active, setActive] = useState(0);
  const [open, setOpen] = useState(false);
  const current = slides[active] || slides[0];

  if (!current) {
    return null;
  }

  return (
    <div className="il-product-gallery">
      <button
        type="button"
        className="il-product-gallery__main"
        onClick={() => setOpen(true)}
        aria-label={title}
      >
        <img src={current.src} alt={current.alt} />
      </button>
      {slides.length > 1 ? (
        <div className="il-product-gallery__thumbs">
          {slides.map((slide, index) => (
            <button
              type="button"
              key={slide.src}
              className={`il-product-gallery__thumb ${index === active ? "is-active" : ""}`}
              onClick={() => setActive(index)}
            >
              <img src={slide.src} alt={slide.alt} />
            </button>
          ))}
        </div>
      ) : null}
      <Lightbox
        open={open}
        close={() => setOpen(false)}
        index={active}
        slides={slides}
        styles={{ container: { backgroundColor: "rgba(26, 47, 51, .88)" } }}
      />
    </div>
  );
};

export default ProductGallery;
