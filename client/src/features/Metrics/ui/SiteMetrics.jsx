import { useEffect, useState, useCallback } from "react";
import { Range } from "react-range";
import { motion } from "framer-motion";
import { RadialBarChart, RadialBar, PolarAngleAxis } from "recharts";
import mockMetrics from "features/Metrics/config/mockMetric";
import metricLimits from "features/Metrics/config/metricLimits";
import seoMetrics from "features/Metrics/config/seoMetric";
import styles from "./SiteMetrics.module.css";

const tabs = [
  { key: "optimization", label: "Optimization" },
  { key: "seo", label: "SEO" },
  { key: "history", label: "History" },
];

const getMetricValue = (metric) => {
  if (metric.source === "seo") return seoMetrics[metric.key];
  if (metric.key === "alt_text_coverage") {
    const total = mockMetrics.images_with_alt + mockMetrics.images_without_alt;
    return total === 0
      ? 0
      : Math.round((mockMetrics.images_with_alt / total) * 100);
  }
  return mockMetrics[metric.key];
};

const renderRange = (metric) => {
  const value = getMetricValue(metric);
  const { min, max, ascending } = metric;
  const isDecimal = Number(value) % 1 !== 0 || max - min <= 10;
  const step = isDecimal ? 0.01 : 1;
  const displayedValue = ascending ? value : max - (value - min);
  const adjustedValue = Math.round(displayedValue / step) * step;

  return (
    <Range
      step={step}
      min={min}
      max={max}
      values={[adjustedValue]}
      renderTrack={({ props, children }) => (
        <div
          {...props}
          style={{
            ...props.style,
            height: "8px",
            width: "100%",
            borderRadius: "4px",
            background:
              "linear-gradient(to right, #ef4444, rgb(236, 240, 2), #22c55e)",
            position: "relative",
          }}
        >
          {children}
        </div>
      )}
      renderThumb={({ props, isDragged }) => (
        <div
          {...props}
          style={{
            ...props.style,
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
      )}
    />
  );
};

const MetricRow = ({ metric }) => (
  <div className={styles.metricRow}>
    <div className={styles.metricHeader}>
      <span className={styles.metricLabel}>{metric.label}</span>
      <span className={styles.metricValue}>
        {getMetricValue(metric)}
        {metric.unit}
      </span>
    </div>
    {renderRange(metric)}
  </div>
);

const Section = ({ title, children }) => (
  <section className={styles.section}>
    <h3>{title}</h3>
    {children}
  </section>
);

const Badge = ({ label, success, count }) => {
  let badgeClass;
  if (typeof count === "number") {
    badgeClass =
      count === 1
        ? styles.badgeGreen
        : count === 2
        ? styles.badgeYellow
        : styles.badgeRed;
  } else {
    badgeClass = success ? styles.badgeGreen : styles.badgeRed;
  }
  return <span className={badgeClass}>{label}</span>;
};

const BadgeGroup = ({ badges }) => (
  <div className={styles.badgeGroup}>
    {badges.map((badge, idx) => (
      <Badge key={idx} {...badge} />
    ))}
  </div>
);

const Chart = ({ data, value, label }) => (
  <div className={styles.chartWrapper}>
    <RadialBarChart
      width={300}
      height={300}
      cx={150}
      cy={150}
      innerRadius={140}
      outerRadius={140}
      barSize={20}
      data={data}
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
      <div className={styles.chartValue}>{value}%</div>
      <div className={styles.chartLabelText}>{label}</div>
    </div>
  </div>
);

const renderMetricsGroup = (title, keys) => (
  <Section title={title}>
    {metricLimits
      .filter((metric) => keys.includes(metric.key))
      .map((metric) => (
        <MetricRow key={metric.key} metric={metric} />
      ))}
  </Section>
);
const HttpStatusTable = () => {
  const statuses = Object.entries(seoMetrics.http_statuses).map(
    ([url, { status, isWorking }]) => ({
      url,
      status,
      isWorking,
    })
  );

  return (
    <Section title="🌐 HTTP Statuses">
      <div className={styles.tableWrapper}>
        <table className={styles.httpTable}>
          <thead>
            <tr>
              <th>URL</th>
              <th>Status</th>
              <th>Working</th>
            </tr>
          </thead>
          <tbody>
            {statuses.map(({ url, status, isWorking }) => (
              <tr key={url}>
                <td>{url}</td>
                <td>{status}</td>
                <td>
                  <span
                    className={isWorking ? styles.statusOk : styles.statusError}
                  >
                    {isWorking ? "✅" : "❌"}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Section>
  );
};

const SiteMetrics = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState("optimization");

  const handleEscape = useCallback(
    (e) => {
      if (e.key === "Escape") onClose();
    },
    [onClose]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [handleEscape]);

  const renderOptimizationTab = () => (
    <div className={styles.metricsLayout}>
      <div className={styles.metricsLeft}>
        {renderMetricsGroup("⚡ Performance", [
          "load_time_ms",
          "first_contentful_paint_ms",
          "largest_contentful_paint_ms",
          "total_blocking_time_ms",
          "cumulative_layout_shift",
        ])}
        {renderMetricsGroup("📦 Resources", [
          "html_size_kb",
          "number_of_http_requests",
        ])}
        {renderMetricsGroup("📜 Scripts", ["third_party_scripts_count"])}
      </div>
      <div className={styles.metricsRight}>
        <Chart
          data={[
            {
              name: "Optimization",
              uv: mockMetrics.optimization_score,
              fill: "#22c55e",
            },
          ]}
          value={mockMetrics.optimization_score}
          label="Optimization"
        />
        <BadgeGroup
          badges={[
            { label: "HTTPS", success: mockMetrics.uses_https },
            { label: "Mobile Friendly", success: mockMetrics.mobile_friendly },
            {
              label: "Viewport Tag",
              success: mockMetrics.viewport_tag_present,
            },
            {
              label: "Security Headers",
              success: mockMetrics.security_headers_present,
            },
            { label: "CSS Minified", success: mockMetrics.css_minified },
            { label: "JS Minified", success: mockMetrics.js_minified },
            {
              label: "Assets Cached",
              success: mockMetrics.static_assets_cached,
            },
            {
              label: "Critical CSS",
              success: mockMetrics.critical_css_inlined,
            },
            {
              label: "Modern Images",
              success: mockMetrics.modern_image_formats_used,
            },
            { label: "Lazy Loading", success: mockMetrics.lazy_loading_used },
            { label: "HTTP/2+", success: mockMetrics.http2_or_higher },
          ]}
        />
      </div>
    </div>
  );

  const renderSeoTab = () => (
    <div className={styles.metricsLayout}>
      <div className={styles.metricsLeft}>
        <Section title="🔍 SEO Metrics">
          {metricLimits
            .filter(
              (metric) => metric.source === "seo" && metric.key !== "seo_score"
            )
            .map((metric) => (
              <MetricRow key={metric.key} metric={metric} />
            ))}
        </Section>
        <HttpStatusTable />
      </div>
      <div className={styles.metricsRight}>
        <Chart
          data={[{ name: "SEO", uv: seoMetrics.seo_score, fill: "#3b82f6" }]}
          value={seoMetrics.seo_score}
          label="SEO Score"
        />
        <BadgeGroup
          badges={[
            {
              label: "Meta Description",
              success: seoMetrics.meta_description_present,
            },
            { label: "H1 Count", count: seoMetrics.h1_count },
            { label: "Canonical Link", success: seoMetrics.canonical_link },
            { label: "Sitemap", success: seoMetrics.sitemap_present },
            { label: "Robots.txt", success: seoMetrics.robots_txt_present },
          ]}
        />
      </div>
    </div>
  );

  const renderHistoryTab = () => (
    <div className={styles.tabContent}>
      <h2>History</h2>
      <p>История изменений или сканов сайта будет отображаться здесь.</p>
    </div>
  );

  const tabContent = {
    optimization: renderOptimizationTab,
    seo: renderSeoTab,
    history: renderHistoryTab,
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
        <h2 className={styles.title}>Website Metrics</h2>
        <div className={styles.tabs}>
          {tabs.map((tab) => (
            <button
              key={tab.key}
              className={`${styles.tabButton} ${
                activeTab === tab.key ? styles.activeTab : ""
              }`}
              onClick={() => setActiveTab(tab.key)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className={styles.metricsWrapper}>{tabContent[activeTab]?.()}</div>
      </motion.div>
    </motion.div>
  );
};

export default SiteMetrics;
