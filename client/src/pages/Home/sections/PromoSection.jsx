import styles from "../ui/Home.module.css";
import { assets } from "shared/assets/index";
import "bootstrap-icons/font/bootstrap-icons.css";

const PromoSection = () => {
  return (
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
      </article>
    </section>
  );
};

export default PromoSection;
