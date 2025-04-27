import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import styles from "../ui/Home.module.css";
import { assets } from "shared/assets/index";
import { useEffect, useRef, useState, useMemo } from "react";

const testimonials = [
  {
    name: "Анастасия",
    text: "Вражена якістю програмного забезпечення! Аналіз технік завантаження веб-сторінок дозволив оптимізувати наш сайт, зменшивши час завантаження на 40%.",
    rating: 5,
    image: assets.woman,
  },
  {
    name: "Владимир",
    text: "Дуже корисний інструмент для розробників. Система надає детальні звіти та рекомендації, завдяки чому вдалося значно покращити продуктивність сайту.",
    rating: 4,
    image: assets.man,
  },
  {
    name: "Екатерина",
    text: "Раніше наш сайт мав проблеми з швидкістю, але після використання цієї системи ми змогли підняти показники Google PageSpeed майже до 100 балів!",
    rating: 5,
    image: assets.woman2,
  },
  {
    name: "Игорь",
    text: "Простий та ефективний інструмент для аналізу. Допоміг виявити слабкі місця нашого коду та виправити їх без значних зусиль.",
    rating: 5,
    image: assets.man2,
  },
  {
    name: "Марина",
    text: "Дуже зручний сервіс! Всі рекомендації були чіткими і зрозумілими, що значно спростило оптимізацію веб-ресурсу.",
    rating: 4,
    image: assets.woman3,
  },
  {
    name: "Артем",
    text: "Швидкість завантаження сторінок має величезне значення, і цей аналізатор став незамінним помічником у нашій роботі. Рекомендую!",
    rating: 5,
    image: assets.man3,
  },
];

const renderStars = (count) =>
  [...Array(5)].map((_, i) => <span key={i}>{i < count ? "★" : "☆"}</span>);

export default function Testimonials() {
  const sliderOptions = useMemo(
    () => ({
      loop: true,
      renderMode: "performance",
      drag: true,
      slides: {
        perView: "auto",
        spacing: 15,
      },
    }),
    []
  );

  const [sliderRef, slider] = useKeenSlider(sliderOptions);

  const containerRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!containerRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.3 }
    );

    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  const timeoutRef = useRef();

  useEffect(() => {
    if (!slider.current || !isVisible) return;

    const runSlider = () => {
      if (!slider.current) return;

      const nextIndex = slider.current.track.details.abs + 1;
      slider.current.moveToIdx(nextIndex, true, {
        duration: 30000,
      });

      timeoutRef.current = setTimeout(runSlider, 10000);
    };

    runSlider();

    return () => clearTimeout(timeoutRef.current);
  }, [slider, isVisible]);

  return (
    <section className={styles["testimonials-section"]} ref={containerRef}>
      <h2 className={styles["section-title"]}>
        ВІДГУКИ <span className={styles["highlight-text"]}>КЛІЄНТІВ</span>
      </h2>

      <div ref={sliderRef} className={`keen-slider ${styles["slider"]}`}>
        {testimonials.map((testimonial, i) => (
          <div
            key={i}
            className={`keen-slider__slide ${styles["testimonial-slide"]}`}
          >
            <div className={styles["testimonial-card"]}>
              <div className={styles["card-header"]}>
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  loading="lazy"
                  className={styles["avatar-image"]}
                />
                <div className={styles["rating-stars"]}>
                  {renderStars(testimonial.rating)}
                </div>
              </div>
              <p className={styles["testimonial-text"]}>
                &quot;{testimonial.text}&quot;
              </p>
              <div className={styles["card-footer"]}>
                <h4 className={styles["user-name"]}>{testimonial.name}</h4>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
