import React, { useEffect, useRef, useState } from "react";
import logo from "../assets/logo.png";

const Navigation = () => {
  const navbarRef = useRef(null);
  const [open, setOpen] = useState(false);
  let lastScrollTop = 0;

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll =
        window.pageYOffset || document.documentElement.scrollTop;
      const navbar = navbarRef.current;
      if (!navbar) return;

      navbar.style.top = currentScroll > lastScrollTop ? "-100px" : "0";
      currentScroll > 0
        ? navbar.classList.add("shadow")
        : navbar.classList.remove("shadow");
      lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header ref={navbarRef} className="nav-bar">
      <div className="nav-sub-cnt-left">
        <a href="#home">
          <img src={logo} alt="Logo" className="nav-img fade-up-in" />
        </a>
      </div>

      <button
        className={`nav-toggle ${open ? "open" : ""}`}
        onClick={() => setOpen(!open)}
      >
        <span />
        <span />
        <span />
      </button>

      <div className={`nav-sub-cnt-right ${open ? "show" : ""}`}>
        <a href="#home" className="nav fade-up-in s1">
          <h3 className="nav-text">Home</h3>
        </a>
        <a href="#prizes" className="nav fade-up-in s2">
          <h3 className="nav-text">Prizes</h3>
        </a>
        <a href="#about" className="nav fade-up-in s4">
          <h3 className="nav-text">About</h3>
        </a>
        <a href="#contact" className="nav fade-up-in s5">
          <h3 className="nav-text">Contact</h3>
        </a>
        <a href="" className="nav fade-up-in s6">
          <button className="btn-alt">Register Now</button>
        </a>
      </div>
    </header>
  );
};

export default Navigation;
