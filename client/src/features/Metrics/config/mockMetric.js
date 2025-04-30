const optimizationMetrics = {
  load_time_ms: 1000,
  page_size_kb: 120,
  html_size_kb: 115,
  first_contentful_paint_ms: 1800,
  largest_contentful_paint_ms: 2100,
  total_blocking_time_ms: 200,
  cumulative_layout_shift: 0.05,

  number_of_http_requests: 50,
  third_party_scripts_count: 5,

  css_minified: true,
  js_minified: true,
  static_assets_cached: true,
  critical_css_inlined: false,

  uses_https: true,
  http2_or_higher: true,
  security_headers_present: true,

  viewport_tag_present: true,
  mobile_friendly: true,
  modern_image_formats_used: true,
  lazy_loading_used: true,

  accessibility_score: 92,
  optimization_score: 82,
};

export default optimizationMetrics;
