"use client";

import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { Send, Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface ContactFormProps {
  emailjsConfig: {
    publicKey: string;
    serviceId: string;
    templateId: string;
  };
}

export default function ContactForm({ emailjsConfig }: ContactFormProps) {
  const formRef = useRef<HTMLFormElement>(null);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formRef.current) return;

    setLoading(true);
    setStatus("idle");
    setErrorMessage("");

    try {
      const result = await emailjs.sendForm(
        emailjsConfig.serviceId,
        emailjsConfig.templateId,
        formRef.current,
        emailjsConfig.publicKey
      );

      if (result.status === 200) {
        setStatus("success");
        formRef.current.reset();
      } else {
        throw new Error("Could not send mail successfully");
      }
    } catch (err: any) {
      console.error(err);
      setStatus("error");
      setErrorMessage(
        err?.text || "Oops! Something went wrong. Please try again or reach out directly."
      );
    } finally {
      setLoading(false);
      // Fade out banner message after 6 seconds
      setTimeout(() => {
        setStatus("idle");
      }, 6000);
    }
  };

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="space-y-5 relative">
      {/* Dynamic Success/Error Alerts */}
      <AnimatePresence>
        {status === "success" && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-start gap-3 text-sm font-sans"
          >
            <CheckCircle2 size={18} className="flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-bold">Message sent successfully!</p>
              <p className="text-xs text-emerald-500/80">
                Thank you! I will get back to you as soon as possible.
              </p>
            </div>
          </motion.div>
        )}

        {status === "error" && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 flex items-start gap-3 text-sm font-sans"
          >
            <AlertCircle size={18} className="flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-bold">Failed to send message</p>
              <p className="text-xs text-rose-500/80">{errorMessage}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Name input */}
        <div className="space-y-1.5">
          <label htmlFor="from_name" className="text-xs font-bold text-zinc-400 uppercase tracking-wider">
            Your Name
          </label>
          <input
            id="from_name"
            type="text"
            name="from_name"
            required
            placeholder="John Doe"
            className="w-full px-4 py-3 rounded-xl text-sm text-white placeholder-zinc-600 focus:outline-none"
          />
        </div>

        {/* Email input */}
        <div className="space-y-1.5">
          <label htmlFor="from_email" className="text-xs font-bold text-zinc-400 uppercase tracking-wider">
            Your Email
          </label>
          <input
            id="from_email"
            type="email"
            name="from_email"
            required
            placeholder="john@example.com"
            className="w-full px-4 py-3 rounded-xl text-sm text-white placeholder-zinc-600 focus:outline-none"
          />
        </div>
      </div>

      {/* Message Textarea */}
      <div className="space-y-1.5">
        <label htmlFor="message" className="text-xs font-bold text-zinc-400 uppercase tracking-wider">
          Message
          </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          placeholder="Let's build something awesome together..."
          className="w-full px-4 py-3 rounded-xl text-sm text-white placeholder-zinc-600 focus:outline-none resize-none"
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={loading}
        className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold tracking-wider text-sm text-white bg-gradient-to-r from-[#F59E0B] via-[#F97316] to-[#EF4444] hover:shadow-[0_0_20px_rgba(249,115,22,0.5)] hover:scale-[1.02] active:scale-95 focus:outline-none transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
      >
        {loading ? (
          <>
            <Loader2 size={16} className="animate-spin" />
            SENDING...
          </>
        ) : (
          <>
            <Send size={16} />
            SEND MESSAGE
          </>
        )}
      </button>
    </form>
  );
}
