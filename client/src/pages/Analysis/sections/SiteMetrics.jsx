import styles from "../ui/Analysis.module.css";

const SiteMetrics = () => {
  return (
    <div className={styles.metricsWrapper}>
      <div className={styles.metricsCard}>
        <h2 className={styles.title}>Website Metrics</h2>

        <div className={styles.metricsGrid}>
          <section>
            <h3>💻 Performance</h3>
            <Metric label="Load time" value="845 ms" />
            <Metric label="Page size" value="1200 KB" />
            <Metric label="First Contentful Paint" value="1280 ms" />
            <Metric label="LCP" value="2100 ms" />
            <Metric label="CLISS" value="0.05" />
          </section>

          <section>
            <h3>🖼️ Images</h3>
            <Metric label="Images with alt" value="100" bar />
            <Metric label="Images without alt" value="10" bar />
          </section>

          <section>
            <h3>🔗 Link Structure</h3>
            <Metric label="Internal links" value="115" bar />
            <Metric label="External links" value="30" bar />
          </section>

          <section>
            <h3>📋 SEO</h3>
            <Metric label="H1 count" value="1" />
            <Metric label="Meta description" value="✓" />
            <Metric label="Title length" value="45" bar />
            <Metric label="Sitemap present" value="✓" />
            <Metric label="Robots.txt present" value="✓" />
          </section>

          <section>
            <h3>🛡️ Security</h3>
            <Metric label="Uses HTTPS" value="✓" />
            <Metric label="Security headers present" value="✓" />
          </section>

          <section>
            <h3>📱 Responsiveness & Accessibility</h3>
            <Metric label="Viewport tag present" value="✓" />
            <Metric label="Mobile-friendly" value="✓" />
          </section>

          <section>
            <h3>✅ Summary</h3>
            <Metric label="HTTP status" value="200" badge />
            <Metric label="SEO score" value="200" badge />
            <Metric label="Accessibility" value="92" badge />
          </section>
        </div>
      </div>
    </div>
  );
};

const Metric = ({ label, value, bar = false, badge = false }) => {
  return (
    <div className={styles.metric}>
      <span>{label}</span>
      {badge ? (
        <span className={styles.badge}>{value}</span>
      ) : bar ? (
        <div className={styles.barContainer}>
          <div
            className={styles.bar}
            style={{ width: `${Math.min(parseInt(value), 100)}%` }}
          />
          <span>{value}</span>
        </div>
      ) : (
        <strong>{value}</strong>
      )}
    </div>
  );
};

export default SiteMetrics;
