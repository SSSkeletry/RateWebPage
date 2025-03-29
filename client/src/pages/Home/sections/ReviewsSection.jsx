import React, { useState } from "react";
import styles from "../ui/Home.module.css";
import { motion } from "framer-motion";
import "bootstrap-icons/font/bootstrap-icons.css";

const reviews = [
  { id: 1, text: "Отличный сервис!", author: "Анна" },
  { id: 2, text: "Очень доволен покупкой.", author: "Иван" },
  { id: 3, text: "Быстрая доставка и качество на высоте.", author: "Мария" },
  { id: 4, text: "Буду заказывать снова!", author: "Сергей" },
];

const ReviewsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevReview = () => {
    setCurrentIndex((prev) => (prev === 0 ? reviews.length - 1 : prev - 1));
  };

  const nextReview = () => {
    setCurrentIndex((prev) => (prev === reviews.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className={styles.carouselContainer}>
      <button onClick={prevReview} className={styles.arrowButton}>
        <i className="bi bi-arrow-left-circle"></i>
      </button>
      <div className={styles.carouselWrapper}>
        {reviews.map((review, index) => {
          let xOffset = 0;
          let scale = 1;
          let opacity = 1;
          let zIndex = 3;

          if (index === (currentIndex - 1 + reviews.length) % reviews.length) {
            xOffset = -150; // Смещение влево
            scale = 0.9;
            opacity = 0.7;
            zIndex = 2;
          } else if (index === (currentIndex + 1) % reviews.length) {
            xOffset = 150; // Смещение вправо
            scale = 0.9;
            opacity = 0.7;
            zIndex = 2;
          } else if (index !== currentIndex) {
            opacity = 0; // Скрываем остальные
            scale = 0.8;
            zIndex = 1;
          }

          return (
            <motion.div
              key={review.id}
              className={styles.reviewCard}
              initial={{ x: 0, scale: 0.8, opacity: 0 }}
              animate={{ x: xOffset, scale, opacity }}
              transition={{ duration: 0.5 }}
              style={{ position: "absolute", zIndex }}
            >
              <div className={styles.cardContent}>
                <p className={styles.reviewText}>{review.text}</p>
                <p className={styles.reviewAuthor}>— {review.author}</p>
              </div>
            </motion.div>
          );
        })}
      </div>
      <button onClick={nextReview} className={styles.arrowButton}>
        <i className="bi bi-arrow-right-circle"></i>
      </button>
    </div>
  );
};

export default ReviewsSection;
