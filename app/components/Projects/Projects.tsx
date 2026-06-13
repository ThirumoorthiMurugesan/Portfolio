"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { resumeData } from "../../data/resume";
import ihgImg from "../../assests/projects/IHG.png";
import simplifyaiImg from "../../assests/projects/SimplifyAI.png";
import smartkonnectImg from "../../assests/projects/SmartKonnect.png";
import airekruitproImg from "../../assests/projects/AirekruitPro.png";

const projectImages: Record<string, any> = {
  ihg: ihgImg,
  simplifyai: simplifyaiImg,
  smartkonnect: smartkonnectImg,
  airekruitpro: airekruitproImg,
};

export default function Projects() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section id="projects" className={`space-y-6 ${mounted ? "animate-section" : "opacity-0"}`}>
      <div className="flex items-center gap-3">
        <h2 className="text-xl md:text-2xl font-bold tracking-tight text-foreground">
          Featured Projects
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {resumeData.projects.map((proj, idx) => (
          <div
            key={idx}
            className="group relative h-80 w-full overflow-hidden rounded-2xl border border-card-border bg-card-bg/25 shadow-sm hover:shadow-xl hover:border-accent/40 transition-all duration-500 cursor-pointer"
          >
            {/* Project Image Background */}
            {projectImages[proj.id] && (
              <Image
                src={projectImages[proj.id]}
                alt={proj.title}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover transform group-hover:scale-105 transition-transform duration-700 pointer-events-none"
                priority={idx < 2}
              />
            )}

            {/* Dark gradient overlay for text readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/55 to-black/10 group-hover:via-black/60 transition-all duration-300 pointer-events-none" />

            {/* Top Right Action Button Controls */}
            <div className="absolute top-4 right-4 z-20 flex gap-2">
              {proj.liveUrl && (
                <a
                  href={proj.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-emerald-500 hover:border-emerald-500 hover:scale-110 active:scale-95 transition-all duration-300 shadow-md"
                  title="Visit Live Demo"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="w-4 h-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
                    />
                  </svg>
                </a>
              )}

              <Link
                href={`/projects/${proj.id}`}
                className="flex items-center justify-center w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-accent hover:border-accent hover:scale-110 active:scale-95 transition-all duration-300 shadow-md"
                title="View Details"
                target="_blank"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="w-4 h-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25"
                  />
                </svg>
              </Link>
            </div>

            {/* Project Content Overlay at the bottom */}
            <div className="absolute bottom-0 left-0 right-0 p-6 z-10 flex flex-col justify-end pointer-events-none">
              <span className="inline-block text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-accent/25 backdrop-blur-sm text-accent border border-accent/20 self-start mb-2">
                {proj.role}
              </span>

              <h3 className="text-base md:text-lg font-bold text-white leading-snug group-hover:text-accent transition-colors duration-200">
                {proj.title}
              </h3>

              <p className="text-xs text-white/80 line-clamp-2 mt-1.5 leading-relaxed font-medium">
                {proj.shortDescription}
              </p>

              {/* Tags / Tech Stack & Duration */}
              <div className="flex items-center justify-between mt-4 pt-3 border-t border-white/10 text-[10px] text-white/60 font-semibold">
                <div className="flex gap-1.5 overflow-hidden">
                  {proj.tags.slice(0, 3).map((tag, tIdx) => (
                    <span key={tIdx} className="bg-white/5 px-2 py-0.5 rounded border border-white/5">
                      {tag}
                    </span>
                  ))}
                </div>
                <span className="shrink-0">{proj.duration}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
