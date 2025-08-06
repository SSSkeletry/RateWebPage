const { User, Plan } = require("../models/models");
const bcrypt = require("bcryptjs");
const { generateTokens, verifyRefreshToken } = require("../helpers/token");

const register = async (req, res) => {
  const { email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const plan = await Plan.findOne({ where: { name: "Стандартний" } });

    const user = await User.create({
      email,
      password: hashedPassword,
      PlanId: plan.id,
    });

    const { accessToken, refreshToken } = generateTokens({
      id: user.id,
      email,
    });

    res.status(201).json({ token: accessToken, refreshToken });
  } catch {
    res.status(500).json({ message: "Registration failed" });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const ip = req.ip;

  try {
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(400).json({ message: "Невірні дані" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ message: "Невірні дані" });

    if (req.clearLoginAttempts) {
      req.clearLoginAttempts();
    }

    const { accessToken, refreshToken } = generateTokens({
      id: user.id,
      email,
    });

    res.json({ token: accessToken, refreshToken });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Login failed" });
  }
};

const refresh = async (req, res) => {
  const { refreshToken } = req.body;
  if (!refreshToken)
    return res.status(401).json({ message: "Refresh token required" });

  try {
    const payload = verifyRefreshToken(refreshToken);
    const user = await User.findByPk(payload.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    const { accessToken, refreshToken: newRefresh } = generateTokens({
      id: user.id,
      email: user.email,
    });

    res.json({ token: accessToken, refreshToken: newRefresh });
  } catch {
    res.status(403).json({ message: "Invalid or expired refresh token" });
  }
};

module.exports = { register, login, refresh };
