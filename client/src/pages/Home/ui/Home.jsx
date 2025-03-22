import React from "react";
import styles from "./Home.module.css";
import { assets } from "../../../shared/assets/";
import "bootstrap-icons/font/bootstrap-icons.css";

const steps = [
  {
    img: assets.seo,
    text: "Детальний звіт з рекомендаціями щодо швидкості та SEO",
  },
  {
    img: assets.monitor,
    text: "Система автоматично аналізує сайт і знаходить помилки",
  },
  { img: assets.todo, text: "Дотримуйтесь запропонованих покрокових рішень" },
  {
    img: assets.speed,
    text: "Отримайте покращену швидкість сайту та вищі позиції у пошуку.",
  },
];

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

      <section className={styles.container}>
        <div className={styles.twoColumnSection}>
          <h2 className={styles.heading}>ЯК ПОКРАЩИТИ САЙТ ЗА 5 КРОКІВ </h2>
          <div className={styles.lineBlock}>
            <img
              src={assets.line}
              alt="Пунктирная линия"
              className={styles.puncturedLineImage}
            />
          </div>
          <div className={styles.imageBlock}>
            <p className={styles.imageText}>
              Введіть адресу вашого сайту в поле перевірки
            </p>
            <img src={assets.url} alt="Картинка" className={styles.image} />
          </div>
        </div>
        <div className={styles.lineBlock}>
          <img
            src={assets.wavyline}
            alt="Пунктирная линия"
            className={styles.wavyLine}
          />
        </div>
        <div className={styles.twoColumnSection}>
          <div className={styles.item}>
            <img src={assets.seo} alt="Картинка" className={styles.image} />
            <p className={styles.imageText}>{steps[0].text}</p>
          </div>
          <div className={styles.lineBlock}>
            <img
              src={assets.line}
              alt="Пунктирная линия"
              className={styles.puncturedLineImage2}
            />
          </div>
          <div className={styles.item}>
            <img src={assets.monitor} alt="Картинка" className={styles.image} />
            <p className={styles.imageText}>{steps[1].text}</p>
          </div>
        </div>
        <div className={styles.lineBlock}>
          <img
            src={assets.wavyline}
            alt="Пунктирная линия"
            className={styles.wavyLine2}
          />
        </div>
        <div className={styles.twoColumnSection}>
          <div className={styles.item}>
            <img src={assets.todo} alt="Картинка" className={styles.image} />
            <p className={styles.imageText}>{steps[2].text}</p>
          </div>
          <div className={styles.lineBlock}>
            <img
              src={assets.line}
              alt="Пунктирная линия"
              className={styles.puncturedLineImage2}
            />
          </div>
          <div className={styles.item}>
            <img src={assets.speed} alt="Картинка" className={styles.image} />
            <p className={styles.imageText}>{steps[3].text}</p>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;
