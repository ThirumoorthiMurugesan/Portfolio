"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useTheme } from "../Theme/ThemeContext";
import { resumeData } from "../../data/resume";
import blackThemeImg from "../../assests/Exprience/White_Theme.png";
import whiteThemeImg from "../../assests/Exprience/Black_Theme.png";

export default function Experience() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section
      id="experience"
      className="relative w-full border-b border-card-border bg-transparent px-6 py-12 md:py-16 md:px-12 transition-colors duration-500"
    >
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Title Block */}
        <div className="flex items-center gap-3">
          <h2 className="text-xl md:text-2xl font-bold tracking-tight text-foreground">
            Work Experience
          </h2>
        </div>

        {/* Content Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Image with diagonal box reveal */}
          <div
            className={`lg:col-span-5 w-full flex justify-center ${
              mounted ? "animate-box-reveal" : "opacity-0"
            }`}
            style={{ animationDelay: mounted ? "300ms" : "0ms" }}
          >
            <div className="relative w-full max-w-md lg:max-w-full overflow-hidden rounded-2xl border border-card-border shadow-xl hover:shadow-2xl hover:border-accent/30 transition-all duration-500 group bg-card-bg/10">
              {/* Subtle hover gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-tr from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              <Image
                src={theme === "dark" ? blackThemeImg : whiteThemeImg}
                alt="Work Experience Illustration"
                className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-700"
                priority
              />
            </div>
          </div>

          {/* Right Column: Experience Card with delayed diagonal fade-in */}
          <div
            className={`lg:col-span-7 w-full ${
              mounted ? "animate-fade-diagonal" : "opacity-0"
            }`}
            style={{ animationDelay: mounted ? "600ms" : "0ms" }}
          >
            <div className="relative overflow-hidden rounded-2xl border border-card-border bg-card-bg/10 p-6 md:p-8 shadow-sm hover:shadow-md hover:border-accent/40 group transition-all duration-300">
              {/* Corner Glow */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 rounded-bl-full group-hover:bg-accent/10 transition-colors duration-500" />
              
              <div className="space-y-6">
                {resumeData.workExperience.map((exp, idx) => (
                  <div key={idx} className="space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div>
                        <h3 className="text-lg font-bold text-foreground group-hover:text-accent transition-colors duration-200">
                          {exp.role}
                        </h3>
                        <p className="text-sm font-semibold text-accent">
                          {exp.company}
                        </p>
                      </div>
                      <span className="inline-block text-xs font-semibold px-3 py-1.5 rounded-full bg-accent-glow text-accent border border-accent/15 sm:self-start">
                        {exp.period}
                      </span>
                    </div>
                    
                    <ul className="space-y-3 text-sm text-muted-text leading-relaxed">
                      {exp.description.map((bullet, bIdx) => (
                        <li key={bIdx} className="flex gap-2.5">
                          <span className="text-accent shrink-0 select-none">→</span>
                          <span className="text-foreground/85">{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
