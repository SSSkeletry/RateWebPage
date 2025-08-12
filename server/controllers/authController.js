const { User, Plan } = require("../models/models");
const bcrypt = require("bcryptjs");
const { generateTokens, verifyRefreshToken } = require("../helpers/token");
const { verifyCaptcha } = require("../helpers/captcha");

const loginAttempts = new Map();

const MAX_ATTEMPTS_BEFORE_CAPTCHA = 5;
const MAX_ATTEMPTS_AFTER_CAPTCHA = 2;
const ATTEMPT_WINDOW_MS = 60 * 1000;

function getOrInitRecord(ip) {
  const now = Date.now();
  let record = loginAttempts.get(ip);
  if (!record || now - record.firstAttempt > ATTEMPT_WINDOW_MS) {
    record = { count: 0, passedCaptcha: false, firstAttempt: now };
  }
  return record;
}

async function handleCaptchaRequirement(record, recaptchaToken, ip) {
  if (!recaptchaToken) {
    loginAttempts.set(ip, record);
    return {
      error: {
        status: 429,
        data: {
          message: "Будь ласка, пройдіть reCAPTCHA.",
          captchaRequired: true,
        },
      },
    };
  }
  const valid = await verifyCaptcha(recaptchaToken);
  if (!valid) {
    loginAttempts.set(ip, record);
    return {
      error: {
        status: 403,
        data: { message: "Невірна reCAPTCHA.", captchaRequired: true },
      },
    };
  }
  return { reset: true };
}

async function checkLoginLimits(record, recaptchaToken, ip) {
  record.count += 1;
  if (record.passedCaptcha) {
    if (record.count > MAX_ATTEMPTS_AFTER_CAPTCHA) {
      return {
        error: {
          status: 429,
          data: {
            message: "Забагато спроб після CAPTCHA. Зачекайте 1 хвилину.",
            limitReached: true,
          },
        },
      };
    }
  } else if (record.count > MAX_ATTEMPTS_BEFORE_CAPTCHA) {
    return await handleCaptchaRequirement(record, recaptchaToken, ip);
  }
  return {};
}

async function validateUser(email, password, ip, record) {
  const user = await User.findOne({ where: { email } });
  if (!user) {
    loginAttempts.set(ip, record);
    return {
      error: {
        status: 400,
        data: { message: "Невірні логін або пароль", wrongCredentials: true },
      },
    };
  }
  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    loginAttempts.set(ip, record);
    return {
      error: {
        status: 400,
        data: { message: "Невірні логін або пароль", wrongCredentials: true },
      },
    };
  }
  return { user };
}

const login = async (req, res) => {
  const { email, password, recaptchaToken } = req.body;
  const ip = req.ip;

  let record = getOrInitRecord(ip);

  const limitCheck = await checkLoginLimits(record, recaptchaToken, ip);
  if (limitCheck.error)
    return res.status(limitCheck.error.status).json(limitCheck.error.data);
  if (limitCheck.reset) {
    record = { count: 0, passedCaptcha: true, firstAttempt: Date.now() };
  }

  try {
    const userCheck = await validateUser(email, password, ip, record);
    if (userCheck.error)
      return res.status(userCheck.error.status).json(userCheck.error.data);

    loginAttempts.delete(ip);

    const { accessToken, refreshToken } = generateTokens({
      id: userCheck.user.id,
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
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({
        message: "Цей email вже зареєстрований. Ви можете увійти.",
        emailExists: true,
      });
    }
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
