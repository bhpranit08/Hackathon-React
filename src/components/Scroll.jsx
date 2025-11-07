import React, { useEffect } from "react";

const Scroll = ({ children, className, id }) => {
  const thres = (v = 1) => ({ threshold: v });

  const obsFuncConstructor = (selector, animation) => {
    return (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          document
            .querySelectorAll(selector)
            .forEach((el) => el.classList.add(animation));
        }
      });
    };
  };

  useEffect(() => {
    const observers = [
      new IntersectionObserver(
        obsFuncConstructor(".scroll", "fade-up-in"),
        thres(0.1)
      ),
      new IntersectionObserver(
        obsFuncConstructor(".scroll-el", "fade-up-in"),
        thres(0.1)
      ),
      new IntersectionObserver(
        obsFuncConstructor(".scroll-elm", "fade-up-in"),
        thres(0.1)
      ),
    ];

    const targets = [
      document.querySelector("#prizes"),
      document.querySelector("#about"),
      document.querySelector("#contact"),
    ];

    targets.forEach((t, i) => t && observers[i].observe(t));

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return (
    <div className={className} id={id}>
      {children}
    </div>
  );
};

export default Scroll;
