import React from "react";
import Link from "next/link";
import Image from "next/image";
import { resumeData } from "@/app/data/resume";
import ihgImg from "@/app/assests/projects/IHG.png";
import simplifyaiImg from "@/app/assests/projects/SimplifyAI.png";
import smartkonnectImg from "@/app/assests/projects/SmartKonnect.png";
import airekruitproImg from "@/app/assests/projects/AirekruitPro.png";

const projectImages: Record<string, any> = {
  ihg: ihgImg,
  simplifyai: simplifyaiImg,
  smartkonnect: smartkonnectImg,
  airekruitpro: airekruitproImg,
};

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function ProjectDetailPage({ params }: PageProps) {
  const { id } = await params;
  const project = resumeData.projects.find((p) => p.id === id);

  if (!project) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 text-foreground transition-colors duration-500">
        <div className="text-center space-y-4 max-w-sm">
          <h1 className="text-3xl font-extrabold tracking-tight text-foreground">
            Project Not Found
          </h1>
          <p className="text-sm text-muted-text">
            The project you are looking for does not exist or may have been moved.
          </p>
          <Link
            href="/#projects"
            className="inline-block px-6 py-2.5 rounded-xl bg-accent text-white font-medium hover:bg-opacity-90 transition-all duration-300 shadow-lg shadow-accent-glow"
          >
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen text-foreground flex flex-col pb-20 transition-colors duration-500 animate-section">
      
      {/* Banner Header Section */}
      <section className="relative h-[300px] md:h-[380px] w-full border-b border-card-border bg-card-bg/20 overflow-hidden">
        {/* Back Button */}
        <Link
          href="/#projects"
          className="absolute top-6 left-6 z-30 flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 dark:bg-black/30 backdrop-blur-md border border-card-border text-foreground hover:bg-accent hover:text-white hover:border-accent hover:scale-105 active:scale-95 transition-all duration-300 shadow-md font-medium text-sm"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
          </svg>
          Back to Projects
        </Link>

        {/* Project Background Image */}
        {projectImages[project.id] && (
          <Image
            src={projectImages[project.id]}
            alt={project.title}
            fill
            className="object-cover pointer-events-none"
            priority
          />
        )}

        {/* Backdrop Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-black/30 pointer-events-none" />

        {/* Banner Details Overlay */}
        <div className="absolute bottom-8 left-6 right-6 max-w-5xl mx-auto flex flex-col gap-2 z-20">
          <span className="inline-block text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-md bg-accent/25 backdrop-blur-sm text-accent border border-accent/20 self-start mb-2">
            {project.role}
          </span>
          <h1 className="text-3xl md:text-5xl font-extrabold text-foreground tracking-tight leading-tight drop-shadow-sm">
            {project.title}
          </h1>
          <p className="text-xs md:text-sm font-semibold text-muted-text mt-1">
            Duration: {project.duration}
          </p>
        </div>
      </section>

      {/* Main Contents Grid */}
      <main className="max-w-5xl w-full mx-auto px-6 mt-12 flex-1 grid grid-cols-1 lg:grid-cols-3 gap-10">
        
        {/* Left Column: Bullet Points */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center gap-3">
            <h2 className="text-lg md:text-xl font-bold tracking-tight text-foreground">
              Key Contributions & Highlights
            </h2>
            <div className="h-[1px] flex-1 bg-card-border" />
          </div>

          <ul className="space-y-4">
            {project.description.map((bullet, idx) => (
              <li
                key={idx}
                className="flex gap-3 text-sm md:text-base leading-relaxed text-foreground/80"
              >
                <span className="text-accent text-lg shrink-0 mt-0.5 select-none">→</span>
                <span>{bullet}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Right Column: Sidebar (Tech Stack & Links) */}
        <div className="lg:col-span-1 space-y-8">
          {/* Tech Stack Card */}
          <div className="rounded-2xl border border-card-border bg-card-bg/40 backdrop-blur-md p-6 shadow-sm">
            <h3 className="text-xs font-bold uppercase tracking-wider text-muted-text mb-4">
              Technologies Used
            </h3>
            
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag, sIdx) => (
                <span
                  key={sIdx}
                  className="inline-block px-3 py-1.5 rounded-lg text-xs font-semibold bg-card-bg border border-card-border text-foreground hover:border-accent hover:text-accent transition-all duration-200 cursor-default"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Links & CTA Section */}
          {project.liveUrl && (
            <div className="flex flex-col gap-3">
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-accent text-white hover:bg-opacity-90 active:scale-95 transition-all duration-300 font-bold text-sm shadow-lg shadow-accent-glow cursor-pointer"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2.5}
                  stroke="currentColor"
                  className="w-4 h-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
                  />
                </svg>
                Visit Live Demo
              </a>
            </div>
          )}
        </div>
        
      </main>
    </div>
  );
}
