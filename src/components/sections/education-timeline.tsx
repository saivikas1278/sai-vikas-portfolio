"use client";

import { motion } from "framer-motion";
import { GraduationCap, Calendar, Award, BookOpen } from "lucide-react";

interface TimelineItem {
  degree: string;
  institution: string;
  date: string;
  gpa?: string;
  marks?: string;
  jee?: string;
  eapcet?: string;
  description: string;
  coursework?: string[];
}

interface EducationTimelineProps {
  education: TimelineItem[];
}

export default function EducationTimeline({ education }: EducationTimelineProps) {
  return (
    <div className="relative max-w-4xl mx-auto pl-4 sm:pl-6 md:pl-0 pr-4 sm:pr-6 md:pr-0">
      {/* Central/Left Track Line */}
      <div className="absolute left-[16px] sm:left-[24px] md:left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-[#F59E0B]/40 via-[#F97316]/35 to-transparent transform -translate-x-1/2" />

      {education.map((item, idx) => {
        const isEven = idx % 2 === 0;

        return (
          <div
            key={idx}
            className={`relative mb-12 md:mb-16 flex flex-col md:flex-row items-start ${
              isEven ? "md:flex-row-reverse" : ""
            }`}
          >
            {/* Timeline Circle Badge Indicator */}
            <div className="absolute left-[16px] sm:left-[24px] md:left-1/2 transform -translate-x-1/2 flex items-center justify-center w-8 h-8 rounded-full bg-zinc-950 border-2 border-[#F97316]/70 text-[#F97316] shadow-[0_0_10px_rgba(249,115,22,0.35)] z-10">
              <GraduationCap size={14} />
            </div>

            {/* Content Container (flows to the right on mobile, alternates on desktop) */}
            <motion.div
              initial={{ opacity: 0, x: isEven ? 30 : -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className={`w-full md:w-[45%] pl-10 sm:pl-12 md:pl-0 ${
                isEven ? "md:text-left" : "md:text-right"
              }`}
            >
              <div className="glass-panel p-6 rounded-2xl relative overflow-hidden transition-all duration-300 hover:border-[#F59E0B]/35 hover:shadow-[0_10px_30px_rgba(245,158,11,0.1)]">
                {/* Floating ambient glow */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-[#F97316]/5 rounded-full filter blur-xl" />

                {/* Date & Institution */}
                <div className={`flex flex-wrap items-center gap-2 mb-2 text-xs font-bold text-[#F97316] ${
                  isEven ? "md:justify-start" : "md:justify-end"
                }`}>
                  <span className="flex items-center gap-1">
                    <Calendar size={12} />
                    {item.date}
                  </span>
                  <span>•</span>
                  <span>{item.institution}</span>
                </div>

                {/* Degree Title (only if not empty) */}
                {item.degree && (
                  <h3 className="font-display font-bold text-lg text-white mb-3">
                    {item.degree}
                  </h3>
                )}

                {/* Secondary Credentials & Scores (marks, JEE, EAPCET) */}
                {(item.gpa || item.marks || item.jee || item.eapcet) && (
                  <div className={`flex flex-wrap gap-2 mb-4 ${
                    isEven ? "md:justify-start" : "md:justify-end"
                  }`}>
                    {item.gpa && (
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded bg-[#F59E0B]/15 text-[#FDE68A] border border-[#F59E0B]/30 shadow-[0_0_8px_rgba(245,158,11,0.15)]">
                        {item.gpa}
                      </span>
                    )}
                    {item.marks && (
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-zinc-900 text-zinc-300 border border-white/5">
                        Marks: {item.marks}
                      </span>
                    )}
                    {item.jee && (
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded bg-[#F97316]/15 text-[#FED7AA] border border-[#F97316]/30 shadow-[0_0_8px_rgba(249,115,22,0.15)]">
                        JEE: {item.jee}
                      </span>
                    )}
                    {item.eapcet && (
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded bg-[#EF4444]/15 text-[#FCA5A5] border border-[#EF4444]/30 shadow-[0_0_8px_rgba(239,68,68,0.15)]">
                        EAPCET: {item.eapcet}
                      </span>
                    )}
                  </div>
                )}

                {/* Description Paragraph */}
                <p className="font-sans text-sm text-zinc-400 leading-relaxed mb-4">
                  {item.description}
                </p>

                {/* Coursework mapping */}
                {item.coursework && item.coursework.length > 0 && (
                  <div className="mt-4 pt-4 border-t border-white/5">
                    <h4 className={`text-xs font-bold text-zinc-300 flex items-center gap-1.5 mb-2.5 ${
                      isEven ? "md:justify-start" : "md:justify-end"
                    }`}>
                      <BookOpen size={12} className="text-[#F97316]" />
                      Relevant Coursework:
                    </h4>
                    <div className={`flex flex-wrap gap-1.5 ${
                      isEven ? "md:justify-start" : "md:justify-end"
                    }`}>
                      {item.coursework.map((course) => (
                        <span
                          key={course}
                          className="text-[10px] bg-white/5 text-zinc-300 px-2 py-0.5 rounded-md hover:bg-white/10 hover:text-white transition-colors"
                        >
                          {course}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        );
      })}
    </div>
  );
}
