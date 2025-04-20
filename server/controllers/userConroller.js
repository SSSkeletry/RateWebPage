const { User, Plan, Website } = require("../models/models");

const getProfile = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id, {
      include: [
        {
          model: Plan,
          attributes: ["name"],
        },
        {
          model: Website,
          attributes: ["id", "name", "url", "status"],
        },
      ],
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const websites = user.Websites.map((site) => ({
      title: site.name || site.url,
      description: site.url,
      status: site.status,
    }));

    res.json({
      user: {
        email: user.email,
        name: user.name || "No name",
        plan: user.Plan?.name || "Free",
        activity: [
          { action: "Logged in", time: "just now" },
          { action: "Registered", time: "yesterday" },
        ],
        stats: {
          totalSites: user.Websites.length,
          avgLoadTime: 4.7,
          optimization: 86,
        },
      },
      websites,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch profile" });
  }
};

module.exports = { getProfile };
