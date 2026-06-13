"use client";

import React, { useEffect, useState } from "react";
import { resumeData } from "../../data/resume";

export default function Education() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section id="education" className={`space-y-6 ${mounted ? "animate-section" : "opacity-0"}`}>
      <div className="flex items-center gap-3">
        <h2 className="text-xl md:text-2xl font-bold tracking-tight text-foreground">
          Education
        </h2>
        <div className="h-[1px] flex-1 bg-card-border" />
      </div>

      <div className="relative border-l border-card-border pl-6 ml-3 space-y-6">
        {resumeData.education.map((edu, idx) => (
          <div key={idx} className="relative group">
            {/* Timeline bullet indicator */}
            <div className="absolute -left-[31px] top-1 h-3.5 w-3.5 rounded-full border border-card-border bg-card-bg transition-colors duration-300 group-hover:border-accent group-hover:bg-accent-glow" />

            <div className="space-y-1">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                <h3 className="text-sm font-bold text-foreground">
                  {edu.degree}
                </h3>
                <span className="text-xs font-semibold text-muted-text">
                  {edu.period}
                </span>
              </div>
              <p className="text-xs font-semibold text-muted-text">
                {edu.institution}
              </p>
              <p className="text-xs text-foreground/70">
                {edu.details}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
