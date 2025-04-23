import { useState } from "react";
import SiteMetrics from "./SiteMetrics";

const SitesSection = ({ websites, styles }) => {
  const [selectedSite, setSelectedSite] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (site) => {
    setSelectedSite(site);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedSite(null);
    setIsModalOpen(false);
  };

  return (
    <>
      {isModalOpen && selectedSite && (
        <div className={styles.modalOverlay} onClick={closeModal}>
          <div
            className={styles.modalContent}
            onClick={(e) => e.stopPropagation()}
          >
            <button className={styles.closeBtn} onClick={closeModal}>
              ×
            </button>
            <h2>{selectedSite.title}</h2>
            <p>{selectedSite.description}</p>
            <p>
              Status: <strong>{selectedSite.status}</strong>
            </p>

            <SiteMetrics styles={styles} />
          </div>
        </div>
      )}

      <div className={styles.header}>
        <h1>Optimized Sites</h1>
        <button className={styles.filterBtn}>Filter</button>
      </div>

      <div className={styles.grid}>
        {websites.length > 0 ? (
          websites.map((site, index) => (
            <div key={index} className={styles.card}>
              <div className={styles.imagePlaceholder}></div>
              <h3>{site.title}</h3>
              <p>{site.description}</p>
              <span
                className={`${styles.status} ${
                  site.status === "not_optimized"
                    ? styles.notOptimized
                    : site.status === "optimizing"
                    ? styles.optimizing
                    : styles.optimized
                }`}
              >
                {site.status === "not_optimized"
                  ? "Не оптимизирован"
                  : site.status === "optimizing"
                  ? "Оптимизируется"
                  : "Оптимизирован"}
              </span>

              <button
                className={styles.editBtn}
                onClick={() => openModal(site)}
              >
                Докладніше
              </button>
            </div>
          ))
        ) : (
          <p>No websites available.</p>
        )}
      </div>
    </>
  );
};

export default SitesSection;
