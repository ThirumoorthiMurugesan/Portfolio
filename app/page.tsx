"use client";

import React from "react";
import ThemeToggle from "./components/Theme/ThemeToggle";
import Header from "./components/Header/Header";
import Sidebar from "./components/Sidebar/Sidebar";
import Experience from "./components/Experience/Experience";
import Projects from "./components/Projects/Projects";
import Education from "./components/Education/Education";
import Certifications from "./components/Certifications/Certifications";
import Footer from "./components/Footer/Footer";
import Chatbot from "./components/Chatbot/Chatbot";

export default function Home() {
  return (
    <div className="relative min-h-screen flex flex-col text-foreground transition-colors duration-500 overflow-x-hidden">
      {/* Fixed Theme Toggler in the top right */}
      <ThemeToggle />

      {/* Header Section */}
      <Header />

      {/* Experience Section */}
      <Experience />

      {/* Main Layout Grid */}
      <div className="flex-1 max-w-6xl w-full mx-auto px-6 py-12">
        <div className="flex flex-col lg:flex-row gap-10">
          
          {/* Main Content Column (Left/Center) */}
          <main className="flex-1 space-y-16 min-w-0">
            <Projects />
            <Education />
          </main>

          {/* Sidebar Column (Right) */}
          <Sidebar />
          
        </div>
      </div>

      {/* Achievements & Certifications (Full Width) */}
      <Certifications />

      {/* Footer Section */}
      <Footer />

      {/* Interactive Floating Chatbot */}
      <Chatbot />
    </div>
  );
}
