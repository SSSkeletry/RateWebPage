const express = require("express");
const router = express.Router();

const authRoutes = require("./authRoute");

router.use("/auth", authRoutes);

module.exports = router;
