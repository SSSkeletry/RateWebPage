const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

const authMiddleware = require("../middleware/auth");

router.get("/me", authMiddleware, authController.getMe);

router.post("/register", authController.register);
router.post("/login", authController.login);

module.exports = router;
