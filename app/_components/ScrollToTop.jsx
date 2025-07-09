"use client";
import { FaArrowUp } from "react-icons/fa";

import React, { useEffect, useState } from "react";

export default function ScrollToTop() {
  const [scrollPercent, setScrollPercent] = useState(0);
  const [visible, setVisible] = useState(false);

  // Circle parameters
  const radius = 25;
  const stroke = 3;
  const normalizedRadius = radius - stroke * 0.5;
  const circumference = normalizedRadius * 2 * Math.PI;

  useEffect(() => {
    function onScroll() {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = docHeight > 0 ? scrollTop / docHeight : 0;
      setScrollPercent(Math.round(scrolled * 100));
      setVisible(scrollTop > 20);
    }

    window.addEventListener("scroll", onScroll);
    onScroll(); // initial check

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Stroke dashoffset for circle progress
  const strokeDashoffset =
    circumference - (scrollPercent / 100) * circumference;

  if (!visible) return null;

  return (
    <div
      onClick={scrollToTop}
      style={{
        position: "fixed",
        bottom: 30,
        right: 30,
        width: 60,
        height: 60,
        cursor: "pointer",
        userSelect: "none",
        zIndex: 1000,
      }}
      title="Scroll to Top"
      aria-label="Scroll to top"
    >
      <svg
        height={radius * 2}
        width={radius * 2}
        style={{ display: "block", margin: "0 auto" }}
      >
        <circle
          className="stroke-pink-950"
          fill="transparent"
          strokeWidth={stroke}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
          style={{
            strokeDasharray: circumference,
            strokeDashoffset: strokeDashoffset,
            transition: "stroke-dashoffset 0.3s ease",
            transform: "rotate(-90deg)",
            transformOrigin: "50% 50%",
          }}
        />
      </svg>

      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          pointerEvents: "none",
          userSelect: "none",
          textAlign: "center",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div className="w-full h-full flex items-center justify-center">
          <FaArrowUp />
        </div>
      </div>
    </div>
  );
}
