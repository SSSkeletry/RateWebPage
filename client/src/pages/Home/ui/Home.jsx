import React from "react";
import styles from "./Home.module.css";
import { assets } from "../../../shared/assets/";
import "bootstrap-icons/font/bootstrap-icons.css";

const Home = () => {
  return (
    <main>
      <section className={styles.promo}>
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
        <div className={styles.sectionRow}>
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
        </div>
        <div className={styles.lineWrapper}>
          <img
            src={assets.wavyline}
            alt="Пунктирная линия"
            className={styles.wavyLine}
          />
        </div>
        <div className={styles.sectionRow}>
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
        </div>
        <div className={styles.lineWrapper}>
          <img
            src={assets.wavyline}
            alt="Пунктирная линия"
            className={styles.wavyLineAlt}
          />
        </div>
        <div className={styles.sectionRow}>
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
        </div>
      </section>
    </main>
  );
};

export default Home;
