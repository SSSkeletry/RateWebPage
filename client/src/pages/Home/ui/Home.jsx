import React from "react";
import promo from "../../../shared/assets/promo-vid.mp4";
import "./Home.module.css";
import "bootstrap-icons/font/bootstrap-icons.css";

const Home = () => {
  return (
    <main>
      <section className="promo">
        <div className="promo-video">
          <video
            src={promo}
            alt="Оптимізація"
            className="circle"
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
          />
        </div>
        <article>
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
          <aside className="promo-stats">
            <ul>
              <li>
                <span className="num">3+</span>
                <span>Років досвіду</span>
              </li>
              <li>
                <span className="num">200+</span>
                <span>Оптимізованих сайтів</span>
              </li>
              <li>
                <span className="num">100+</span>
                <span>Покращенних позицій</span>
              </li>
            </ul>
          </aside>
          <nav>
            <button className="btn-custom">
              <span>Почніть оптимізацію зараз</span>
              <i className="bi bi-caret-right btn-icon"></i>
            </button>
          </nav>
        </article>
      </section>
      <section className="how-it-works">
        <h1>ЯК ПОКРАЩИТИ САЙТ ЗА 5 КРОКІВ </h1>
      </section>
    </main>
  );
};
export default Home;
