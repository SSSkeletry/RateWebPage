import { useState, useEffect } from "react";
import "../styles/Navbar.css";

const Navbar = () => {
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

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
        </ul>
        <button className="navbar__cta">
          <span>ОПТИМІЗУВАТИ</span>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
