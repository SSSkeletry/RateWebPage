import React, { useState } from "react";
import "../styles/Auth.css";
import "bootstrap-icons/font/bootstrap-icons.css";

const Auth = ({ isOpen, setIsOpen }) => {
  const [isRegister, setIsRegister] = useState(false);

  const toggleMode = () => setIsRegister(!isRegister);
  const closeModal = () => setIsOpen(false);

  return (
    <div
      className={`modalOverlay ${isOpen ? "active" : ""}`}
      onClick={closeModal}
    >
      <div
        className={`container ${isRegister ? "sign-in" : ""}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="leftPanel">
          <div className="content">
            <h2>{isRegister ? "Раді вас бачити!" : "Ласкаво просимо!"}</h2>
            <p>
              {isRegister
                ? "Вже є обліковий запис? Будь ласка, виконайте вхід."
                : "Немає облікового запису? Будь ласка, зареєструйтесь."}
            </p>
            <button className="switchBtn" onClick={toggleMode}>
              {isRegister ? "Авторизація" : "Реєстрація"}
            </button>
          </div>
        </div>

        <div className="formPanel">
          <form className="form">
            <h2>{isRegister ? "Реєстрація" : "Авторизація"}</h2>
            <input type="email" placeholder="Email" required />
            <input type="password" placeholder="Пароль" required />
            {isRegister && (
              <input type="password" placeholder="Повторите пароль" required />
            )}
            <button type="submit" className="submitBtn">
              {isRegister ? "Зареєструватися" : "Увійти"}
            </button>

            <p className="socialText">або іншим способом</p>
            <div className="socialIcons">
              <i className="fab fa-google" />
              <i className="fab fa-facebook" />
              <i className="fab fa-tiktok" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Auth;
