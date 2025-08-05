const rateLimit = require("express-rate-limit");

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: {
    error: "Забагато спроб. Пройдіть капчу або зачекайте.",
    captchaRequired: true,
  },
});

module.exports = { authLimiter };
