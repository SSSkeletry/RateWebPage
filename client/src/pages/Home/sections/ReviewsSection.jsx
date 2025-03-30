import React from "react";
import styles from "../ui/Home.module.css";
import { motion } from "framer-motion";

const testimonials = [
  {
    name: "Анастасия",
    text: "Отличный сервис, все очень понравилось!",
    rating: 5,
  },
  {
    name: "Владимир",
    text: "Очень доволен качеством и скоростью работы!",
    rating: 4,
  },
  { name: "Екатерина", text: "Буду рекомендовать друзьям!", rating: 5 },
  {
    name: "Игорь",
    text: "Прекрасный опыт, обслуживание на высоте!",
    rating: 5,
  },
  { name: "Марина", text: "Все быстро и качественно, спасибо!", rating: 4 },
  { name: "Артем", text: "Доволен результатом, рекомендую!", rating: 5 },
];

export default function Testimonials() {
  return (
    <section className={styles["testimonials-section"]}>
      <h2 className={styles["section-title"]}>
        Отзывы <span className={styles["highlight-text"]}>Клиентов</span>
      </h2>
      <div className={styles["testimonials-container"]}>
        {testimonials.map((testimonial, index) => (
          <motion.div
            key={index}
            className={styles["testimonial-card"]}
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            viewport={{ once: false, amount: 0.3 }}
          >
            <div className={styles["card-header"]}>
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
    </section>
  );
}
