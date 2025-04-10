const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

const authMiddleware = require("../middleware/auth");

router.get("/me", authMiddleware, (req, res) => {
  res.json({ message: "The token is valid", user: req.user });
});

router.post("/register", authController.register);
router.post("/login", authController.login);

module.exports = router;
