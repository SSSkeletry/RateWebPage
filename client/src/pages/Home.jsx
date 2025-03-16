import React from "react";
import promo from "../assets/images/maingif.mp4";
import "../assets/styles/home.css";
const Home = () => {
  return (
    <>
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
            />
          </div>
          <article className="promo-text">
            <h1>ГОТОВИЙ ВИВЕСТИ САЙТ НА НОВИЙ РІВЕНЬ?</h1>
            <p>
              Ми знаємо, як зробити твій сайт швидшим, видимішим та
              ефективнішим. Незалежно від того, чи ти запускаєш новий проект або
              хочеш покращити існуючий сайт – у нас є інструменти та досвід, щоб
              зробити це можливим.
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
              <button class="btn">Почніть оптимізацію зараз</button>
            </nav>
          </article>
        </section>
      </main>
    </>
  );
};
export default Home;
