import React, { useEffect, useRef } from "react";

const Autoplay = ({ images = [], speed = 30 }) => {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let x = 0,
      frame;

    el.innerHTML += el.innerHTML; // clone for loop
    const scroll = () => {
      x += 1;
      if (x >= el.scrollWidth / 2) x = 0;
      el.scrollLeft = x;
      frame = requestAnimationFrame(scroll);
    };
    frame = requestAnimationFrame(scroll);

    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <div
      ref={ref}
      style={{
        width: "100%",
        height: "100%",
        overflow: "hidden",
        whiteSpace: "nowrap",
      }}
    >
      {images.map((src, i) => (
        <img
          key={i}
          src={src}
          style={{
            height: "100%",
            width: "auto",
            display: "inline-block",
            objectFit: "cover",
          }}
        />
      ))}
    </div>
  );
};

export default Autoplay;
