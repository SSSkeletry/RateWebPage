const sequelize = require("./database");
const { DataTypes } = require("sequelize");

const User = sequelize.define("User", {
  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

const Website = sequelize.define("Website", {
  url: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

const WebsiteMetric = sequelize.define("WebsiteMetric", {
  load_time_ms: {
    type: DataTypes.INTEGER,
  },
  page_size_kb: {
    type: DataTypes.INTEGER,
  },
  internal_links: {
    type: DataTypes.INTEGER,
  },
  external_links: {
    type: DataTypes.INTEGER,
  },
  images_with_alt: {
    type: DataTypes.INTEGER,
  },
  images_without_alt: {
    type: DataTypes.INTEGER,
  },
  h1_count: {
    type: DataTypes.INTEGER,
  },
  http_status: {
    type: DataTypes.INTEGER,
  },
  seo_score: {
    type: DataTypes.DECIMAL(5, 2),
  },
});

User.hasMany(Website, { onDelete: "CASCADE" });
Website.belongsTo(User);

Website.hasMany(WebsiteMetric, { onDelete: "CASCADE" });
WebsiteMetric.belongsTo(Website);

module.exports = {
  sequelize,
  User,
  Website,
  WebsiteMetric,
};
