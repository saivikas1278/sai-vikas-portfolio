"use client";

import { motion } from "framer-motion";
import { Mail, Phone, ChevronDown, ArrowUpRight } from "lucide-react";
import Image from "next/image";

// Custom Inline Brand SVGs
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

const LinkedinIcon = ({ size = 20 }: { size?: number }) => (
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
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const TwitterIcon = ({ size = 20 }: { size?: number }) => (
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
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
  </svg>
);

// Components
import Navbar from "@/components/navbar";
import CanvasHero from "@/components/canvas-hero";
import ProjectCard from "@/components/sections/project-card";
import CertificationCard from "@/components/sections/certification-card";
import EducationTimeline from "@/components/sections/education-timeline";
import ContactForm from "@/components/sections/contact-form";

// Static content with absolute data integrity
import profile from "@/data/profile.json";

export default function Home() {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
  };

  return (
    <div className="relative min-h-screen selection:bg-[#F59E0B]/30 selection:text-white">
      {/* Navigation Header */}
      <Navbar />

      {/* Hero Section */}
      <section
        id="home"
        className="relative h-screen w-full flex flex-col justify-center items-center px-6 overflow-hidden"
      >
        <CanvasHero />

        {/* Ambient overlay shadows */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#030303]" />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="relative z-10 text-center max-w-4xl mx-auto flex flex-col items-center"
        >
          {/* Tagline Badge */}
          <motion.span
            variants={itemVariants}
            className="text-[10px] sm:text-xs font-black uppercase tracking-[0.25em] text-[#F97316] mb-6 bg-[#F97316]/10 border border-[#F97316]/20 shadow-[0_0_12px_rgba(249,115,22,0.15)] px-4 py-1.5 rounded-full"
          >
            CREATIVE PORTFOLIO
          </motion.span>

          {/* Headline Name */}
          <motion.h1
            variants={itemVariants}
            className="font-display font-black text-5xl sm:text-7xl md:text-8xl tracking-tight text-white mb-4 uppercase"
          >
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-zinc-100 via-white to-zinc-400">
              {profile.name}
            </span>
          </motion.h1>

          {/* Subtitle Role */}
          <motion.h2
            variants={itemVariants}
            className="font-display font-bold text-xl sm:text-2xl md:text-3xl tracking-[0.18em] text-transparent bg-clip-text bg-gradient-to-r from-[#F59E0B] via-[#F97316] to-[#EF4444] uppercase mb-8"
          >
            {profile.role}
          </motion.h2>

          {/* Short description */}
          <motion.p
            variants={itemVariants}
            className="font-sans text-base sm:text-lg text-zinc-400 max-w-md leading-relaxed"
          >
            {profile.tagline}
          </motion.p>
        </motion.div>

        {/* Cinematic Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2.5 opacity-60 pointer-events-none select-none">
          <span className="text-[10px] font-black tracking-[0.3em] uppercase text-zinc-400">
            SCROLL
          </span>
          <div className="w-[1.5px] h-12 bg-white/10 overflow-hidden relative rounded-full">
            <motion.div
              animate={{
                y: ["-100%", "100%"],
              }}
              transition={{
                duration: 2.2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-[#F59E0B] via-[#F97316] to-[#EF4444]"
            />
          </div>
        </div>
      </section>

      {/* About Section */}
      <section
        id="about"
        className="relative py-24 sm:py-32 px-4 sm:px-8 md:px-12 lg:px-16 bg-[#030303]"
      >
        <div className="glow-spot-1 top-[20%] left-[-10%]" />
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
            
            {/* Left Header columns */}
            <div className="lg:col-span-4 space-y-6 text-center lg:text-left flex flex-col items-center lg:items-start">
              <span className="text-xs font-bold text-[#F97316] tracking-[0.2em] uppercase block">
                01 / IDENTITY
              </span>
              <h2 className="font-display font-black text-4xl sm:text-5xl text-white tracking-wide uppercase">
                About Me
              </h2>
              <div className="w-16 h-[2px] bg-gradient-to-r from-[#F59E0B] via-[#F97316] to-[#EF4444] mx-auto lg:mx-0" />
            </div>

            {/* Right details content columns */}
            <div className="lg:col-span-8 space-y-8 text-center lg:text-left">
              <div className="space-y-6 text-zinc-400 font-sans text-base sm:text-lg leading-relaxed">
                {profile.about.paragraphs.map((p, idx) => (
                  <p key={idx} className="whitespace-pre-line">
                    {p}
                  </p>
                ))}
              </div>

              {/* Statistics Counters Grid */}
              <div className="grid grid-cols-3 gap-2 sm:gap-4 pt-8 border-t border-white/5">
                {profile.about.stats.map((stat, idx) => (
                  <div key={idx} className="space-y-1">
                    <span className="font-display font-black text-3xl sm:text-4xl md:text-5xl text-white block bg-clip-text text-transparent bg-gradient-to-r from-white to-zinc-400">
                      {stat.value}
                    </span>
                    <span className="text-[10px] sm:text-xs font-semibold tracking-wider text-zinc-500 uppercase block">
                      {stat.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section
        id="projects"
        className="relative py-24 sm:py-32 px-4 sm:px-8 md:px-12 lg:px-16 bg-black"
      >
        <div className="glow-spot-2 bottom-[10%] right-[-10%]" />

        <div className="max-w-7xl mx-auto relative z-10">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16">
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
              Here are some of the projects I&apos;ve worked on. Each project represents different skills and technologies I&apos;ve learned.
            </p>
          </div>

          {/* Fluid 12-Column Bento Grid Overhaul */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-8 pb-16">
            {profile.projects.map((project, idx) => {
              // Custom balanced spans: 0 is md:span-8, 1 is md:span-4, 2-4 are md:span-4, 5 is md:span-12
              let colSpanClass = "md:col-span-4";
              if (idx === 0) colSpanClass = "md:col-span-8";
              if (idx === 5) colSpanClass = "md:col-span-12";
              
              return (
                <div key={idx} className={colSpanClass}>
                  <ProjectCard project={project} index={idx} />
                </div>
              );
            })}
          </div>

          {/* External GitHub Action Button */}
          <div className="text-center mt-12 sm:mt-16">
            <a
              href="https://github.com/saivikas1278"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-3.5 border border-white/10 rounded-xl text-xs font-bold tracking-widest text-white bg-white/5 hover:border-[#F59E0B]/40 hover:bg-white/10 hover:shadow-[0_0_20px_rgba(245,158,11,0.3)] transition-all duration-300 uppercase cursor-pointer"
            >
              View All Projects on GitHub
              <ArrowUpRight size={14} />
            </a>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section
        id="skills"
        className="relative py-24 sm:py-32 px-4 sm:px-8 md:px-12 lg:px-16 bg-[#030303]"
      >
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
            <div className="lg:col-span-8 space-y-12">
              
              {/* Frontend Category */}
              <div className="space-y-4 text-center lg:text-left">
                <h3 className="font-display font-bold text-xl text-white tracking-wider uppercase border-l-0 lg:border-l-2 border-[#F59E0B] pl-0 lg:pl-3">
                  Frontend
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {profile.skills.frontend.map((skill, idx) => (
                    <motion.div
                      key={skill.name}
                      initial={{ opacity: 0, scale: 0.95 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.05 }}
                      className="glass-panel p-4 rounded-xl flex flex-col items-center gap-3 text-center transition-all duration-300 hover:border-[#F59E0B]/30 hover:shadow-[0_0_15px_rgba(245,158,11,0.15)]"
                    >
                      <div className="relative w-8 h-8 flex items-center justify-center">
                        <Image
                          src={skill.image}
                          alt={skill.name}
                          width={32}
                          height={32}
                          className="object-contain"
                        />
                      </div>
                      <span className="text-sm font-semibold tracking-wide text-zinc-300">
                        {skill.name}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Backend Category */}
              <div className="space-y-4 text-center lg:text-left">
                <h3 className="font-display font-bold text-xl text-white tracking-wider uppercase border-l-0 lg:border-l-2 border-[#EF4444] pl-0 lg:pl-3">
                  Backend
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {profile.skills.backend.map((skill, idx) => (
                    <motion.div
                      key={skill.name}
                      initial={{ opacity: 0, scale: 0.95 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.05 }}
                      className="glass-panel p-4 rounded-xl flex flex-col items-center gap-3 text-center transition-all duration-300 hover:border-[#EF4444]/30 hover:shadow-[0_0_15px_rgba(239,68,68,0.15)]"
                    >
                      <div className="relative w-8 h-8 flex items-center justify-center">
                        <Image
                          src={skill.image}
                          alt={skill.name}
                          width={32}
                          height={32}
                          className="object-contain"
                        />
                      </div>
                      <span className="text-sm font-semibold tracking-wide text-zinc-300">
                        {skill.name}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* Education & Timeline Section */}
      <section
        id="education"
        className="relative py-24 sm:py-32 px-4 sm:px-8 md:px-12 lg:px-16 bg-[#050508]"
      >
        <div className="max-w-7xl mx-auto relative z-10">
          
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 sm:mb-20">
            <div className="space-y-4 text-center md:text-left flex flex-col items-center md:items-start w-full md:w-auto">
              <span className="text-xs font-bold text-[#F97316] tracking-[0.2em] uppercase block">
                04 / EDUCATION
              </span>
              <h2 className="font-display font-black text-4xl sm:text-5xl text-white tracking-wide uppercase">
                Academics & Timelines
              </h2>
              <div className="w-16 h-[2px] bg-gradient-to-r from-[#F59E0B] via-[#F97316] to-[#EF4444] mx-auto md:mx-0" />
            </div>
          </div>

          {/* Custom flowing responsive timeline */}
          <EducationTimeline education={profile.education} />

          {/* Dynamic Grid Certifications */}
          <div className="mt-24 pt-24 border-t border-white/5">
            <h3 className="font-display font-bold text-2xl text-white uppercase tracking-wide mb-8 text-center md:text-left">
              Professional Certifications
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {profile.certifications.map((cert, idx) => (
                <CertificationCard key={idx} certification={cert} index={idx} />
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* Contact Section */}
      <section
        id="contact"
        className="relative py-24 sm:py-32 px-4 sm:px-8 md:px-12 lg:px-16 bg-[#030303]"
      >
        <div className="glow-spot-1 top-[20%] right-[-10%]" />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
            
            {/* Left Header columns */}
            <div className="lg:col-span-5 space-y-8 text-center lg:text-left flex flex-col items-center lg:items-start">
              <div className="space-y-4 text-center lg:text-left flex flex-col items-center lg:items-start w-full">
                <span className="text-xs font-bold text-[#F97316] tracking-[0.2em] uppercase block">
                  05 / ENGAGE
                </span>
                <h2 className="font-display font-black text-4xl sm:text-5xl text-white tracking-wide uppercase">
                  Contact
                </h2>
                <div className="w-16 h-[2px] bg-gradient-to-r from-[#F59E0B] via-[#F97316] to-[#EF4444] mx-auto lg:mx-0" />
              </div>

              <p className="font-sans text-base text-zinc-400 leading-relaxed max-w-md text-center lg:text-left mx-auto lg:mx-0">
                {profile.contact.text}
              </p>

              {/* Direct Info list dials */}
              <div className="space-y-4 pt-6 border-t border-white/5 w-full">
                <a
                  href={`mailto:${profile.contact.email}`}
                  className="flex items-center justify-center lg:justify-start gap-3.5 group text-zinc-400 hover:text-white transition-colors py-1 cursor-pointer"
                >
                  <span className="w-10 h-10 rounded-lg bg-zinc-900 border border-white/5 flex items-center justify-center text-[#F97316] group-hover:border-[#F97316]/45 group-hover:shadow-[0_0_10px_rgba(249,115,22,0.2)] transition-all duration-300">
                    <Mail size={16} />
                  </span>
                  <span className="text-sm font-semibold tracking-wide">
                    {profile.contact.email}
                  </span>
                </a>
                
                {profile.contact.phones.map((phone) => (
                  <a
                    key={phone}
                    href={`tel:${phone.replace(/\s+/g, "")}`}
                    className="flex items-center justify-center lg:justify-start gap-3.5 group text-zinc-400 hover:text-white transition-colors py-1 cursor-pointer"
                  >
                    <span className="w-10 h-10 rounded-lg bg-zinc-900 border border-white/5 flex items-center justify-center text-[#F97316] group-hover:border-[#F97316]/45 group-hover:shadow-[0_0_10px_rgba(249,115,22,0.2)] transition-all duration-300">
                      <Phone size={16} />
                    </span>
                    <span className="text-sm font-semibold tracking-wide">
                      {phone}
                    </span>
                  </a>
                ))}
              </div>

              {/* Social links handles */}
              <div className="flex items-center justify-center lg:justify-start gap-3 pt-6 w-full">
                <a
                  href={profile.contact.socials.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-lg bg-zinc-900 border border-white/5 flex items-center justify-center text-zinc-400 hover:text-[#F59E0B] hover:border-[#F59E0B]/45 hover:shadow-[0_0_12px_rgba(245,158,11,0.35)] hover:bg-white/10 transition-all duration-300 cursor-pointer"
                  title="GitHub Profile"
                >
                  <GithubIcon size={16} />
                </a>
                <a
                  href={profile.contact.socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-lg bg-zinc-900 border border-white/5 flex items-center justify-center text-zinc-400 hover:text-[#F97316] hover:border-[#F97316]/45 hover:shadow-[0_0_12px_rgba(249,115,22,0.35)] hover:bg-white/10 transition-all duration-300 cursor-pointer"
                  title="LinkedIn Profile"
                >
                  <LinkedinIcon size={16} />
                </a>
                <a
                  href={profile.contact.socials.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-lg bg-zinc-900 border border-white/5 flex items-center justify-center text-zinc-400 hover:text-[#EF4444] hover:border-[#EF4444]/45 hover:shadow-[0_0_12px_rgba(239,68,68,0.35)] hover:bg-white/10 transition-all duration-300 cursor-pointer"
                  title="Twitter Profile"
                >
                  <TwitterIcon size={16} />
                </a>
              </div>
            </div>

            {/* Right Column Contact Form */}
            <div className="lg:col-span-7 glass-panel p-6 sm:p-8 rounded-2xl relative">
              <ContactForm emailjsConfig={profile.contact.emailjs} />
            </div>

          </div>
        </div>
      </section>

      {/* Modern minimal footer bar */}
      <footer className="py-8 text-center border-t border-white/5 bg-[#030303] text-zinc-500 font-sans text-xs">
        <div className="max-w-7xl mx-auto px-6">
          <p>© {new Date().getFullYear()} {profile.name}. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
