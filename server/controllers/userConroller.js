const { User, Plan } = require("../models/models");

const getProfile = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id, {
      include: {
        model: Plan,
        attributes: ["name"],
      },
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

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
          totalSites: 3,
          avgLoadTime: 4.7,
          optimization: 86,
        },
      },
      websites: [
        { title: "Website One", description: "Description of website one" },
        { title: "Website Two", description: "Description of website two" },
        { title: "Website Three", description: "Description of website three" },
      ],
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch profile" });
  }
};

module.exports = { getProfile };
