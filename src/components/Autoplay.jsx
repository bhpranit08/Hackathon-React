import React, { useEffect, useState, useRef } from "react";

const Autoplay = ({ images = [], interval = 2500, className = "" }) => {
  const [index, setIndex] = useState(0);
  const len = images.length;
  const timeoutRef = useRef(null);

  useEffect(() => {
    if (len <= 1) return;
    timeoutRef.current = setTimeout(
      () => setIndex((p) => (p + 1) % len),
      interval,
    );
    return () => clearTimeout(timeoutRef.current);
  }, [index, interval, len]);

  return (
    <div
      className={`relative overflow-hidden ${className}`}
      style={{ width: "100%", height: "100%", display: "block" }}
    >
      <div
        style={{
          display: "flex",
          height: "100%",
          transform: `translateX(-${index * 100}%)`,
          transition: "transform 0.8s ease-in-out",
        }}
      >
        {images.map((src, i) => (
          <div
            key={i}
            style={{
              flexShrink: 0,
              width: "100%",
              height: "100%",
              backgroundImage: `url(${src})`,
              backgroundSize: "contain",
              backgroundRepeat: "repeat", // fills gaps
              backgroundPosition: "center",
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default Autoplay;
