import { motion } from "framer-motion";
import styles from "../ui/Home.module.css";

const priceVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const plans = [
  {
    id: 1,
    name: "БАЗОВИЙ",
    price: "Безкоштовно",
    features: [
      "1 безкоштовний аналіз в день",
      "Обмежений доступ до інструментів",
      "Базові рекомендації оптимізації",
      "Перевірка швидкості завантаження",
      "Підтримка через email",
    ],
  },
  {
    id: 2,
    name: "СЕРЕДНІЙ",
    price: "$20/місяць",
    features: [
      "50 безкоштовних аналізів в день",
      "Повний SEO-аудит",
      "Поліпшення швидкості завантаження",
      "Оптимізація метатегів",
      "Збереження звіту",
    ],
  },
  {
    id: 3,
    name: "ПРОСУНУТИЙ",
    price: "$40/місяць",
    features: [
      "Всі можливості попередніх тарифів",
      "Безліміт безкоштовних аналізів",
      "Глибока технічна оптимізація",
      "Гнучкі налаштування звітності",
      "Моніторинг змін",
      "API-доступ",
    ],
  },
];

const Pricing = () => {
  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      <h2 className={styles.header}>ТАРИФИ</h2>
      <div className={styles.pricingContainer}>
        {plans.map((plan) => (
          <motion.div
            key={plan.id}
            className={styles.planCard}
            variants={priceVariants}
          >
            <div className={styles.planNumber}>{plan.id}</div>
            <h3 className={styles.planTitle}>{plan.name}</h3>
            <ul className={styles.planFeatures}>
              {plan.features.map((feature, i) => (
                <li key={i}>✓ {feature}</li>
              ))}
            </ul>
            <button className={styles.planButton}>
              {plan.price} <i className="bi bi-arrow-right"></i>
            </button>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
};

export default Pricing;
