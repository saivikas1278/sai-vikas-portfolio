"use client";

import { useState } from "react";

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: "Home", href: "#home" },
    { label: "About", href: "#about" },
    { label: "Projects", href: "#projects" },
    { label: "Skills", href: "#skills" },
    { label: "Contact", href: "#contact" },
  ];

  const projects = [
    {
      title: "Cricket Team Fund Tracker",
      description: "A comprehensive web portal designed to manage team budgets, match fees, tournament entry costs, and individual player contributions. Features transaction logs, live balance updates, and automated billing statistics.",
      tags: ["Next.js", "Tailwind CSS", "Node.js", "MongoDB"],
      github: "https://github.com/saivikas1278/cricket-fund-tracker",
      demo: "#",
    },
    {
      title: "Local Cricket Tournament Auction App",
      description: "An interactive real-time bidding dashboard built for local cricket leagues. Includes team budget tracking, visual bid logs, roster management, and live bid state updates.",
      tags: ["React", "Express", "Socket.io", "MongoDB"],
      github: "https://github.com/saivikas1278/cricket-auction-app",
      demo: "#",
    },
    {
      title: "E-Commerce Platform",
      description: "A secure online shopping application featuring advanced product catalog searching, user cart persistent states, secure payment processor APIs, and live invoice generation.",
      tags: ["JavaScript", "Node.js", "MongoDB", "Stripe"],
      github: "https://github.com/saivikas1278/ecommerce-website",
      demo: "#",
    },
    {
      title: "Weather Dashboard",
      description: "A sleek geographical weather interface rendering 5-day metrics, temperature forecasts, wind velocities, and atmospheric pressure using secure open REST API architectures.",
      tags: ["HTML5", "CSS3", "JavaScript", "REST API"],
      github: "https://github.com/saivikas1278/weather-dashboard",
      demo: "#",
    },
  ];

  const skills = [
    { name: "React", level: "Expert" },
    { name: "Next.js", level: "Advanced" },
    { name: "Tailwind CSS", level: "Expert" },
    { name: "Node.js", level: "Advanced" },
    { name: "Python", level: "Intermediate" },
  ];

  return (
    <div className="relative min-h-screen selection:bg-[#F59E0B]/30 selection:text-white">
      {/* Navigation Header */}
      <header className="fixed top-0 left-0 right-0 h-16 bg-black/85 backdrop-blur-md border-b border-[#F59E0B]/15 z-50">
        <div className="max-w-7xl mx-auto h-full px-4 sm:px-8 md:px-12 lg:px-16 flex items-center justify-between relative">
          {/* Brand Logo */}
          <a href="#home" className="font-display font-black text-lg tracking-wider text-white">
            <span className="inline-block border border-[#F97316]/50 px-2.5 py-1 rounded bg-[#F97316]/5 hover:shadow-[0_0_15px_rgba(249,115,22,0.3)] transition-all">
              SV
            </span>
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-8 absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="font-sans font-semibold text-xs uppercase tracking-widest text-zinc-400 hover:text-[#F59E0B] transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* HIRE ME Button (Desktop) */}
          <div className="hidden md:block">
            <a
              href="#contact"
              className="inline-flex items-center justify-center px-4 py-1.5 rounded-lg text-xs font-bold tracking-wider text-white bg-gradient-to-r from-[#F59E0B] via-[#F97316] to-[#EF4444] hover:shadow-[0_0_15px_rgba(245,158,11,0.5)] hover:scale-105 active:scale-95 transition-all duration-300"
            >
              HIRE ME
            </a>
          </div>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden flex items-center justify-center w-9 h-9 border border-white/10 rounded-lg text-zinc-400 hover:text-white"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="4" y1="12" x2="20" y2="12" />
              <line x1="4" y1="6" x2="20" y2="6" />
              <line x1="4" y1="18" x2="20" y2="18" />
            </svg>
          </button>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <nav className="md:hidden absolute top-16 left-0 right-0 bg-black/95 border-b border-[#F59E0B]/15 px-6 py-6 flex flex-col gap-4 animate-fade-in">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="font-sans font-bold text-sm tracking-wide text-zinc-300 hover:text-[#F59E0B] transition-colors"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="mt-2 w-full text-center px-4 py-2.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-[#F59E0B] via-[#F97316] to-[#EF4444]"
            >
              HIRE ME
            </a>
          </nav>
        )}
      </header>

      {/* Hero Section */}
      <section id="home" className="relative h-screen w-full flex flex-col justify-center items-center px-4 sm:px-8 md:px-12 lg:px-16 overflow-hidden">
        {/* Soft Background Accent Glows */}
        <div className="absolute top-[20%] left-[20%] w-[350px] h-[350px] rounded-full bg-[#F59E0B]/5 filter blur-[60px] pointer-events-none" />
        <div className="absolute bottom-[20%] right-[20%] w-[350px] h-[350px] rounded-full bg-[#EF4444]/5 filter blur-[60px] pointer-events-none" />

        <div className="relative z-10 text-center max-w-3xl mx-auto flex flex-col items-center">
          <span className="text-[10px] sm:text-xs font-black uppercase tracking-[0.25em] text-[#F97316] mb-6 bg-[#F97316]/10 border border-[#F97316]/20 shadow-[0_0_12px_rgba(249,115,22,0.15)] px-4 py-1.5 rounded-full">
            ENGINEERING & INNOVATION
          </span>

          <h1 className="font-display font-black text-5xl sm:text-7xl md:text-8xl tracking-tight text-white mb-4 uppercase">
            SAI VIKAS
          </h1>

          <h2 className="font-display font-bold text-xl sm:text-2xl md:text-3xl tracking-[0.15em] text-transparent bg-clip-text bg-gradient-to-r from-[#F59E0B] via-[#F97316] to-[#EF4444] uppercase mb-8">
            Computer Science & IT Student / Developer
          </h2>

          <p className="font-sans text-sm sm:text-base text-zinc-400 max-w-lg leading-relaxed mb-10">
            Currently pursuing my Bachelor's degree at SRKR Engineering College. Specializing in highly interactive frontends, real-time cricket auction apps, and scalable web architectures.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
            <a
              href="#projects"
              className="px-8 py-3.5 rounded-xl text-xs font-bold tracking-widest text-white bg-gradient-to-r from-[#F59E0B] via-[#F97316] to-[#EF4444] hover:shadow-[0_0_20px_rgba(245,158,11,0.4)] hover:scale-105 active:scale-95 transition-all duration-300"
            >
              VIEW PROJECTS
            </a>
            <a
              href="#contact"
              className="px-8 py-3.5 rounded-xl text-xs font-bold tracking-widest text-zinc-300 border border-white/10 hover:border-[#F59E0B]/40 hover:bg-white/5 transition-all duration-300"
            >
              GET IN TOUCH
            </a>
          </div>
        </div>
      </section>

      {/* About Me Section */}
      <section id="about" className="relative py-24 sm:py-32 px-4 sm:px-8 md:px-12 lg:px-16 bg-zinc-950/20 border-t border-white/5">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
            {/* Left Header */}
            <div className="lg:col-span-4 space-y-6 text-center lg:text-left flex flex-col items-center lg:items-start">
              <span className="text-xs font-bold text-[#F97316] tracking-[0.2em] uppercase block">
                01 / IDENTITY
              </span>
              <h2 className="font-display font-black text-4xl sm:text-5xl text-white tracking-wide uppercase">
                About Me
              </h2>
              <div className="w-16 h-[2px] bg-gradient-to-r from-[#F59E0B] via-[#F97316] to-[#EF4444] mx-auto lg:mx-0" />
            </div>

            {/* Right Details */}
            <div className="lg:col-span-8 space-y-8 text-center lg:text-left">
              <div className="space-y-6 text-zinc-400 font-sans text-base sm:text-lg leading-relaxed">
                <p>
                  I'm a dedicated Computer Science & Information Technology student with a deep passion for building interactive web applications, real-time bid managers, and database models. My engineering journey is built around structured problem solving and crafting highly visual, responsive layouts.
                </p>
                <p>
                  Beyond web structures, I am highly interested in playing cricket, coordinating local tournaments, tracking sports metrics, and working on competitive programming algorithms. I keep myself updated with cutting-edge libraries to build highly functional web systems.
                </p>
              </div>

              {/* Statistics Counters */}
              <div className="grid grid-cols-3 gap-4 pt-8 border-t border-white/5">
                <div>
                  <span className="font-display font-black text-3xl sm:text-4xl md:text-5xl text-transparent bg-clip-text bg-gradient-to-r from-white to-zinc-400 block">
                    8.0
                  </span>
                  <span className="text-[10px] sm:text-xs font-semibold tracking-wider text-zinc-500 uppercase block mt-1">
                    B.Tech GPA
                  </span>
                </div>
                <div>
                  <span className="font-display font-black text-3xl sm:text-4xl md:text-5xl text-transparent bg-clip-text bg-gradient-to-r from-white to-zinc-400 block">
                    958
                  </span>
                  <span className="text-[10px] sm:text-xs font-semibold tracking-wider text-zinc-500 uppercase block mt-1">
                    Intermediate Marks
                  </span>
                </div>
                <div>
                  <span className="font-display font-black text-3xl sm:text-4xl md:text-5xl text-transparent bg-clip-text bg-gradient-to-r from-white to-zinc-400 block">
                    15,511
                  </span>
                  <span className="text-[10px] sm:text-xs font-semibold tracking-wider text-zinc-500 uppercase block mt-1">
                    EAPCET Rank
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="relative py-24 sm:py-32 px-4 sm:px-8 md:px-12 lg:px-16 bg-black border-t border-white/5">
        <div className="max-w-7xl mx-auto relative z-10">
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 sm:mb-20">
            <div className="space-y-4 text-center md:text-left flex flex-col items-center md:items-start w-full md:w-auto">
              <span className="text-xs font-bold text-[#F97316] tracking-[0.2em] uppercase block">
                02 / WORK
              </span>
              <h2 className="font-display font-black text-4xl sm:text-5xl text-white tracking-wide uppercase">
                My Projects
              </h2>
              <div className="w-16 h-[2px] bg-gradient-to-r from-[#F59E0B] via-[#F97316] to-[#EF4444] mx-auto md:mx-0" />
            </div>
            <p className="text-zinc-400 font-sans text-sm sm:text-base max-w-md leading-relaxed text-center md:text-left mx-auto md:mx-0">
              Each project is curated to showcase a practical approach to real-life challenges, utilizing robust algorithms, clean databases, and smooth animations.
            </p>
          </div>

          {/* Symmetrical Bento Grid (2 columns on desktop) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 pb-16">
            {projects.map((project, idx) => (
              <div
                key={idx}
                className="group relative rounded-[24px] p-[1px] bg-white/5 hover:bg-gradient-to-br hover:from-[#F59E0B] hover:to-[#F97316] transition-all duration-500 hover:scale-[1.01] hover:shadow-[0_20px_50px_rgba(245,158,11,0.12)]"
              >
                <div 
                  className="relative rounded-[23px] overflow-hidden flex flex-col h-full backdrop-blur-md p-6 sm:p-8 justify-between gap-6"
                  style={{ backgroundColor: "rgba(10, 10, 10, 0.75)" }}
                >
                  {/* Giant Faint Watermark Layer */}
                  <div className="absolute inset-0 flex items-center justify-center select-none pointer-events-none z-0">
                    <span className="font-display font-black text-6xl sm:text-8xl tracking-[0.25em] uppercase text-white/[0.01]">
                      WORK
                    </span>
                  </div>

                  <div className="relative z-10 space-y-4">
                    <h3 className="font-display font-bold text-xl sm:text-2xl text-white group-hover:text-[#F59E0B] transition-colors duration-300">
                      {project.title}
                    </h3>
                    <p className="font-sans text-sm text-zinc-400 leading-relaxed">
                      {project.description}
                    </p>
                  </div>

                  <div className="relative z-10 space-y-6 mt-auto">
                    {/* Tech Pills */}
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-[10px] font-bold uppercase tracking-wider px-3.5 py-1 rounded-full border border-[#F59E0B]/20 bg-[#F59E0B]/5 text-[#FDE68A]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Action Anchors */}
                    <div className="flex items-center gap-3 w-full pt-2">
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold tracking-widest text-white border border-white/10 bg-transparent hover:bg-white/5 hover:border-white/20 transition-all duration-300 active:scale-95 shrink-0"
                      >
                        GITHUB
                      </a>
                      <a
                        href={project.demo}
                        className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold tracking-widest text-white bg-gradient-to-r from-[#F97316] to-[#EF4444] hover:shadow-[0_0_20px_rgba(249,115,22,0.4)] transition-all duration-300 active:scale-95 shrink-0"
                      >
                        DEMO
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="relative py-24 sm:py-32 px-4 sm:px-8 md:px-12 lg:px-16 bg-[#030303] border-t border-white/5">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
            {/* Left Header */}
            <div className="lg:col-span-4 space-y-6 text-center lg:text-left flex flex-col items-center lg:items-start">
              <span className="text-xs font-bold text-[#F97316] tracking-[0.2em] uppercase block">
                03 / CAPABILITIES
              </span>
              <h2 className="font-display font-black text-4xl sm:text-5xl text-white tracking-wide uppercase">
                Skills
              </h2>
              <div className="w-16 h-[2px] bg-gradient-to-r from-[#F59E0B] via-[#F97316] to-[#EF4444] mx-auto lg:mx-0" />
            </div>

            {/* Right Skills Category layouts */}
            <div className="lg:col-span-8 space-y-8">
              <h3 className="font-display font-bold text-xl text-white tracking-wider uppercase border-l-2 border-[#F59E0B] pl-3 mb-6 text-left">
                Technical Stack
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {skills.map((skill, idx) => (
                  <div
                    key={skill.name}
                    className="glass-panel p-5 rounded-2xl flex flex-col items-start gap-2 border border-white/5 bg-zinc-950/40 hover:border-[#F59E0B]/30 hover:shadow-[0_0_15px_rgba(245,158,11,0.1)] transition-all duration-300"
                  >
                    <span className="text-sm font-black uppercase tracking-wider text-zinc-500">
                      0{idx + 1}
                    </span>
                    <span className="text-lg font-bold tracking-wide text-white">
                      {skill.name}
                    </span>
                    <span className="text-xs font-semibold tracking-widest text-[#FDE68A] uppercase">
                      {skill.level}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="relative py-24 sm:py-32 px-4 sm:px-8 md:px-12 lg:px-16 bg-zinc-950/20 border-t border-white/5">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
            {/* Left Column Header Details */}
            <div className="lg:col-span-5 space-y-8 text-center lg:text-left flex flex-col items-center lg:items-start">
              <div className="space-y-4 text-center lg:text-left flex flex-col items-center lg:items-start w-full">
                <span className="text-xs font-bold text-[#F97316] tracking-[0.2em] uppercase block">
                  04 / ENGAGE
                </span>
                <h2 className="font-display font-black text-4xl sm:text-5xl text-white tracking-wide uppercase">
                  Contact
                </h2>
                <div className="w-16 h-[2px] bg-gradient-to-r from-[#F59E0B] via-[#F97316] to-[#EF4444] mx-auto lg:mx-0" />
              </div>

              <p className="font-sans text-sm sm:text-base text-zinc-400 leading-relaxed max-w-md">
                I'm always open to discussing new freelance roles, sports app ideas, full-stack database integrations, or technical collaborations. Let's create something functional!
              </p>

              {/* Direct Info List */}
              <div className="space-y-4 pt-6 border-t border-white/5 w-full">
                <a
                  href="mailto:cheepusaivikas549@gmail.com"
                  className="flex items-center justify-center lg:justify-start gap-3.5 group text-zinc-400 hover:text-white transition-colors"
                >
                  <span className="w-10 h-10 rounded-lg bg-zinc-900 border border-white/5 flex items-center justify-center text-[#F97316] group-hover:border-[#F97316]/45 group-hover:shadow-[0_0_10px_rgba(249,115,22,0.2)] transition-all duration-300">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                      <polyline points="22,6 12,13 2,6" />
                    </svg>
                  </span>
                  <span className="text-sm font-semibold tracking-wide">
                    cheepusaivikas549@gmail.com
                  </span>
                </a>

                <div className="flex flex-col gap-4">
                  <a
                    href="tel:+917989001874"
                    className="flex items-center justify-center lg:justify-start gap-3.5 group text-zinc-400 hover:text-white transition-colors"
                  >
                    <span className="w-10 h-10 rounded-lg bg-zinc-900 border border-white/5 flex items-center justify-center text-[#F97316] group-hover:border-[#F97316]/45 group-hover:shadow-[0_0_10px_rgba(249,115,22,0.2)] transition-all duration-300">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                      </svg>
                    </span>
                    <span className="text-sm font-semibold tracking-wide">
                      +91 7989001874
                    </span>
                  </a>
                </div>
              </div>

              {/* Social icons */}
              <div className="flex items-center justify-center lg:justify-start gap-3 pt-6 w-full">
                <a
                  href="https://github.com/saivikas1278"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-lg bg-zinc-900 border border-white/5 flex items-center justify-center text-zinc-400 hover:text-[#F59E0B] hover:border-[#F59E0B]/45 hover:shadow-[0_0_12px_rgba(245,158,11,0.35)] hover:bg-white/10 transition-all duration-300"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
                  </svg>
                </a>
                <a
                  href="https://linkedin.com/in/sai-vikas"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-lg bg-zinc-900 border border-white/5 flex items-center justify-center text-zinc-400 hover:text-[#F97316] hover:border-[#F97316]/45 hover:shadow-[0_0_12px_rgba(249,115,22,0.35)] hover:bg-white/10 transition-all duration-300"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                    <rect x="2" y="9" width="4" height="12" />
                    <circle cx="4" cy="4" r="2" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Right Column simple text card */}
            <div className="lg:col-span-7 p-8 rounded-2xl border border-white/5 bg-zinc-950/40 relative overflow-hidden flex flex-col justify-center min-h-[250px]">
              <div className="absolute top-0 right-0 w-24 h-24 bg-[#F59E0B]/5 rounded-full filter blur-xl" />
              <h3 className="font-display font-bold text-xl text-white mb-3 tracking-wide">
                Looking for a custom project?
              </h3>
              <p className="font-sans text-sm text-zinc-400 leading-relaxed mb-6">
                I build fast, interactive, and customized single-page React and Next.js applications featuring responsive tailwind components and seamless static exports. Write to me via email or phone and I'll respond within 24 hours.
              </p>
              <a
                href="mailto:cheepusaivikas549@gmail.com"
                className="inline-flex items-center justify-center px-6 py-3 rounded-xl font-bold tracking-widest text-xs text-white bg-gradient-to-r from-[#F59E0B] via-[#F97316] to-[#EF4444] hover:shadow-[0_0_20px_rgba(245,158,11,0.5)] transition-all duration-300 uppercase w-full sm:w-auto self-start"
              >
                Send Message
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 text-center border-t border-white/5 bg-black text-zinc-600 font-sans text-xs">
        <div className="max-w-7xl mx-auto px-6">
          <p>© {new Date().getFullYear()} SAI VIKAS. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
