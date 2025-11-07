import React, { useEffect, useState, useRef } from "react";

const Autoplay = ({
  images = [],
  interval = 2500,
  className = "w-full h-full relative",
}) => {
  const [index, setIndex] = useState(0);
  const len = images.length;
  const timeoutRef = useRef(null);

  useEffect(() => {
    if (len <= 1) return;

    timeoutRef.current = setTimeout(() => {
      setIndex((prev) => (prev + 1) % len);
    }, interval);

    return () => clearTimeout(timeoutRef.current);
  }, [index, interval, len]);

  return (
    <div className={className} style={{ overflow: "hidden" }}>
      <div
        style={{
          display: "flex",
          width: `${len * 100}%`,
          transform: `translateX(-${index * (100 / len)}%)`,
          transition: "transform 0.8s ease-in-out",
          height: "100%",
        }}
      >
        {images.map((src, i) => (
          <img
            key={i}
            src={src}
            alt={`slide-${i}`}
            style={{
              width: `${100 / len}%`,
              height: "100%",
              objectFit: "cover",
              flexShrink: 0,
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default Autoplay;
