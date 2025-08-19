const { Website, WebsiteMetric } = require("../models/models");

const addWebsite = async (req, res) => {
  const { name, url } = req.body;

  try {
    const newWebsite = await Website.create({
      name,
      url,
      status: "not_optimized",
      UserId: req.user.id,
    });

    res.status(201).json(newWebsite);
  } catch (error) {
    console.error("Error creating site:", error);
    res.status(500).json({ message: "Failed to create site" });
  }
};

async function getUserWebsitesWithMetrics(req, res) {
  try {
    const websites = await Website.findAll({
      where: { UserId: req.user.id },
      include: [
        {
          model: WebsiteMetric,
          required: false,
        },
      ],
      order: [[WebsiteMetric, "createdAt", "DESC"]],
    });
    console.log("📊 Websites with metrics:", JSON.stringify(websites, null, 2));
    const result = websites.map((site) => {
      const siteJSON = site.toJSON();

      return {
        ...siteJSON,
        latestMetric: siteJSON.WebsiteMetrics?.[0] || null,
      };
    });

    res.json(result);
  } catch (err) {
    console.error("Ошибка при получении сайтов и метрик:", err);
    res.status(500).json({ error: "Ошибка при получении данных" });
  }
}

module.exports = {
  addWebsite,
  getUserWebsitesWithMetrics,
};
