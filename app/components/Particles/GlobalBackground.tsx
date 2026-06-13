"use client";

import React from "react";
import { useTheme } from "../Theme/ThemeContext";
import Particles from "./Particles";

export default function GlobalBackground() {
  const { theme } = useTheme();

  // Theme-adaptive particle color palette
  const colors = theme === "dark"
    ? ["#ffffff", "#818cf8", "#e879f9", "#38bdf8"]
    : ["#111111", "#4f46e5", "#c084fc", "#0284c7"];

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0 w-full h-full">
      <Particles
        particleColors={colors}
        particleCount={200}
        particleSpread={10}
        speed={0.1}
        particleBaseSize={125}
        moveParticlesOnHover
        alphaParticles={false}
        disableRotation={false}
        pixelRatio={1}
        className="w-full h-full pointer-events-auto"
      />
    </div>
  );
}
