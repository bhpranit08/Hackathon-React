import React from "react";
import Hero from "./Hero.jsx";
import Prize from "./Prize.jsx";
import Footer from "./Footer.jsx";
import About from "./About.jsx";
const Elements = () => {
  return (
    <div className="content-main centered-flex">
      <Hero />
      <Prize />
      <About />
      <Footer />
    </div>
  );
};

export default Elements;
