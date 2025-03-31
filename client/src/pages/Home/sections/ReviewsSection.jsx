import React from "react";
import styles from "../ui/Home.module.css";
import { motion } from "framer-motion";
import { assets } from "../../../shared/assets/index";

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
  return (
    <section className={styles["testimonials-section"]}>
      <h2 className={styles["section-title"]}>
        ВІДГУКИ <span className={styles["highlight-text"]}>КЛІЄНТІВ</span>
      </h2>
      <div className={styles["testimonials-wrapper"]}>
        <div className={styles["testimonials-container"]}>
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              className={styles["testimonial-card"]}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className={styles["card-header"]}>
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className={styles["avatar-image"]}
                />
                <div className={styles["rating-stars"]}>
                  {"★".repeat(testimonial.rating)}
                </div>
              </div>
              <p className={styles["testimonial-text"]}>
                &quot;{testimonial.text}&quot;
              </p>
              <div className={styles["card-footer"]}>
                <h4 className={styles["user-name"]}>{testimonial.name}</h4>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
