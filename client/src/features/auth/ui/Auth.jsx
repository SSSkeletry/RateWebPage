import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, register } from "../model";
import ReCAPTCHA from "react-google-recaptcha";
import "./Auth.css";
import "bootstrap-icons/font/bootstrap-icons.css";

const Auth = ({ isOpen, setIsOpen }) => {
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");

  const dispatch = useDispatch();
  const { status, error, token } = useSelector((state) => state.auth);
  const [recaptchaToken, setRecaptchaToken] = useState("");
  const [showCaptcha, setShowCaptcha] = useState(false);
  const toggleMode = () => {
    setIsRegister(!isRegister);
    setShowCaptcha(false);
    setRecaptchaToken("");
  };

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
      if (showCaptcha && !recaptchaToken) {
        alert("Будь ласка, пройдіть CAPTCHA перед входом.");
        return;
      }

      try {
        const resultAction = await dispatch(
          login({ email, password, recaptchaToken })
        );

        const data = resultAction.payload;

        if (data?.captchaRequired) {
          setShowCaptcha(true);
          setRecaptchaToken("");
          return;
        }

        if (data?.block) {
          alert("Ваш IP тимчасово заблоковано. Спробуйте пізніше.");
          return;
        }
      } catch (err) {
        console.error("Login failed", err);
      }
    }
  };

  useEffect(() => {
    if (token) {
      setIsOpen(false);
      setShowCaptcha(false);
      setRecaptchaToken("");
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
            {showCaptcha && (
              <ReCAPTCHA
                sitekey={process.env.REACT_APP_RECAPTCHA_SITE_KEY}
                onChange={(token) => setRecaptchaToken(token)}
              />
            )}

            {error && (
              <p className="errorText">
                {typeof error === "string" ? error : error.message}
              </p>
            )}

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
