import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import styles from "../ui/Home.module.css";
import { assets } from "../../../shared/assets/index";
import { useEffect, useRef, useState } from "react";

const testimonials = [
  {
    name: "Анастасия",
    text: "Вражена якістю програмного забезпечення! Аналіз технік швидкого завантаження веб-сторінок дозволив оптимізувати наш сайт, зменшивши час завантаження на 40%.",
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

export default function Testimonials() {
  const [sliderRef, slider] = useKeenSlider({
    loop: true,
    renderMode: "performance",
    drag: true,
    slides: {
      perView: "auto",
      spacing: 15,
    },
  });

  const containerRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      {
        threshold: 0.3, // 30% элемента должно быть видно
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, []);
  useEffect(() => {
    if (!slider.current) return;

    let timeout;

    const runSlider = () => {
      if (!slider.current || !isVisible) return;

      const nextIndex = slider.current.track.details.abs + 1;
      slider.current.moveToIdx(nextIndex, true, {
        duration: 30000,
      });

      timeout = setTimeout(runSlider, 10000);
    };

    if (isVisible) {
      runSlider();
    }

    return () => {
      clearTimeout(timeout);
    };
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
                  className={styles["avatar-image"]}
                />
                <div className={styles["rating-stars"]}>
                  {[...Array(5)].map((_, index) => (
                    <span key={index}>
                      {index < testimonial.rating ? "★" : "☆"}
                    </span>
                  ))}
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
