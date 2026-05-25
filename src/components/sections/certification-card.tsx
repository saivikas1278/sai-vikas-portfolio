"use client";

import { motion } from "framer-motion";
import { Award, Calendar, ShieldCheck } from "lucide-react";

interface CertificationCardProps {
  certification: {
    title: string;
    issuer: string;
    date: string;
    credentialId?: string;
    image?: string;
  };
  index: number;
}

export default function CertificationCard({
  certification,
  index,
}: CertificationCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="glass-panel glass-panel-hover p-5 sm:p-6 rounded-2xl flex gap-4 items-start relative overflow-hidden"
    >
      {/* Decorative Light Effect */}
      <div className="absolute top-0 right-0 w-24 h-24 bg-[#F97316]/5 rounded-full filter blur-xl pointer-events-none" />

      {/* Modern Badge / Icon */}
      <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-[#F59E0B]/10 border border-[#F59E0B]/25 flex items-center justify-center text-[#F59E0B] shadow-[0_0_12px_rgba(245,158,11,0.15)]">
        <Award size={22} className="group-hover:scale-110 transition-transform duration-300" />
      </div>

      {/* Content Details */}
      <div className="flex-grow min-w-0">
        <div className="flex items-center gap-1.5 text-zinc-500 mb-1">
          <span className="text-xs font-bold uppercase tracking-wider text-[#F97316]">
            {certification.issuer}
          </span>
        </div>

        <h4 className="font-display font-bold text-base sm:text-lg text-white mb-2 leading-snug group-hover:text-[#F59E0B] transition-colors duration-300">
          {certification.title}
        </h4>

        {/* Date and Credential details */}
        <div className="flex flex-col gap-1.5 text-xs text-zinc-400 font-sans">
          <div className="flex items-center gap-1.5">
            <Calendar size={12} className="text-zinc-500" />
            <span>{certification.date}</span>
          </div>
          {certification.credentialId && (
            <div className="flex items-center gap-1.5">
              <ShieldCheck size={12} className="text-zinc-500" />
              <span className="font-mono text-[10px] text-zinc-500 truncate">
                {certification.credentialId}
              </span>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
