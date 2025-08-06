const { verifyCaptcha } = require("../helpers/captcha");
const { blockIp, isIpBlocked } = require("../helpers/blockedIps");

const loginAttempts = {};

module.exports.loginRateLimiter = async function (req, res, next) {
  const ip = req.ip;
  const recaptchaToken = req.body.recaptchaToken;

  if (isIpBlocked(ip)) {
    return res.status(429).json({
      message: "Ваш IP заблоковано на 1 годину через надмірну кількість спроб.",
      block: true,
    });
  }

  const now = Date.now();
  const attempt = loginAttempts[ip];

  if (!attempt || now - attempt.firstAttempt > 60 * 1000) {
    loginAttempts[ip] = { count: 1, firstAttempt: now };
  } else {
    loginAttempts[ip].count += 1;
  }

  const count = loginAttempts[ip].count;

  if (count >= 3) {
    if (!recaptchaToken) {
      return res.status(429).json({
        message: "Пройдіть reCAPTCHA",
        captchaRequired: true,
      });
    }

    const valid = await verifyCaptcha(recaptchaToken);
    if (!valid) {
      return res.status(403).json({ message: "Невірна reCAPTCHA" });
    }

    loginAttempts[ip] = { count: 3, firstAttempt: now };
  }

  if (count > 5) {
    blockIp(ip, 60 * 60 * 1000);
    delete loginAttempts[ip];
    return res.status(429).json({
      message: "Ваш IP заблоковано на 1 годину.",
      block: true,
    });
  }

  req.clearLoginAttempts = () => {
    delete loginAttempts[ip];
  };

  next();
};

module.exports.loginAttempts = loginAttempts;
