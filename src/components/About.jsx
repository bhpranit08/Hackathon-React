import React from "react";
import Scroll from "./Scroll.jsx";

const About = () => {
  return (
    <Scroll id="about" className="content-section about-section">
      <div className="about-wrapper">
        <div className="about-header scroll">
          <h2 style={{ fontWeight: '900' }}>Deerwalk Hackathon 2025</h2>
          <p>
            An immersive eight-hour sprint designed for ambitious high-schoolers
            ready to build, ship, and shine.
          </p>
        </div>

        <div className="about-grid">
          <article className="card about-card scroll s1">
            <h3 style={{ fontWeight: '800' }}>About the Event</h3>
            <p>
              Built exclusively for students in grades 9 through 12, Deerwalk
              Hackathon 2025 invites teams of two to four innovators to tackle
              real-world challenges in just one power-packed day. From ideation
              to prototype, our mentors and workshops keep every moment fueled
              with momentum and creativity.
            </p>
            <p>
              Beyond the code, participants gain hands-on experience,
              collaborate with peers from across the valley, and unlock exposure
              to industry professionals invested in their growth.
            </p>
          </article>

          <article className="card about-card scroll s2">
            <h3 style={{ fontWeight: '800' }}>Hosted by Deerwalk Sifal School</h3>
            <p>
              Powered by the Deerwalk Education Group, Sifal School bridges the
              gap between classroom learning and real-world application through
              technology-forward initiatives. Our campus is purpose-built to
              nurture curiosity, leadership, and a culture of creating.
            </p>
            <p>
              By opening our labs, mentors, and network to the hackathon
              community, we ensure every team leaves better prepared for the
              future challenges they are eager to solve.
            </p>
          </article>
        </div>
      </div>
    </Scroll>
  );
};

export default About;

