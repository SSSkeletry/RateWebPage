import { useEffect } from "react";
import { motion } from "framer-motion";
import { RadialBarChart, RadialBar, PolarAngleAxis } from "recharts";
import styles from "../ui/Analysis.module.css";

const mockMetrics = {
  load_time_ms: 1200,
  page_size_kb: 120,
  first_contentful_paint_ms: 1800,
  largest_contentful_paint_ms: 2100,
  total_blocking_time_ms: 150,
  cumulative_layout_shift: 0.05,
  internal_links: 105,
  external_links: 36,
  images_with_alt: 100,
  images_without_alt: 4,
  h1_count: 1,
  meta_description_present: true,
  title_length: 60,
  canonical_link: true,
  sitemap_present: true,
  robots_txt_present: true,
  uses_https: true,
  security_headers_present: false,
  viewport_tag_present: true,
  mobile_friendly: true,
  accessibility_score: 92,
  http_status: 200,
  seo_score: 88.5,
  optimization_score: 82,
};

const SiteMetrics = ({ onClose }) => {
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  const optimizationData = [
    {
      name: "Optimization",
      uv: mockMetrics.optimization_score,
      fill: "#22c55e",
    },
  ];

  return (
    <motion.div
      className={styles.modalOverlay}
      onClick={onClose}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        className={styles.modalContent}
        onClick={(e) => e.stopPropagation()}
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 50, opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        <button className={styles.closeBtn} onClick={onClose}>
          ×
        </button>

        <div className={styles.metricsWrapper}>
          <div className={styles.metricsCard}>
            <div className={styles.title}>Website Metrics</div>

            <div className={styles.metricsLayout}>
              <div className={styles.metricsLeft}>
                <Section title="⚡ Performance">
                  <Metric
                    label="Load time"
                    value={`${(mockMetrics.load_time_ms / 1000).toFixed(1)} s`}
                  />
                  <Metric
                    label="Page size"
                    value={`${mockMetrics.page_size_kb} KB`}
                  />
                  <Metric
                    label="First Contentful Paint"
                    value={`${mockMetrics.first_contentful_paint_ms} ms`}
                  />
                  <Metric
                    label="Largest Contentful Paint"
                    value={`${mockMetrics.largest_contentful_paint_ms} ms`}
                  />
                  <Metric
                    label="Total Blocking Time"
                    value={`${mockMetrics.total_blocking_time_ms} ms`}
                  />
                  <Metric
                    label="CLS"
                    value={mockMetrics.cumulative_layout_shift.toFixed(2)}
                  />
                </Section>

                <Section title="🏗️ Structure & Content">
                  <Metric
                    label="Internal links"
                    value={mockMetrics.internal_links}
                  />
                  <Metric
                    label="External links"
                    value={mockMetrics.external_links}
                  />
                  <Metric
                    label="Title length"
                    value={mockMetrics.title_length}
                  />
                  <Metric label="H1 count" value={mockMetrics.h1_count} />
                  <Metric
                    label="Images with alt"
                    value={mockMetrics.images_with_alt}
                  />
                  <Metric
                    label="Images without alt"
                    value={mockMetrics.images_without_alt}
                  />
                </Section>

                <Section title="📈 Quality Scores">
                  <Metric
                    label="SEO Score"
                    value={`${mockMetrics.seo_score}%`}
                  />
                  <Metric
                    label="Accessibility score"
                    value={`${mockMetrics.accessibility_score}%`}
                  />
                  <Metric label="HTTP status" value={mockMetrics.http_status} />
                </Section>
              </div>

              <div className={styles.metricsRight}>
                <div className={styles.chartWrapper}>
                  <RadialBarChart
                    width={300}
                    height={300}
                    cx={150}
                    cy={150}
                    innerRadius={140}
                    outerRadius={140}
                    barSize={20}
                    data={optimizationData}
                    startAngle={90}
                    endAngle={-270}
                  >
                    <PolarAngleAxis
                      type="number"
                      domain={[0, 100]}
                      angleAxisId={0}
                      tick={false}
                    />
                    <RadialBar
                      minAngle={15}
                      background
                      clockWise
                      dataKey="uv"
                      cornerRadius={10}
                    />
                  </RadialBarChart>
                  <div className={styles.chartLabel}>
                    <div className={styles.chartValue}>
                      {mockMetrics.optimization_score}%
                    </div>
                    <div className={styles.chartLabelText}>Optimization</div>
                  </div>
                </div>

                <div className={styles.badgeGroup}>
                  <Badge label="HTTPS" success={mockMetrics.uses_https} />
                  <Badge
                    label="robots.txt"
                    success={mockMetrics.robots_txt_present}
                  />
                  <Badge
                    label="Sitemap"
                    success={mockMetrics.sitemap_present}
                  />
                  <Badge
                    label="Canonical link"
                    success={mockMetrics.canonical_link}
                  />
                  <Badge
                    label="Meta Description"
                    success={mockMetrics.meta_description_present}
                  />
                  <Badge
                    label="Mobile Friendly"
                    success={mockMetrics.mobile_friendly}
                  />
                  <Badge
                    label="Viewport Tag"
                    success={mockMetrics.viewport_tag_present}
                  />
                  <Badge
                    label="Security Headers"
                    success={mockMetrics.security_headers_present}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const Section = ({ title, icon, children }) => (
  <section className={styles.section}>
    <h3>
      {icon} {title}
    </h3>
    {children}
  </section>
);

const Metric = ({ label, value, bar = false }) => {
  const isNumeric = typeof value === "number" || /^[0-9.]+$/.test(value);
  return (
    <div className={styles.metric}>
      <span>{label}</span>
      {bar && isNumeric ? (
        <div className={styles.barContainer}>
          <div
            className={styles.bar}
            style={{ width: `${Math.min(parseFloat(value), 100)}%` }}
          />
          <span>{value}</span>
        </div>
      ) : (
        <strong>{value}</strong>
      )}
    </div>
  );
};

const Badge = ({ label, success }) => (
  <span className={success ? styles.badgeGreen : styles.badgeGray}>
    {label}
  </span>
);

export default SiteMetrics;
