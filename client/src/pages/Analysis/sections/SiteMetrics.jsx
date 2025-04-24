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
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr auto 1fr",
                alignItems: "center",
                gap: "2rem",
              }}
            >
              <div>
                <Section title="Performance" icon="⚡">
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
                <Section title="Link Structure" icon="🔗">
                  <Metric
                    label="Internal links"
                    value={mockMetrics.internal_links}
                    bar
                  />
                  <Metric
                    label="Title length"
                    value={mockMetrics.title_length}
                    bar
                  />
                </Section>
                <Section title="Structure" icon="🏗️">
                  <Metric
                    label="Images with alt"
                    value={mockMetrics.images_with_alt}
                  />
                  <Metric label="H1 count" value={mockMetrics.h1_count} />
                  <Metric
                    label="Canonical link"
                    value={mockMetrics.canonical_link ? "✓" : "✗"}
                  />
                  <Metric
                    label="robots.txt"
                    value={mockMetrics.robots_txt_present ? "✓" : "✗"}
                  />
                  <Metric
                    label="HTTPS"
                    value={mockMetrics.uses_https ? "✓" : "✗"}
                  />
                </Section>
              </div>

              <div style={{ position: "relative", width: 200, height: 200 }}>
                <RadialBarChart
                  width={200}
                  height={200}
                  cx={100}
                  cy={100}
                  innerRadius={70}
                  outerRadius={90}
                  barSize={15}
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
                <div
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    textAlign: "center",
                    pointerEvents: "none",
                  }}
                >
                  <div style={{ fontSize: "1.75rem", fontWeight: "bold" }}>
                    {mockMetrics.optimization_score}%
                  </div>
                  <div style={{ fontSize: "1rem", color: "#666" }}>
                    Optimization
                  </div>
                </div>

                {/* 👇 Добавленные бейджи */}
                <div className={styles.badgeGroup}>
                  <Badge
                    label="SEO score"
                    success={mockMetrics.seo_score >= 70}
                  />
                  <Badge
                    label="HTTP status"
                    success={mockMetrics.http_status === 200}
                  />
                  <Badge
                    label="Accessibility"
                    success={mockMetrics.accessibility_score >= 80}
                  />
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
                    label="Canonical"
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
                    label="Security Headers"
                    success={mockMetrics.security_headers_present}
                  />
                </div>
              </div>

              <div>
                <Section title="Images" icon="🖼️">
                  <Metric
                    label="Images without alt"
                    value={mockMetrics.images_without_alt}
                  />
                  <Metric
                    label="External links"
                    value={mockMetrics.external_links}
                  />
                </Section>
                <Section title="SEO" icon="🔍">
                  <Metric
                    label="Meta description"
                    value={mockMetrics.meta_description_present ? "✓" : "✗"}
                  />
                  <Metric
                    label="Sitemap present"
                    value={mockMetrics.sitemap_present ? "✓" : "✗"}
                  />
                  <Metric
                    label="SEO Score"
                    value={`${mockMetrics.seo_score}%`}
                  />
                </Section>
                <Section title="Security" icon="🛡️">
                  <Metric
                    label="Security headers"
                    value={
                      mockMetrics.security_headers_present ? "✓" : "Missing"
                    }
                  />
                </Section>
                <Section title="Accessibility & UX" icon="🧩">
                  <Metric
                    label="Viewport tag"
                    value={mockMetrics.viewport_tag_present ? "✓" : "✗"}
                  />
                  <Metric
                    label="Mobile friendly"
                    value={mockMetrics.mobile_friendly ? "✓" : "✗"}
                  />
                  <Metric
                    label="Accessibility score"
                    value={`${mockMetrics.accessibility_score}%`}
                  />
                </Section>
                <Section title="Technical" icon="🖥️">
                  <Metric label="HTTP status" value={mockMetrics.http_status} />
                </Section>
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
