const express = require("express");
const router = express.Router();
const {
  addWebsite,
  getUserWebsitesWithMetrics,
} = require("../controllers/websiteController");
const authenticate = require("../middleware/auth");

router.post("/", authenticate, addWebsite);

router.get("/", authenticate, getUserWebsitesWithMetrics);

module.exports = router;
