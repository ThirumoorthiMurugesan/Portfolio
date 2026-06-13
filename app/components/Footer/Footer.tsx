"use client";

import React from "react";
import { resumeData } from "../../data/resume";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="w-full border-t border-card-border bg-card-bg/30 py-8 px-6 md:px-12 transition-colors duration-500">
      <div className="max-w-6xl mx-auto flex flex-col items-center justify-between gap-6 md:flex-row text-center md:text-left">
        
        {/* Declaration and Signature */}
        <div className="max-w-md space-y-1.5">
          <p className="text-xs text-muted-text italic">
            &ldquo;I hereby declare that the information furnished above is true and correct to the best of my knowledge and belief.&rdquo;
          </p>
          <p className="text-xs font-bold text-foreground">
            &mdash; {resumeData.name}
          </p>
        </div>

        {/* Copyright */}
        <div className="space-y-1">
          <p className="text-xs text-muted-text">
            &copy; {currentYear} {resumeData.name}. All Rights Reserved.
          </p>
          <p className="text-[10px] text-muted-text/80">
          </p>
        </div>

      </div>
    </footer>
  );
}
