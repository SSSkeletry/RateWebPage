const { User, Plan } = require("../models/models");
const bcrypt = require("bcryptjs");
const { generateTokens, verifyRefreshToken } = require("../helpers/token");
const { verifyCaptcha } = require("../helpers/captcha");

const loginAttempts = new Map();

const MAX_ATTEMPTS_BEFORE_CAPTCHA = 3;
const MAX_ATTEMPTS_AFTER_CAPTCHA = 2;
const ATTEMPT_WINDOW_MS = 60 * 1000;

const login = async (req, res) => {
  const { email, password, recaptchaToken } = req.body;
  const ip = req.ip;
  const now = Date.now();

  let record = loginAttempts.get(ip);

  if (!record || now - record.firstAttempt > ATTEMPT_WINDOW_MS) {
    record = {
      count: 0,
      passedCaptcha: false,
      firstAttempt: now,
    };
  }

  if (record.passedCaptcha) {
    record.count += 1;

    if (record.count > MAX_ATTEMPTS_AFTER_CAPTCHA) {
      return res.status(429).json({
        message: "Забагато спроб після CAPTCHA. Зачекайте 1 хвилину.",
        limitReached: true,
      });
    }
  } else {
    record.count += 1;

    if (record.count >= MAX_ATTEMPTS_BEFORE_CAPTCHA) {
      if (!recaptchaToken) {
        loginAttempts.set(ip, record);
        return res.status(429).json({
          message: "Будь ласка, пройдіть reCAPTCHA.",
          captchaRequired: true,
        });
      }

      const valid = await verifyCaptcha(recaptchaToken);
      if (!valid) {
        loginAttempts.set(ip, record);
        return res.status(403).json({ message: "Невірна reCAPTCHA." });
      }

      // ✅ Сброс счётчика при успешной CAPTCHA
      record = {
        count: 0,
        passedCaptcha: true,
        firstAttempt: now,
      };
    }
  }

  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      loginAttempts.set(ip, record);
      return res.status(400).json({ message: "Невірні дані" });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      loginAttempts.set(ip, record);
      return res.status(400).json({ message: "Невірні дані" });
    }

    loginAttempts.delete(ip); // Успешный логин — удаляем запись

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
