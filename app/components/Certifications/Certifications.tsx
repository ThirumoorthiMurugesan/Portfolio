"use client";

import React, { useEffect, useState } from "react";
import { resumeData } from "../../data/resume";

const themeStyles = [
  {
    // Oracle Professional Integration Integration (Gold/Amber Theme)
    badgeBg: "bg-amber-500/10 border-amber-500/20 text-amber-600 dark:text-amber-400",
    glow: "bg-amber-500/5",
    hoverBorder: "hover:border-amber-500/40",
  },
  {
    // Oracle Foundations Associate (Indigo Theme)
    badgeBg: "bg-indigo-500/10 border-indigo-500/20 text-indigo-600 dark:text-indigo-400",
    glow: "bg-indigo-500/5",
    hoverBorder: "hover:border-indigo-500/40",
  },
  {
    // Learning Pioneer Award (Rose/Pink Theme)
    badgeBg: "bg-rose-500/10 border-rose-500/20 text-rose-600 dark:text-rose-400",
    glow: "bg-rose-500/5",
    hoverBorder: "hover:border-rose-500/40",
  },
];

export default function Certifications() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section
      id="certifications"
      className={`relative w-full border-t border-card-border bg-transparent px-6 py-12 md:py-16 md:px-12 transition-colors duration-500 ${
        mounted ? "animate-section" : "opacity-0"
      }`}
    >
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Section Header */}
        <div className="flex items-center gap-3">
          <h2 className="text-xl md:text-2xl font-bold tracking-tight text-foreground">
            Achievements & Certifications
          </h2>
        </div>

        {/* 3-Column Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {resumeData.achievements.map((ach, idx) => {
            const styles = themeStyles[idx % themeStyles.length];
            return (
              <div
                key={idx}
                className={`relative overflow-hidden rounded-2xl border border-card-border bg-card-bg/10 p-6 shadow-sm hover:shadow-lg transition-all duration-300 group flex flex-col justify-between h-full ${styles.hoverBorder}`}
              >
                {/* Subtle corner gradient glow */}
                <div className={`absolute -right-8 -top-8 w-24 h-24 rounded-full ${styles.glow} blur-xl`} />

                <div className="space-y-4">
                  {/* Top Row: Icon Badge & Date Period */}
                  <div className="flex items-center justify-between gap-3">
                    <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border ${styles.badgeBg}`}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z"
                        />
                      </svg>
                    </div>
                    <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-accent-glow text-accent border border-accent/10">
                      {ach.period}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <div className="space-y-2">
                    <h3 className="text-sm md:text-base font-bold text-foreground leading-snug group-hover:text-accent transition-colors duration-200">
                      {ach.title}
                    </h3>
                    <p className="text-xs text-muted-text/90 leading-relaxed">
                      {ach.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
