import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../features/auth/model";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = ({ onOpenModal }) => {
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  useEffect(() => {
    const handleScroll = () => {
      setShowNavbar(window.scrollY <= lastScrollY);
      setLastScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <nav className={`navbar ${showNavbar ? "show" : "hide"}`}>
      <div className="navbar__content">
        <ul className="navbar__menu">
          <li>ПРО НАС</li>
          <li>ПІДТРИМКА</li>
          <li>ЧАСТІ ЗАПИТАННЯ</li>
          {token && (
            <li>
              <Link to="/analysis">САЙТИ</Link>
            </li>
          )}
        </ul>

        {token ? (
          <button className="navbar__cta" onClick={handleLogout}>
            <span>ВИЙТИ</span>
          </button>
        ) : (
          <button className="navbar__cta" onClick={onOpenModal}>
            <span>ОПТИМІЗУВАТИ</span>
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
