const express = require("express");
const router = express.Router();

const authRoutes = require("./authRoute");
const userRoutes = require("./userRoute");

router.use("/auth", authRoutes);
router.use("/user", userRoutes);
module.exports = router;
