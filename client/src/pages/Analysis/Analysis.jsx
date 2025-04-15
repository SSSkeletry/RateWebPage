import React from "react";
import styles from "./ui/Analysis.module.css";

const websites = ["example.com", "website.org", "my-site.net", "example.org"];

export default function SpeedScan() {
  return (
    <div className={styles.page}>
      <div className={styles.wrapper}>
        <div className={styles.header}>
          <div className={styles.brand}>SpeedScan</div>
          <div className={styles.planInfo}>
            <div>Про план</div>
            <div>
              Наступна перевірка:
              <br />
              15 квітня, 18:00
            </div>
          </div>
        </div>
        <h1 className={styles.title}>
          Оптимізація Завантаження
          <br />
          Веб-Сторінок
        </h1>
        <div className={styles.grid}>
          {websites.map((site) => (
            <div key={site} className={styles.card}>
              <div className={styles.site}>{site}</div>
              <div className={styles.status}>
                <span className={styles.checkmark}>✓</span> Оптимізовано
              </div>
              <div className={styles.bar}></div>
              <div className={styles.barThin}></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
