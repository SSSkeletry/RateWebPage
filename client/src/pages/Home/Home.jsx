import React, { useState, useEffect } from "react";
import styles from "./ui/Home.module.css";
import { motion } from "framer-motion";
import { assets } from "../../shared/assets";
import "bootstrap-icons/font/bootstrap-icons.css";

const fadeInUp = {
  hidden: { opacity: 0, y: -50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};
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

const Home = () => {
  const [isVisible, setIsVisible] = useState({});

  useEffect(() => {
    const sections = document.querySelectorAll("[data-animate]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (
            entry.isIntersecting &&
            !isVisible[entry.target.dataset.animate]
          ) {
            setIsVisible((prev) => ({
              ...prev,
              [entry.target.dataset.animate]: true,
            }));
          }
        });
      },
      { threshold: 0.3 }
    );

    sections.forEach((section) => observer.observe(section));

    return () => sections.forEach((section) => observer.unobserve(section));
  }, [isVisible]);

  return (
    <main>
      <section className={styles.promoSection}>
        <div className={styles.promoVideo}>
          <video
            src={assets.promo}
            className={styles.circle}
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
          />
        </div>
        <article className={styles.article}>
          <h1>
            <span>ГОТОВИЙ</span> ВИВЕСТИ <span>САЙТ НА</span> НОВИЙ{" "}
            <span>РIВ</span>ЕНЬ?
          </h1>
          <p>
            Ми знаємо, як зробити твій сайт швидшим, видимішим та ефективнішим.
            Незалежно від того, чи ти запускаєш новий проект або хочеш покращити
            існуючий сайт – у нас є інструменти та досвід, щоб зробити це
            можливим.
          </p>
          <aside className={styles.promoStats}>
            <ul>
              <li>
                <span className={styles.num}>3+</span>
                <span>Років досвіду</span>
              </li>
              <li>
                <span className={styles.num}>200+</span>
                <span>Оптимізованих сайтів</span>
              </li>
              <li>
                <span className={styles.num}>100+</span>
                <span>Покращенних позицій</span>
              </li>
            </ul>
          </aside>
          <nav>
            <button className={styles.btnCustom}>
              <span>Почніть оптимізацію зараз</span>
              <i className={`bi bi-caret-right ${styles.btnIcon}`}></i>
            </button>
          </nav>
        </article>
      </section>

      <section className={styles.howItWorksContainer}>
        <motion.div
          data-animate="step1"
          initial="hidden"
          animate={isVisible["step1"] ? "visible" : "hidden"}
          variants={fadeInUp}
          className={styles.sectionRow}
        >
          <h2 className={styles.sectionTitle}>ЯК ПОКРАЩИТИ САЙТ ЗА 5 КРОКІВ</h2>
          <div className={styles.lineWrapper}>
            <img
              src={assets.line}
              alt="Пунктирная линия"
              className={styles.dashedLine}
            />
          </div>
          <div className={styles.imageWrapper}>
            <p className={styles.descriptionText}>
              Введіть адресу вашого сайту в поле перевірки
            </p>
            <img src={assets.url} alt="Картинка" className={styles.icon} />
          </div>
        </motion.div>

        <motion.img
          data-animate="wavyline1"
          initial="hidden"
          animate={isVisible["wavyline1"] ? "visible" : "hidden"}
          variants={fadeInUp}
          src={assets.wavyline}
          alt="Пунктирная линия"
          className={styles.wavyLine}
        />

        <motion.div
          data-animate="step2"
          initial="hidden"
          animate={isVisible["step2"] ? "visible" : "hidden"}
          variants={fadeInUp}
          className={styles.sectionRow}
        >
          <div className={styles.textCenter}>
            <img src={assets.seo} alt="Картинка" className={styles.icon} />
            <p className={styles.descriptionText}>
              Детальний звіт з рекомендаціями щодо швидкості та SEO
            </p>
          </div>
          <div className={styles.lineWrapper}>
            <img
              src={assets.line}
              alt="Пунктирная линия"
              className={styles.dashedLineAlt}
            />
          </div>
          <div className={styles.textCenter}>
            <img src={assets.monitor} alt="Картинка" className={styles.icon} />
            <p className={styles.descriptionText}>
              Система автоматично аналізує сайт і знаходить помилки
            </p>
          </div>
        </motion.div>

        <motion.img
          data-animate="wavyline2"
          initial="hidden"
          animate={isVisible["wavyline2"] ? "visible" : "hidden"}
          variants={fadeInUp}
          src={assets.wavyline}
          alt="Пунктирная линия"
          className={styles.wavyLineAlt}
        />

        <motion.div
          data-animate="step3"
          initial="hidden"
          animate={isVisible["step3"] ? "visible" : "hidden"}
          variants={fadeInUp}
          className={styles.sectionRow}
        >
          <div className={styles.textCenter}>
            <img src={assets.todo} alt="Картинка" className={styles.icon} />
            <p className={styles.descriptionText}>
              Дотримуйтесь запропонованих покрокових рішень
            </p>
          </div>
          <div className={styles.lineWrapper}>
            <img
              src={assets.line}
              alt="Пунктирная линия"
              className={styles.dashedLineAlt}
            />
          </div>
          <div className={styles.textCenter}>
            <img src={assets.speed} alt="Картинка" className={styles.icon} />
            <p className={styles.descriptionText}>
              Отримайте покращену швидкість сайту та вищі позиції у пошуку
            </p>
          </div>
        </motion.div>
      </section>

      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <div className={styles.header}>ТАРИФИ</div>
        <div className={styles.pricingContainer}>
          {plans.map((plan) => (
            <motion.div
              key={plan.id}
              className={styles.planCard}
              variants={priceVariants}
            >
              <div className={styles.planNumber}>{plan.id}</div>
              <h2 className={styles.planTitle}>{plan.name}</h2>
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
    </main>
  );
};

export default Home;
