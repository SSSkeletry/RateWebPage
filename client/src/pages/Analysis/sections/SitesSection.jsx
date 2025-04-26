import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import SiteMetrics from "../../../entities/siteMetrics/ui/SiteMetrics";

const SitesSection = ({ websites, styles }) => {
  const [selectedSite, setSelectedSite] = useState(null);

  const openModal = (site) => {
    setSelectedSite(site);
  };

  const closeModal = () => {
    setSelectedSite(null);
  };

  return (
    <>
      <AnimatePresence>
        {selectedSite && (
          <SiteMetrics
            key="site-metrics"
            site={selectedSite}
            onClose={closeModal}
          />
        )}
      </AnimatePresence>

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
