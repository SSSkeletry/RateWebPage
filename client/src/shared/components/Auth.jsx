import React, { useState } from "react";
import "../styles/Auth.css";
import "bootstrap-icons/font/bootstrap-icons.css";

const Auth = ({ isOpen, setIsOpen }) => {
  const [isRegister, setIsRegister] = useState(false);

  const toggleMode = () => setIsRegister(!isRegister);
  const closeModal = () => setIsOpen(false);

  return (
    <>
      {isOpen && (
        <div className="modalOverlay" onClick={closeModal}>
          <div
            className={`container ${isRegister ? "sign-in" : ""}`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="leftPanel">
              <div className="content">
                <h2>{isRegister ? "С возвращением!" : "Привет, друг!"}</h2>
                <p>
                  {isRegister
                    ? "Уже есть аккаунт? Просто войди."
                    : "Нет аккаунта? Зарегистрируйся!"}
                </p>
                <button className="switchBtn" onClick={toggleMode}>
                  {isRegister ? "Войти" : "Зарегистрироваться"}
                </button>
              </div>
            </div>

            <div className="formPanel">
              <form className="form">
                <h2>{isRegister ? "Регистрация" : "Авторизация"}</h2>
                <input type="email" placeholder="Email" required />
                <input type="password" placeholder="Пароль" required />
                {isRegister && (
                  <input
                    type="password"
                    placeholder="Повторите пароль"
                    required
                  />
                )}
                <button type="submit" className="submitBtn">
                  {isRegister ? "Зарегистрироваться" : "Войти"}
                </button>

                <p className="socialText">или через соцсети</p>
                <div className="socialIcons">
                  <i className="fab fa-google" />
                  <i className="fab fa-facebook" />
                  <i className="fab fa-tiktok" />
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Auth;
