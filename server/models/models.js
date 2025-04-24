const sequelize = require("./database");
const { DataTypes } = require("sequelize");

const User = sequelize.define(
  "User",
  {
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  { timestamps: true }
);

const Plan = sequelize.define(
  "Plan",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    maxWebsites: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
    },
    features: {
      type: DataTypes.JSON,
      allowNull: true,
    },
  },
  { timestamps: true }
);

const Website = sequelize.define(
  "Website",
  {
    url: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isUrl: true,
      },
    },
    name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    status: {
      type: DataTypes.ENUM("not_optimized", "optimizing", "optimized"),
      defaultValue: "not_optimized",
      allowNull: false,
    },
    lastCheckedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  { timestamps: true }
);

const WebsiteMetric = sequelize.define(
  "WebsiteMetric",
  {
    load_time_ms: DataTypes.INTEGER,
    page_size_kb: DataTypes.INTEGER,
    first_contentful_paint_ms: DataTypes.INTEGER,
    largest_contentful_paint_ms: DataTypes.INTEGER,
    total_blocking_time_ms: DataTypes.INTEGER,
    cumulative_layout_shift: DataTypes.DECIMAL(4, 3),

    internal_links: DataTypes.INTEGER,
    external_links: DataTypes.INTEGER,

    images_with_alt: DataTypes.INTEGER,
    images_without_alt: DataTypes.INTEGER,

    h1_count: DataTypes.INTEGER,
    meta_description_present: DataTypes.BOOLEAN,
    title_length: DataTypes.INTEGER,
    canonical_link: DataTypes.BOOLEAN,
    sitemap_present: DataTypes.BOOLEAN,
    robots_txt_present: DataTypes.BOOLEAN,

    uses_https: DataTypes.BOOLEAN,
    security_headers_present: DataTypes.BOOLEAN,

    viewport_tag_present: DataTypes.BOOLEAN,
    mobile_friendly: DataTypes.BOOLEAN,
    accessibility_score: DataTypes.DECIMAL(5, 2),

    http_status: DataTypes.INTEGER,
    seo_score: DataTypes.DECIMAL(5, 2),

    optimization_score: {
      type: DataTypes.DECIMAL(5, 2),
      allowNull: true,
    },
  },
  { timestamps: true }
);

User.hasMany(Website, { onDelete: "CASCADE" });
Website.belongsTo(User);

Website.hasMany(WebsiteMetric, { onDelete: "CASCADE" });
WebsiteMetric.belongsTo(Website);

Plan.hasMany(User);
User.belongsTo(Plan);

module.exports = {
  sequelize,
  User,
  Website,
  WebsiteMetric,
  Plan,
};
