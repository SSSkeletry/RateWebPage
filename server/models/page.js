const { DataTypes } = require('sequelize');
const sequelize = require('./database');

const Page = sequelize.define('Page', {
  url: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  loadTime: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  size: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  requests: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

module.exports = Page;