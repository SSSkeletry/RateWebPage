const express = require("express");
const router = express.Router();

const authRoutes = require("./authRoute");
const userRoutes = require("./userRoute");
const websiteRoutes = require("./websiteRoute");

router.use("/auth", authRoutes);
router.use("/user", userRoutes);
router.use("/websites", websiteRoutes);

module.exports = router;
