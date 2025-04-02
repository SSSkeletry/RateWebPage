import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import styles from "../ui/Home.module.css";
import { assets } from "../../../shared/assets/index";

const fadeInUp = {
  hidden: { opacity: 0, y: -50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

const HowItWorks = () => {
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
  );
};

export default HowItWorks;
