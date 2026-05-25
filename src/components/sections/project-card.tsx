"use client";

import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { playUISound } from "@/utils/sound-manager";

const GithubIcon = ({ size = 20 }: { size?: number }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

interface ProjectCardProps {
  project: {
    title: string;
    description: string;
    tags: string[];
    github: string;
    demo: string;
  };
  index: number;
}

export default function ProjectCard({ project, index }: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={() => playUISound("hover")}
      className="group relative rounded-[24px] p-[1px] bg-white/5 hover:bg-gradient-to-br hover:from-[#F59E0B] hover:to-[#F97316] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:scale-[1.02] hover:shadow-[0_20px_50px_rgba(245,158,11,0.15)] h-full"
    >
      {/* Luxurious Deep Slate Card Backdrop */}
      <div 
        className="relative rounded-[23px] overflow-hidden flex flex-col h-full backdrop-blur-md p-6 sm:p-8 justify-between gap-6"
        style={{ backgroundColor: "rgba(10, 10, 10, 0.7)" }}
      >
        
        {/* Giant Watermark Background Layer - Dark Purple-Grey Watermark */}
        <div className="absolute inset-0 flex items-center justify-center select-none pointer-events-none z-0">
          <span 
            className="font-display font-black text-7xl sm:text-[10rem] tracking-[0.2em] uppercase"
            style={{ color: "rgba(20, 20, 20, 0.8)" }}
          >
            PROJECT
          </span>
        </div>

        {/* Decorative dynamic ambient background glows */}
        <div className="absolute -top-20 -right-20 w-44 h-44 bg-[#F97316]/5 group-hover:bg-[#F97316]/10 rounded-full filter blur-3xl pointer-events-none transition-colors duration-500" />
        <div className="absolute -bottom-20 -left-20 w-44 h-44 bg-[#EF4444]/5 group-hover:bg-[#EF4444]/10 rounded-full filter blur-3xl pointer-events-none transition-colors duration-500" />

        {/* Card Content Wrapper */}
        <div className="relative z-10 flex flex-col h-full justify-between gap-6 min-w-0">
          
          {/* Top Segment: Title & Description */}
          <div className="space-y-3 min-w-0">
            <h3 className="font-display font-bold text-xl sm:text-2xl text-white tracking-wide group-hover:text-[#F59E0B] transition-colors duration-300">
              {project.title}
            </h3>
            
            <p className="font-sans text-sm sm:text-base text-[#D1D5DB] leading-relaxed">
              {project.description}
            </p>
          </div>

          {/* Bottom Segment: Tech Stack Tags & Buttons */}
          <div className="space-y-6 shrink-0 mt-auto">
            
            {/* Tech Stack Tags row - indigo backings with violet text */}
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  onMouseEnter={() => playUISound("hover")}
                  className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider px-3.5 py-1 rounded-full border border-[#F59E0B]/20 transition-all duration-300"
                  style={{
                    backgroundColor: "rgba(245, 158, 11, 0.1)",
                    color: "#FDE68A"
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Action Buttons with high-end organic gradient hover expansions */}
            <div className="flex items-center gap-3 w-full">
              {/* CODE button: clean glass backing turning to subtle solid slate */}
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => playUISound("click")}
                onMouseEnter={() => playUISound("hover")}
                className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-xs font-bold tracking-widest text-white border border-white/10 bg-transparent hover:bg-white/5 hover:border-white/20 transition-all duration-300 active:scale-95 shrink-0"
              >
                <GithubIcon size={14} />
                CODE
              </a>
              {/* DEMO button: Sleek gradient Violet to Royal Blue shifting on hover */}
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => playUISound("click")}
                onMouseEnter={() => playUISound("hover")}
                className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-xs font-bold tracking-widest text-white bg-gradient-to-r from-[#F97316] to-[#EF4444] hover:shadow-[0_0_20px_rgba(249,115,22,0.4)] transition-all duration-300 active:scale-95 shrink-0"
              >
                <ExternalLink size={14} />
                DEMO
              </a>
            </div>

          </div>

        </div>

      </div>
    </motion.div>
  );
}
