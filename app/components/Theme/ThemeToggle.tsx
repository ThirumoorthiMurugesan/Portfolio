"use client";

import React from "react";
import { useTheme } from "./ThemeContext";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="fixed top-6 right-6 z-50 flex items-center justify-center w-11 h-11 rounded-full border border-zinc-200/50 bg-white/80 text-zinc-800 shadow-sm backdrop-blur-md transition-all duration-300 hover:scale-110 active:scale-95 dark:border-zinc-800/50 dark:bg-zinc-950/80 dark:text-zinc-200 dark:shadow-[0_0_15px_rgba(255,255,255,0.05)] cursor-pointer"
      aria-label="Toggle theme"
    >
      <div className="relative w-6 h-6 flex items-center justify-center overflow-hidden">
        {/* Sun Icon */}
        <span
          className={`absolute transform transition-all duration-500 ease-in-out ${
            theme === "light"
              ? "translate-y-0 rotate-0 opacity-100 scale-100"
              : "translate-y-8 -rotate-90 opacity-0 scale-50"
          }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-5 h-5 text-amber-500"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 3v2.25m0 13.5V21M4.22 4.22l1.59 1.59m12.38 12.38l1.59 1.59M3 12h2.25m13.5 0H21M5.81 18.19l-1.59 1.59m12.38-12.38l-1.59 1.59M12 7.5a4.5 4.5 0 1 0 0 9 4.5 4.5 0 0 0 0-9Z"
            />
          </svg>
        </span>

        {/* Moon Icon */}
        <span
          className={`absolute transform transition-all duration-500 ease-in-out ${
            theme === "dark"
              ? "translate-y-0 rotate-0 opacity-100 scale-100"
              : "-translate-y-8 rotate-90 opacity-0 scale-50"
          }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-5 h-5 text-indigo-400"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z"
            />
          </svg>
        </span>
      </div>
    </button>
  );
}
