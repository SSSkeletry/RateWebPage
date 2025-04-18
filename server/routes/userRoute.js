const express = require("express");
const router = express.Router();
const userController = require("../controllers/userConroller");
const authMiddleware = require("../middleware/auth");

router.get("/me", authMiddleware, userController.getProfile);

module.exports = router;
