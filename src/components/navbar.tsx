"use client";

import { useState, useEffect } from "react";
import { motion, useScroll } from "framer-motion";
import { playUISound } from "@/utils/sound-manager";

interface NavLink {
  label: string;
  href: string;
}

const navLinks: NavLink[] = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Education", href: "#education" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [soundEnabled, setSoundEnabled] = useState(true);
  const { scrollYProgress } = useScroll();

  // Load sound configuration on client mount
  useEffect(() => {
    const stored = localStorage.getItem("sound-enabled");
    if (stored !== null) {
      setSoundEnabled(stored === "true");
    }
  }, []);

  const toggleSound = () => {
    const nextState = !soundEnabled;
    setSoundEnabled(nextState);
    localStorage.setItem("sound-enabled", String(nextState));
    // Trigger tick feedback on toggle
    if (nextState) {
      setTimeout(() => {
        playUISound("click");
      }, 50);
    }
  };

  // Scroll Shrink detection
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // IntersectionObserver to track scroll location and active section
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "-120px 0px -40% 0px",
      threshold: 0.1,
    };

    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, observerOptions);

    navLinks.forEach((link) => {
      const element = document.querySelector(link.href);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  // Smooth scroll handler for anchor links
  const handleAnchorClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetElement = document.querySelector(href);
    if (targetElement) {
      const topOffset = targetElement.getBoundingClientRect().top + window.pageYOffset - 80;
      window.scrollTo({
        top: topOffset,
        behavior: "smooth",
      });
    }
  };

  return (
    <>
      {/* Top Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#F59E0B] via-[#F97316] to-[#EF4444] origin-[0%] z-55"
        style={{ scaleX: scrollYProgress }}
      />

      <header
        className={`fixed top-0 left-0 right-0 transition-all duration-500 z-50 ${
          isScrolled
            ? "h-16 bg-[#030303]/80 backdrop-blur-md border-b border-[#F59E0B]/15 shadow-[0_4px_30px_rgba(245,158,11,0.03)]"
            : "h-20 bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto h-full px-4 sm:px-6 flex items-center justify-between gap-4 relative">
          {/* SV Logo with tactile scaling, glows, and sound triggers */}
          <a
            href="#home"
            onClick={(e) => {
              playUISound("click");
              handleAnchorClick(e, "#home");
            }}
            onMouseEnter={() => playUISound("hover")}
            className="group flex items-center gap-1.5 font-display font-black text-lg sm:text-xl tracking-wider text-white shrink-0"
          >
            <span className="relative flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 border border-white/10 rounded-lg bg-white/5 overflow-hidden transition-all duration-300 group-hover:border-[#F97316]/50 group-hover:scale-105 group-active:scale-95 group-hover:shadow-[0_0_15px_rgba(249,115,22,0.3)]">
              <span className="absolute inset-0 bg-gradient-to-br from-[#F59E0B]/20 to-[#EF4444]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              SV
            </span>
          </a>

          {/* Persistent Responsive Navigation Links */}
          <nav className="flex items-center gap-2.5 xs:gap-4 sm:gap-6 lg:gap-8 overflow-x-auto no-scrollbar scroll-smooth md:absolute md:left-1/2 md:-translate-x-1/2 md:top-1/2 md:-translate-y-1/2">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.substring(1);
              return (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => {
                    playUISound("click");
                    handleAnchorClick(e, link.href);
                  }}
                  onMouseEnter={() => playUISound("hover")}
                  className={`relative py-1.5 sm:py-2 font-sans font-medium text-[10.5px] xs:text-xs sm:text-sm tracking-wide transition-all duration-300 group shrink-0 active:scale-95 ${
                    isActive
                      ? "text-[#F59E0B] font-semibold"
                      : "text-zinc-400 hover:text-white"
                  }`}
                >
                  {link.label}
                  {/* Expanding Underline from Center */}
                  <span
                    className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-[2px] bg-gradient-to-r from-[#F59E0B] via-[#F97316] to-[#EF4444] transition-all duration-300 ${
                      isActive
                        ? "w-full opacity-100"
                        : "w-0 opacity-0 group-hover:w-full group-hover:opacity-100"
                    }`}
                  />
                </a>
              );
            })}
          </nav>

          {/* Audio & Hires CTA Controls Container */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Zero-Latency UI Audio Toggle controls */}
            <button
              onClick={toggleSound}
              onMouseEnter={() => playUISound("hover")}
              className="relative flex items-center justify-center w-8.5 h-8.5 rounded-xl border border-white/10 bg-white/5 hover:border-[#F97316]/40 hover:text-white transition-all duration-300 hover:scale-105 active:scale-95 shrink-0"
              title={soundEnabled ? "Mute interface feedback sounds" : "Unmute interface feedback sounds"}
            >
              {soundEnabled ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#F97316]">
                  <path d="M11 5L6 9H2v6h4l5 4V5z" />
                  <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
                  <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-zinc-500">
                  <path d="M11 5L6 9H2v6h4l5 4V5z" />
                  <line x1="22" y1="9" x2="16" y2="15" />
                  <line x1="16" y1="9" x2="22" y2="15" />
                </svg>
              )}
            </button>

            {/* Hire Me Action button */}
            <a
              href="#contact"
              onClick={(e) => {
                playUISound("click");
                handleAnchorClick(e, "#contact");
              }}
              onMouseEnter={() => playUISound("hover")}
              className="relative hidden sm:inline-flex items-center justify-center px-4 py-2 rounded-lg text-[10px] sm:text-xs font-bold tracking-wider text-white bg-gradient-to-r from-[#F59E0B] via-[#F97316] to-[#EF4444] hover:shadow-[0_0_20px_rgba(245,158,11,0.5)] hover:scale-105 active:scale-95 transition-all duration-300 shrink-0"
            >
              HIRE ME
            </a>
          </div>
        </div>
      </header>
    </>
  );
}
