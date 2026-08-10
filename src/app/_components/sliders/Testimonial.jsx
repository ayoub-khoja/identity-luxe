"use client";

import { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { SliderProps } from "@common/sliderProps";
import { Swiper, SwiperSlide } from "swiper/react";

import Data from "@data/sliders/testimonial";
import { useLanguage } from "@common/LanguageContext";

const REVIEWS_STORAGE_KEY = "il-user-reviews";
const DEFAULT_AVATAR = "/img/faces/1.jpg";

function formatReviewDate(date = new Date()) {
  const dd = String(date.getDate()).padStart(2, "0");
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const yy = String(date.getFullYear()).slice(-2);
  return `${dd}.${mm}.${yy}`;
}

function readStoredReviews() {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(REVIEWS_STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

const StarDisplay = ({ rating = 0 }) => {
  if (!rating) return null;
  return (
    <ul className="tst-stars il-review-stars">
      {[1, 2, 3, 4, 5].map((value) => (
        <li key={`star-${value}`}>
          <i className={`${value <= rating ? "fas" : "far"} fa-star`}></i>
        </li>
      ))}
    </ul>
  );
};

const TestimonialSlider = () => {
  const { t } = useLanguage();
  const testimonial = t.testimonial;
  const [popupOpen, setPopupOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [userReviews, setUserReviews] = useState([]);
  const [form, setForm] = useState({ name: "", title: "", text: "", rating: 5 });
  const [hoverRating, setHoverRating] = useState(0);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setUserReviews(readStoredReviews());
  }, []);

  useEffect(() => {
    if (!popupOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [popupOpen]);

  const slides = useMemo(() => {
    const defaults = Data.items.map((item, key) => {
      const translated = testimonial.items[key % testimonial.items.length];
      return {
        ...item,
        title: translated?.title || item.title,
        text: translated?.text || item.text,
        rating: item.rating || 5,
        id: `default-${key}`,
      };
    });
    return [...userReviews, ...defaults];
  }, [userReviews, testimonial.items]);

  const openPopup = (e) => {
    e.preventDefault();
    setSubmitted(false);
    setErrors({});
    setHoverRating(0);
    setForm({ name: "", title: "", text: "", rating: 5 });
    setPopupOpen(true);
  };

  const closePopup = () => {
    setPopupOpen(false);
    setSubmitted(false);
    setErrors({});
    setHoverRating(0);
  };

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const nextErrors = {};
    if (!form.name.trim()) nextErrors.name = testimonial.required;
    if (!form.text.trim()) nextErrors.text = testimonial.required;
    if (!form.rating) nextErrors.rating = testimonial.required;
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;

    const review = {
      id: `user-${Date.now()}`,
      name: form.name.trim(),
      title: form.title.trim() || testimonial.formTitle,
      text: form.text.trim(),
      rating: form.rating,
      image: DEFAULT_AVATAR,
      date: formatReviewDate(),
    };

    const next = [review, ...readStoredReviews()];
    localStorage.setItem(REVIEWS_STORAGE_KEY, JSON.stringify(next));
    setUserReviews(next);
    setForm({ name: "", title: "", text: "", rating: 5 });
    setSubmitted(true);
  };

  const activeStars = hoverRating || form.rating;

  const popup =
    popupOpen && mounted
      ? createPortal(
          <div className="il-review-overlay" onClick={closePopup} role="presentation">
            <div
              className="il-review-popup"
              onClick={(e) => e.stopPropagation()}
              role="dialog"
              aria-modal="true"
              aria-label={testimonial.formTitle}
            >
              <button
                type="button"
                className="il-review-popup__close"
                onClick={closePopup}
                aria-label="Close"
              >
                <i className="fas fa-times"></i>
              </button>

              <div className="text-center">
                <h4 className="tst-mb-30">{testimonial.formTitle}</h4>
              </div>

              {submitted ? (
                <div className="text-center">
                  <p className="tst-text tst-mb-30">{testimonial.success}</p>
                  <button type="button" className="tst-btn" onClick={closePopup}>
                    OK
                  </button>
                </div>
              ) : (
                <form className="il-review-form" onSubmit={onSubmit}>
                  <div className="il-review-form__rating">
                    <span className="il-review-form__rating-label">{testimonial.ratingLabel}</span>
                    <div
                      className="il-star-input"
                      onMouseLeave={() => setHoverRating(0)}
                      role="radiogroup"
                      aria-label={testimonial.ratingLabel}
                    >
                      {[1, 2, 3, 4, 5].map((value) => (
                        <button
                          key={`rating-${value}`}
                          type="button"
                          className={`il-star-input__btn ${value <= activeStars ? "is-active" : ""}`}
                          aria-label={`${value}`}
                          aria-checked={form.rating === value}
                          role="radio"
                          onMouseEnter={() => setHoverRating(value)}
                          onClick={() => setForm((prev) => ({ ...prev, rating: value }))}
                        >
                          <i className={`${value <= activeStars ? "fas" : "far"} fa-star`}></i>
                        </button>
                      ))}
                    </div>
                  </div>
                  {errors.rating && <div className="il-review-form__error">{errors.rating}</div>}

                  <input
                    type="text"
                    name="name"
                    placeholder={testimonial.namePlaceholder}
                    value={form.name}
                    onChange={onChange}
                  />
                  {errors.name && <div className="il-review-form__error">{errors.name}</div>}

                  <input
                    type="text"
                    name="title"
                    placeholder={testimonial.titlePlaceholder}
                    value={form.title}
                    onChange={onChange}
                  />

                  <textarea
                    name="text"
                    rows="5"
                    placeholder={testimonial.reviewPlaceholder}
                    value={form.text}
                    onChange={onChange}
                  />
                  {errors.text && <div className="il-review-form__error">{errors.text}</div>}

                  <button type="submit" className="tst-btn">
                    {testimonial.submit}
                  </button>
                </form>
              )}
            </div>
          </div>,
          document.body
        )
      : null;

  return (
    <>
      <div className="row">
        <div className="col-lg-12">
          <div className="text-center">
            <div className="tst-suptitle tst-suptitle-center tst-mb-15">{testimonial.subtitle}</div>
            <h3 className="tst-mb-30" dangerouslySetInnerHTML={{ __html: testimonial.title }} />
            <p className="tst-text" dangerouslySetInnerHTML={{ __html: testimonial.description }} />
          </div>
        </div>
        <div className="col-lg-12">
          <Swiper
            key={`testimonials-${slides.length}`}
            {...SliderProps.testimonialsSlider}
            className="swiper-container tst-testimonials-slider tst-cursor-scroll"
          >
            {slides.map((item, key) => (
              <SwiperSlide className="swiper-slide" key={item.id || `testimonial-slider-item-${key}`}>
                <div className="tst-testimonial-card">
                  <div className="tst-quote">"</div>
                  <h5 className="tst-mb-15" dangerouslySetInnerHTML={{ __html: item.title }} />
                  <StarDisplay rating={item.rating || 5} />
                  <p className="tst-text" dangerouslySetInnerHTML={{ __html: item.text }} />
                  <div className="tst-spacer-sm"></div>
                  <div className="tst-testimonial-bottom">
                    <div className="tst-visitor">
                      <img src={item.image || DEFAULT_AVATAR} alt={item.name} />
                      <h6>{item.name}</h6>
                    </div>
                    <div className="tst-date">{item.date}</div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <div className="col-lg-12">
          <div className="tst-slider-navigation">
            <button type="button" className="tst-btn" onClick={openPopup}>
              {testimonial.button}
            </button>
            <div className="tst-slider-pagination tst-testi-pagination"></div>
            <div className="tst-nav tst-right">
              <div className="tst-label">{t.sliderNav}</div>
              <div className="tst-slider-btn tst-testi-prev"><i className="fas fa-arrow-left"></i></div>
              <div className="tst-slider-btn tst-testi-next"><i className="fas fa-arrow-right"></i></div>
            </div>
          </div>
        </div>
      </div>

      {popup}
    </>
  );
};

export default TestimonialSlider;
