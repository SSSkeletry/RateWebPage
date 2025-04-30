const seoMetrics = {
  internal_links: 105,
  external_links: 36,
  images_with_alt: 80,
  images_without_alt: 4,
  h1_count: 1,
  meta_description_present: true,
  title_length: 60,
  canonical_link: true,
  sitemap_present: true,
  robots_txt_present: true,
  http_statuses: {
    "https://example.com/": { status: 200, isWorking: true },
    "https://example.com/about": { status: 200, isWorking: true },
    "https://example.com/missing": { status: 404, isWorking: false },
    "https://example.com/redirect": { status: 301, isWorking: true },
    "https://example.com/server-error": { status: 500, isWorking: false },
  },
  seo_score: 52,
};
export default seoMetrics;
