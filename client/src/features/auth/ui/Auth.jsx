import React, { useState, useEffect, useRef } from "react";
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
  const recaptchaRef = useRef(null);

  const [showCaptcha, setShowCaptcha] = useState(false);
  const [failedAttempts, setFailedAttempts] = useState(0);
  const [notification, setNotification] = useState("");

  const showNotification = (message, type = "info") => {
    const icons = {
      success: "bi-check-circle-fill",
      error: "bi-exclamation-triangle-fill",
      warning: "bi-exclamation-circle-fill",
      info: "bi-info-circle-fill",
    };

    setNotification({ message, type, icon: icons[type] || icons.info });
    setTimeout(() => setNotification(null), 3000);
  };

  const toggleMode = () => {
    setIsRegister(!isRegister);
    setShowCaptcha(false);
    setRecaptchaToken("");
    setFailedAttempts(0);
  };

  const closeModal = () => setIsOpen(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isRegister) {
      if (password !== repeatPassword) {
        showNotification("Паролі не співпадають");
        return;
      }

      try {
        await dispatch(register({ email, password })).unwrap();
        await dispatch(login({ email, password })).unwrap();
      } catch (err) {
        console.error("Error during registration and login:", err);
        showNotification("Помилка при реєстрації або вході");
      }
    } else {
      if (showCaptcha && !recaptchaToken) {
        showNotification("Будь ласка, пройдіть CAPTCHA перед входом.");
        return;
      }

      const resultAction = await dispatch(
        login({ email, password, recaptchaToken })
      );

      let data = null;

      if (login.fulfilled.match(resultAction)) {
        setFailedAttempts(0);
      } else if (login.rejected.match(resultAction)) {
        data = resultAction.payload || resultAction.error;
        setFailedAttempts((prev) => prev + 1);

        if (data?.captchaRequired) {
          setShowCaptcha(true);
          setRecaptchaToken("");
          recaptchaRef.current?.reset();
          showNotification(data.message || "Будь ласка, пройдіть CAPTCHA.");
          return;
        }

        if (data?.limitReached) {
          showNotification(
            data.message || "Досягнуто ліміт спроб. Зачекайте хвилину."
          );
          return;
        }

        if (failedAttempts + 1 >= 5 && !showCaptcha) {
          setShowCaptcha(true);
          showNotification("Досягнуто ліміт спроб. Пройдіть CAPTCHA.");
          return;
        }

        if (data?.wrongCredentials) {
          showNotification(data.message || "Невірний логін або пароль");
          return;
        }

        showNotification(data.message || "Помилка входу");
      }
    }
  };

  useEffect(() => {
    if (token) {
      setIsOpen(false);
      setShowCaptcha(false);
      setRecaptchaToken("");
      setFailedAttempts(0);
      recaptchaRef.current?.reset();
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
        {notification && (
          <div className={`notification ${notification.type}`}>
            <i className={`bi ${notification.icon}`}></i>
            <span>{notification.message}</span>
          </div>
        )}

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

            {showCaptcha && (
              <ReCAPTCHA
                sitekey={process.env.REACT_APP_RECAPTCHA_SITE_KEY}
                onChange={(token) => setRecaptchaToken(token)}
                ref={recaptchaRef}
              />
            )}

            <button
              type="submit"
              className="submitBtn"
              disabled={status === "loading"}
            >
              {isRegister ? "Зареєструватися" : "Увійти"}
            </button>

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
