import { useEffect } from "react";
import { Range } from "react-range";
import { motion } from "framer-motion";
import { RadialBarChart, RadialBar, PolarAngleAxis } from "recharts";
import styles from "./SiteMetrics.module.css";

const mockMetrics = {
  load_time_ms: 1000,
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

const minMaxMetrics = [
  {
    key: "load_time_ms",
    label: "Load Time",
    unit: "ms",
    min: 0,
    max: 4000,
    thresholds: { good: 1000, medium: 3000 },
    ascending: false,
  },
  {
    key: "page_size_kb",
    label: "Page Size",
    unit: "KB",
    min: 0,
    max: 2000,
    thresholds: { good: 500, medium: 1500 },
    ascending: false,
  },
  {
    key: "first_contentful_paint_ms",
    label: "First Contentful Paint",
    unit: "ms",
    min: 0,
    max: 4000,
    thresholds: { good: 1000, medium: 3000 },
    ascending: false,
  },
  {
    key: "largest_contentful_paint_ms",
    label: "Largest Contentful Paint",
    unit: "ms",
    min: 0,
    max: 5000,
    thresholds: { good: 2500, medium: 4000 },
    ascending: false,
  },
  {
    key: "total_blocking_time_ms",
    label: "Total Blocking Time",
    unit: "ms",
    min: 0,
    max: 1000,
    thresholds: { good: 200, medium: 600 },
    ascending: false,
  },
  {
    key: "cumulative_layout_shift",
    label: "Cumulative Layout Shift",
    unit: "",
    min: 0,
    max: 1,
    thresholds: { good: 0.1, medium: 0.25 },
    ascending: false,
  },
  {
    key: "internal_links",
    label: "Internal Links",
    unit: "",
    min: 0,
    max: 600,
    thresholds: { good: 50, medium: 200 },
    ascending: true,
  },
  {
    key: "external_links",
    label: "External Links",
    unit: "",
    min: 0,
    max: 120,
    thresholds: { good: 5, medium: 50 },
    ascending: false,
  },
  {
    key: "alt_text_coverage",
    label: "Images With Alt (%)",
    unit: "%",
    min: 0,
    max: 100,
    thresholds: { good: 95, medium: 70 },
    ascending: true,
  },
  {
    key: "h1_count",
    label: "H1 Count",
    unit: "",
    min: 0,
    max: 5,
    thresholds: { good: 1, medium: 2 },
    ascending: false,
  },
  {
    key: "title_length",
    label: "Title Length",
    unit: "chars",
    min: 0,
    max: 100,
    thresholds: { good: 65, medium: 49 },
    ascending: true,
  },
  {
    key: "accessibility_score",
    label: "Accessibility Score",
    unit: "",
    min: 0,
    max: 100,
    thresholds: { good: 90, medium: 70 },
    ascending: true,
  },
  {
    key: "seo_score",
    label: "SEO Score",
    unit: "",
    min: 0,
    max: 100,
    thresholds: { good: 90, medium: 70 },
    ascending: true,
  },
  {
    key: "optimization_score",
    label: "Optimization Score",
    unit: "",
    min: 0,
    max: 100,
    thresholds: { good: 90, medium: 70 },
    ascending: true,
  },
  {
    key: "http_status",
    label: "HTTP Status",
    unit: "",
    min: 0,
    max: 600,
    thresholds: { good: 200, medium: 302 },
    ascending: false,
  },
];

const getMetricValue = (metric) => {
  if (metric.key === "alt_text_coverage") {
    const totalImages =
      mockMetrics.images_with_alt + mockMetrics.images_without_alt;
    return totalImages === 0
      ? 0
      : Math.round((mockMetrics.images_with_alt / totalImages) * 100);
  }
  return mockMetrics[metric.key];
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

  const renderRange = (metric) => {
    const value = getMetricValue(metric);
    const { min, max, ascending } = metric;

    let displayedValue;
    if (ascending) {
      displayedValue = value;
    } else {
      displayedValue = max - (value - min);
    }

    return (
      <Range
        step={1}
        min={min}
        max={max}
        values={[displayedValue]}
        onChange={() => {}}
        renderTrack={({ props, children }) => {
          const { key, ...restProps } = props;
          return (
            <div
              {...restProps}
              key={key}
              style={{
                ...restProps.style,
                height: "6px",
                width: "100%",
                background: "linear-gradient(to right, red, orange, green)",
                borderRadius: "3px",
              }}
            >
              {children}
            </div>
          );
        }}
        renderThumb={({ props }) => {
          const { key, ...restProps } = props;
          return (
            <div
              {...restProps}
              key={key}
              style={{
                ...restProps.style,
                height: "16px",
                width: "16px",
                backgroundColor: "#999",
                borderRadius: "50%",
                border: "2px solid white",
              }}
            />
          );
        }}
      />
    );
  };

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
                  {minMaxMetrics
                    .filter((metric) =>
                      [
                        "load_time_ms",
                        "first_contentful_paint_ms",
                        "largest_contentful_paint_ms",
                        "total_blocking_time_ms",
                        "cumulative_layout_shift",
                      ].includes(metric.key)
                    )
                    .map((metric) => (
                      <div key={metric.key} className={styles.metricRow}>
                        <div className={styles.metricHeader}>
                          <span className={styles.metricLabel}>
                            {metric.label}
                          </span>
                          <span className={styles.metricValue}>
                            {getMetricValue(metric)}
                            {metric.unit}
                          </span>
                        </div>
                        {renderRange(metric)}
                      </div>
                    ))}
                </Section>

                <Section title="🏗️ Structure & Content">
                  {minMaxMetrics
                    .filter((metric) =>
                      [
                        "internal_links",
                        "external_links",
                        "title_length",
                        "h1_count",
                        "alt_text_coverage",
                      ].includes(metric.key)
                    )
                    .map((metric) => (
                      <div key={metric.key} className={styles.metricRow}>
                        <div className={styles.metricHeader}>
                          <span className={styles.metricLabel}>
                            {metric.label}
                          </span>
                          <span className={styles.metricValue}>
                            {getMetricValue(metric)}
                            {metric.unit}
                          </span>
                        </div>
                        {renderRange(metric)}
                      </div>
                    ))}
                </Section>

                <Section title="📈 Quality Scores">
                  {minMaxMetrics
                    .filter((metric) =>
                      [
                        "seo_score",
                        "accessibility_score",
                        "http_status",
                      ].includes(metric.key)
                    )
                    .map((metric) => (
                      <div key={metric.key} className={styles.metricRow}>
                        <div className={styles.metricHeader}>
                          <span className={styles.metricLabel}>
                            {metric.label}
                          </span>
                          <span className={styles.metricValue}>
                            {getMetricValue(metric)}
                            {metric.unit}
                          </span>
                        </div>
                        {renderRange(metric)}
                      </div>
                    ))}
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

const Section = ({ title, children }) => (
  <section className={styles.section}>
    <h3>{title}</h3>
    {children}
  </section>
);

const Badge = ({ label, success }) => (
  <span className={success ? styles.badgeGreen : styles.badgeRed}>{label}</span>
);

export default SiteMetrics;
