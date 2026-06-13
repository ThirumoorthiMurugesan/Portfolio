"use client";

import React, { useEffect, useState } from "react";
import { resumeData } from "../../data/resume";

const handleDownloadResume = () => {
  const link = document.createElement("a");
  link.href = "/Thirumoorthi Murugesan.pdf";
  link.download = "Thirumoorthi Murugesan.pdf";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export default function Sidebar() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <aside className={`w-full lg:w-[380px] shrink-0 space-y-6 ${mounted ? "animate-section" : "opacity-0"}`}>
      
      {/* 1. MERN Stack Spotlight */}
      <div className="relative overflow-hidden rounded-2xl border border-card-border bg-card-bg/10 p-6 shadow-sm transition-all duration-300 hover:shadow-md hover:border-accent/40 group">
        <div className="absolute -left-12 -bottom-12 w-32 h-32 rounded-full bg-indigo-500/5 blur-2xl" />
        
        <h3 className="text-xs font-bold uppercase tracking-wider text-muted-text mb-4 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-indigo-500 animate-ping" />
          MERN Stack Expertise
        </h3>
        
        <div className="grid grid-cols-2 gap-3">
          {resumeData.mernExpertise.map((tech, idx) => {
            // Give each tech a distinct subtle color vibe
            const colors = [
              "border-emerald-500/20 bg-emerald-500/5 text-emerald-600 dark:text-emerald-400 hover:border-emerald-500/40", // MongoDB
              "border-zinc-500/20 bg-zinc-500/5 text-zinc-600 dark:text-zinc-400 hover:border-zinc-500/40", // Express
              "border-sky-500/20 bg-sky-500/5 text-sky-600 dark:text-sky-400 hover:border-sky-500/40", // React
              "border-green-500/20 bg-green-500/5 text-green-600 dark:text-green-400 hover:border-green-500/40" // Node
            ];
            return (
              <div
                key={idx}
                className={`flex items-center justify-center p-3 rounded-xl border text-xs font-semibold tracking-wide transition-all duration-300 hover:scale-105 ${colors[idx % colors.length]}`}
              >
                {tech}
              </div>
            );
          })}
        </div>
      </div>

      {/* 2. Technical Skills Section */}
      <div className="rounded-2xl border border-card-border bg-card-bg/10 p-6 shadow-sm transition-all duration-300 hover:shadow-md">
        <h3 className="text-xs font-bold uppercase tracking-wider text-muted-text mb-4">
          Technical Skills
        </h3>
        
        <div className="space-y-6">
          {resumeData.skills.map((categoryGroup, index) => (
            <div key={index} className="space-y-2.5">
              <h4 className="text-xs font-bold text-foreground/80 tracking-wide uppercase">
                {categoryGroup.category}
              </h4>
              <div className="flex flex-wrap gap-2">
                {categoryGroup.items.map((skill, sIdx) => (
                  <span
                    key={sIdx}
                    className="inline-block px-3 py-1.5 rounded-lg text-xs font-medium bg-card-bg/20 border border-card-border text-foreground hover:border-accent hover:text-accent transition-all duration-200 cursor-default"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 3. Tools & Technologies */}
      <div className="rounded-2xl border border-card-border bg-card-bg/10 p-6 shadow-sm transition-all duration-300 hover:shadow-md">
        <h3 className="text-xs font-bold uppercase tracking-wider text-muted-text mb-4">
          Tools & Technologies
        </h3>
        
        <div className="flex flex-wrap gap-2">
          {resumeData.toolsAndTech.map((tool, idx) => (
            <span
              key={idx}
              className="inline-block px-2.5 py-1.5 rounded-lg text-xs font-medium bg-accent-glow/30 border border-accent/10 text-accent hover:border-accent/30 transition-all duration-200 cursor-default"
            >
              {tool}
            </span>
          ))}
        </div>
      </div>

      {/* 4. Export Resume & Location */}
      <div className="flex flex-col gap-3">
        <button
          onClick={handleDownloadResume}
          className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-accent text-white hover:bg-opacity-90 active:scale-95 transition-all duration-300 font-semibold shadow-lg shadow-accent-glow cursor-pointer"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
          </svg>
          Export Resume
        </button>
        
        {/* Location & Availability Card */}
        <div className="rounded-2xl border border-card-border bg-card-bg/10 p-5 shadow-sm transition-all duration-300 hover:shadow-md space-y-4">
          {/* Current Location */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-muted-text mb-2">
              Current Location
            </h4>
            <p className="text-xs text-foreground leading-relaxed">
              Located in Salem, Tamil Nadu, India
            </p>
          </div>
          
          {/* Preferred Locations */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-muted-text mb-2">
              Preferred Locations
            </h4>
            <div className="flex flex-wrap gap-2">
              {["Bengaluru", "Hyderabad", "Chennai", "Coimbatore"].map((location, idx) => (
                <span
                  key={idx}
                  className="inline-block px-2.5 py-1 rounded-lg text-xs font-medium bg-accent-glow/20 border border-accent/20 text-accent hover:border-accent/40 transition-all duration-200"
                >
                  {location}
                </span>
              ))}
            </div>
          </div>
          
          {/* Work Type */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-muted-text mb-2">
              Work Type
            </h4>
            <div className="flex flex-wrap gap-2">
              {["Onsite", "Remote"].map((type, idx) => (
                <span
                  key={idx}
                  className="inline-block px-2.5 py-1 rounded-lg text-xs font-medium bg-green-500/10 border border-green-500/30 text-green-600 dark:text-green-400 hover:border-green-500/50 transition-all duration-200"
                >
                  {type}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

    </aside>
  );
}
