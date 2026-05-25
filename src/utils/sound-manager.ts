"use client";

/**
 * World-class Web Audio API Sound Synthesizer
 * Generates dynamic, high-fidelity mechanical click ticks and cyber-space hum sweeps
 * programmatically with zero bandwidth download size and absolute zero latency.
 */
export function playUISound(type: "click" | "hover") {
  if (typeof window === "undefined") return;

  // Read sound configuration status persistently
  const soundEnabled = localStorage.getItem("sound-enabled") !== "false";
  if (!soundEnabled) return;

  try {
    // Create AudioContext lazily on user interaction to comply with browser safety policies
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContextClass) return;

    const ctx = new AudioContextClass();
    
    if (type === "click") {
      // Synthesize a high-end ultra-short mechanical feedback tick click
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "sine";
      // Snap pitch down from high 1200Hz to low 300Hz instantly
      osc.frequency.setValueAtTime(1200, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(300, ctx.currentTime + 0.04);

      // Micro volume envelope starting low (2%) and fading to 0 in 40ms
      gain.gain.setValueAtTime(0.015, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.04);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.04);
    } else if (type === "hover") {
      // Synthesize a soft, organic cyber-space background frequency sweep hum
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "triangle";
      // Sweep pitch up slightly from 180Hz to 240Hz for a satisfying hover transition
      osc.frequency.setValueAtTime(180, ctx.currentTime);
      osc.frequency.linearRampToValueAtTime(240, ctx.currentTime + 0.12);

      // Extremely faint volume envelope (0.3% max) to ensure a high-end mechanical feel
      gain.gain.setValueAtTime(0.002, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.12);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.12);
    }
  } catch (err) {
    // Fail silently to avoid interrupting interface layout
    console.debug("Web Audio synthesis is blocked or unsupported", err);
  }
}
