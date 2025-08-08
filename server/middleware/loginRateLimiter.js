const { verifyCaptcha } = require("../helpers/captcha");

const loginAttempts = new Map();

const MAX_ATTEMPTS_BEFORE_CAPTCHA = 3;
const MAX_ATTEMPTS_AFTER_CAPTCHA = 2;
const ATTEMPT_WINDOW_MS = 60 * 1000;

async function captchaChecker(req, res, next) {
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

    if (record.count > MAX_ATTEMPTS_BEFORE_CAPTCHA) {
      const token = req.body.recaptchaToken;

      if (!token) {
        return res.status(429).json({
          message: "Будь ласка, пройдіть reCAPTCHA.",
          captchaRequired: true,
        });
      }

      const valid = await verifyCaptcha(token);
      if (!valid) {
        return res.status(403).json({ message: "Невірна reCAPTCHA." });
      }

      record = {
        count: 1,
        passedCaptcha: true,
        firstAttempt: now,
      };
    }
  }

  loginAttempts.set(ip, record);
  next();
}

module.exports = {
  captchaChecker,
};
