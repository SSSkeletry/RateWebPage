const axios = require("axios");

async function verifyCaptcha(token) {
  try {
    const res = await axios.post(
      `https://www.google.com/recaptcha/api/siteverify`,
      null,
      {
        params: {
          secret: process.env.RECAPTCHA_SECRET,
          response: token,
        },
      }
    );
    return res.data.success;
  } catch (error) {
    console.error("CAPTCHA verification error:", error);
    return false;
  }
}

module.exports = { verifyCaptcha };
