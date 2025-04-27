import { useEffect } from "react";
import { Range } from "react-range";
import { motion } from "framer-motion";
import { RadialBarChart, RadialBar, PolarAngleAxis } from "recharts";
import mockMetrics from "features/Metrics/config/mockMetric";
import metricLimits from "features/Metrics/config/metricLimits";
import styles from "./SiteMetrics.module.css";

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

    const isDecimal = Number(value) % 1 !== 0 || max - min <= 10;
    const step = isDecimal ? 0.01 : 1;

    let displayedValue;
    if (ascending) {
      displayedValue = value;
    } else {
      displayedValue = max - (value - min);
    }

    const adjustedValue = Math.round(displayedValue / step) * step;

    return (
      <Range
        step={step}
        min={min}
        max={max}
        values={[adjustedValue]}
        onChange={() => {}}
        renderTrack={({ props, children }) => {
          const { key, ...restProps } = props;
          return (
            <div
              {...restProps}
              key={key}
              style={{
                ...restProps.style,
                height: "8px",
                width: "100%",
                borderRadius: "4px",
                background:
                  "linear-gradient(to right, #ef4444,rgb(236, 240, 2), #22c55e)",
                position: "relative",
              }}
            >
              {children}
            </div>
          );
        }}
        renderThumb={({ props, isDragged }) => {
          const { key, ...restProps } = props;
          return (
            <div
              {...restProps}
              key={key}
              style={{
                ...restProps.style,
                height: "15px",
                width: "15px",
                borderRadius: "50%",
                background: isDragged ? "#22c55e" : "#ffffff",
                border: "3px solid #22c55e",
                boxShadow: "0 2px 8px rgba(34,197,94,0.4)",
                transition:
                  "background-color 0.2s ease, box-shadow 0.2s ease, transform 1s ease",
                transform: isDragged ? "scale(1.1)" : "scale(1)",
                pointerEvents: "none",
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
                  {metricLimits
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
                  {metricLimits
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
                  {metricLimits
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
