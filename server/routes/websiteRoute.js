const express = require("express");
const router = express.Router();
const { addWebsite } = require("../controllers/websiteController");
const authenticate = require("../middleware/auth");

router.post("/", authenticate, addWebsite);

module.exports = router;
