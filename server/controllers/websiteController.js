const { Website } = require("../models/models");

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

module.exports = {
  addWebsite,
};
