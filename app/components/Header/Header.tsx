"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { resumeData } from "../../data/resume";
import img1 from "../../assests/thiru/img1.jpeg";
import img2 from "../../assests/thiru/img2.jpeg";
import img3 from "../../assests/thiru/img3.jpeg";
import img4 from "../../assests/thiru/img4.jpeg";

const images = [img1, img2, img3, img4];

export default function Header() {
  const roles = ["Full Stack Developer", "Freelancer", "MERN Stack Developer"];
  const [roleIndex, setRoleIndex] = useState(0);
  const [animClass, setAnimClass] = useState("animate-wipe-in");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      // Start the wipe-out animation
      setAnimClass("animate-wipe-out");
      
      // Wait for the wipe-out (600ms), then update the text and wipe-in
      const timeout = setTimeout(() => {
        setRoleIndex((prev) => (prev + 1) % roles.length);
        setAnimClass("animate-wipe-in");
      }, 600);

      return () => clearTimeout(timeout);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // Image Slider state and effect
  const [currentImgIndex, setCurrentImgIndex] = useState(0);
  const [isSliderHovered, setIsSliderHovered] = useState(false);

  useEffect(() => {
    if (isSliderHovered) return;

    const interval = setInterval(() => {
      setCurrentImgIndex((prev) => (prev + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [isSliderHovered]);

  const handleNextImage = () => {
    setCurrentImgIndex((prev) => (prev + 1) % images.length);
  };

  return (
    <header className={`relative w-full border-b border-card-border bg-transparent px-6 py-16 md:py-24 md:px-12 transition-colors duration-500 ${mounted ? "animate-section" : "opacity-0"}`}>
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-8">
        
        {/* Profile Info */}
        <div className="flex-1 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-accent-glow text-accent border border-accent/20">
            Welcome to my Portfolio
          </div>
          
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-foreground transition-all duration-500">
            {resumeData.name}
          </h1>

          {/* Cycling Animated Role Subtitle */}
          <div className="h-10 md:h-12 flex items-center overflow-hidden">
            <span
              className={`inline-block text-xl md:text-3xl font-bold bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent ${animClass}`}
            >
              {roles[roleIndex]}
            </span>
          </div>

          {/* Short 2-line Description */}
          <p className="text-muted-text text-base md:text-lg max-w-2xl leading-relaxed transition-all duration-500">
            {resumeData.aboutShort}
          </p>

          {/* Contact Details & Links */}
          <div className="flex flex-wrap gap-3 pt-4">
            {/* Phone */}
            <a
              href={`tel:${resumeData.phone}`}
              className="flex items-center gap-2 px-4 py-2 rounded-full border border-card-border bg-card-bg hover:border-accent hover:text-accent transition-all duration-300 text-sm font-medium cursor-pointer shadow-sm hover:shadow-md"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M14.25 9.75v-4.5m0 4.5h4.5m-4.5 0 6-6m-3 10.5a8.25 8.25 0 0 0-8.25-8.25A8.25 8.25 0 0 0 3 11.25a8.25 8.25 0 0 0 8.25 8.25 8.25 8.25 0 0 0 8.25-8.25v-1.5" />
              </svg>
              {resumeData.phone}
            </a>

            {/* Email */}
            <a
              href={`mailto:${resumeData.email}`}
              className="flex items-center gap-2 px-4 py-2 rounded-full border border-card-border bg-card-bg hover:border-accent hover:text-accent transition-all duration-300 text-sm font-medium cursor-pointer shadow-sm hover:shadow-md"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
              </svg>
              {resumeData.email}
            </a>

            {/* LinkedIn */}
            <a
              href={resumeData.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-full border border-card-border bg-card-bg hover:border-accent hover:text-accent transition-all duration-300 text-sm font-medium cursor-pointer shadow-sm hover:shadow-md"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-4 h-4">
                <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
              </svg>
              LinkedIn
            </a>

            {/* GitHub */}
            <a
              href={resumeData.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-full border border-card-border bg-card-bg hover:border-accent hover:text-accent transition-all duration-300 text-sm font-medium cursor-pointer shadow-sm hover:shadow-md"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-4 h-4">
                <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.579.688.481C19.137 20.162 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
              </svg>
              GitHub
            </a>
          </div>
        </div>

        {/* 3D Highlighted Image Slider */}
        <div
          className="relative w-full max-w-md md:max-w-lg h-72 md:h-80 flex items-center justify-center select-none shrink-0 overflow-visible mt-6 md:mt-0"
          onMouseEnter={() => setIsSliderHovered(true)}
          onMouseLeave={() => setIsSliderHovered(false)}
          onClick={handleNextImage}
        >
          {/* Slider Core Container */}
          <div className="relative w-48 h-64 md:w-56 md:h-72 flex items-center justify-center">
            {images.map((img, index) => {
              const diff = (index - currentImgIndex + images.length) % images.length;
              
              let positionClass = "";
              let isSide = false;
              if (diff === 0) {
                // Center / Highlighted
                positionClass = "translate-x-0 scale-100 opacity-100 z-20 shadow-xl border-accent/20";
              } else if (diff === 1) {
                // Right slide (blurred & shifted)
                positionClass = "translate-x-[65%] md:translate-x-[75%] scale-80 opacity-50 z-10 blur-[2px]";
                isSide = true;
              } else if (diff === images.length - 1) {
                // Left slide (blurred & shifted)
                positionClass = "-translate-x-[65%] md:-translate-x-[75%] scale-80 opacity-50 z-10 blur-[2px]";
                isSide = true;
              } else {
                // Hidden slides
                positionClass = "scale-50 opacity-0 z-0 pointer-events-none";
              }

              return (
                <div
                  key={index}
                  className={`absolute inset-0 transition-all duration-700 ease-in-out rounded-2xl border border-card-border bg-card-bg/95 overflow-hidden ${positionClass}`}
                >
                  <Image
                    src={img}
                    alt={`Thiru Image ${index + 1}`}
                    fill
                    sizes="(max-width: 768px) 144px, 176px"
                    className="object-cover"
                    priority={index === 0}
                  />
                  {/* Backdrop overlay for side blurred images to make them "back-lite" or dimmed */}
                  {isSide && (
                    <div className="absolute inset-0 bg-background/30 dark:bg-black/35 backdrop-blur-[0.5px] transition-opacity duration-700" />
                  )}
                </div>
              );
            })}
          </div>

          {/* Dots / Indicators */}
          <div className="absolute -bottom-2 left-0 right-0 flex justify-center gap-2 z-30">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={(e) => {
                  e.stopPropagation(); // Stop click from triggering parent onClick
                  setCurrentImgIndex(index);
                }}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  index === currentImgIndex ? "w-4 bg-accent" : "w-1.5 bg-foreground/30 hover:bg-foreground/50"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
        
      </div>
    </header>
  );
}
