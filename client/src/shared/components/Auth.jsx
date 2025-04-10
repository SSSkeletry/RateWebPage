import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, register } from "../../features/auth/authSlice";
import "../styles/Auth.css";
import "bootstrap-icons/font/bootstrap-icons.css";

const Auth = ({ isOpen, setIsOpen }) => {
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");

  const dispatch = useDispatch();
  const { status, error, token } = useSelector((state) => state.auth);

  const toggleMode = () => setIsRegister(!isRegister);
  const closeModal = () => setIsOpen(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isRegister) {
      if (password !== repeatPassword) {
        alert("Паролі не співпадають");
        return;
      }

      try {
        await dispatch(register({ email, password })).unwrap();
        await dispatch(login({ email, password })).unwrap();
      } catch (err) {
        console.error("Error during registration and login:", err);
      }
    } else {
      dispatch(login({ email, password }));
    }
  };

  useEffect(() => {
    if (token) {
      setIsOpen(false);
    }
  }, [token, setIsOpen]);

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
          <form className="form" onSubmit={handleSubmit}>
            <h2>{isRegister ? "Реєстрація" : "Авторизація"}</h2>

            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <input
              type="password"
              placeholder="Пароль"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            {isRegister && (
              <input
                type="password"
                placeholder="Повторіть пароль"
                value={repeatPassword}
                onChange={(e) => setRepeatPassword(e.target.value)}
                required
              />
            )}

            <button
              type="submit"
              className="submitBtn"
              disabled={status === "loading"}
            >
              {isRegister ? "Зареєструватися" : "Увійти"}
            </button>

            {error && <p className="errorText">{error}</p>}

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
