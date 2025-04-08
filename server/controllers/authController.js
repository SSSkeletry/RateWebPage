const { User } = require("../models/models");
const bcrypt = require("bcryptjs");

const register = async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: "Пользователь уже существует" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      email,
      password: hashedPassword,
    });

    return res
      .status(201)
      .json({ message: "Пользователь зарегистрирован", userId: user.id });
  } catch (error) {
    console.error("Ошибка при регистрации:", error);
    return res.status(500).json({ message: "Внутренняя ошибка сервера" });
  }
};

module.exports = {
  register,
};
