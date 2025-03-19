import React from "react";
import promo from "../../../shared/assets/promo-vid.mp4";
import monitor from "../../../shared/assets/monitor.png";
import seo from "../../../shared/assets/seo.png";
import todo from "../../../shared/assets/todo.png";
import speed from "../../../shared/assets/speed.png";
import styles from "./Home.module.css";
import "bootstrap-icons/font/bootstrap-icons.css";

const Home = () => {
  return (
    <main>
      <section className={styles.promo}>
        <div className={styles.promoVideo}>
          <video
            src={promo}
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
      <section className={styles.howToImprove}>
        <div className={styles.stepsContainer}>
          <div className={styles.step}>
            <h1 className={styles.howToImproveTitle}>
              ЯК ПОКРАЩИТИ САЙТ ЗА 5 КРОКІВ
            </h1>
            <p>Введіть адресу вашого сайту в поле перевірки</p>
            <div className={styles.stepImage}>
              <img src={monitor} alt="Введення сайту" />
            </div>
          </div>
          <div className={styles.step}>
            <div className={styles.stepImage}>
              <img src={seo} alt="Аналіз сайту" />
            </div>
            <p>Система автоматично аналізує сайт і знаходить помилки</p>
          </div>
          <div className={styles.step}>
            <p>Детальний звіт з рекомендаціями щодо швидкості та SEO</p>
            <div className={styles.stepImage}>
              <img src={seo} alt="Звіт SEO" />
            </div>
          </div>
          <div className={styles.step}>
            <div className={styles.stepImage}>
              <img src={todo} alt="Виконання кроків" />
            </div>
            <p>Дотримуйтесь запропонованих покрокових рішень</p>
          </div>
          <div className={styles.step}>
            <p>Покращена швидкість сайту та вищі позиції у пошуку</p>
            <div className={styles.stepImage}>
              <img src={speed} alt="Ріст швидкості" />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;
