"use client";

import { useEffect, useRef, useState } from "react";

export default function CustomCursor() {
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const cursorRingRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Custom cursors are distracting and laggy on touch-only mobile devices,
    // so we only activate if the device explicitly supports hover pointer cursors.
    const mediaQuery = window.matchMedia("(hover: hover)");
    if (!mediaQuery.matches) return;

    setIsVisible(true);

    const mouse = { x: 0, y: 0 };
    const dot = { x: 0, y: 0 };
    const ring = { x: 0, y: 0 };

    const handleMouseMove = (event: MouseEvent) => {
      mouse.x = event.clientX;
      mouse.y = event.clientY;
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Global listener to detect hover overlaps on standard interactive blocks
    const handleMouseOver = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target) return;

      const hoverable =
        target.closest("a") ||
        target.closest("button") ||
        target.closest('[role="button"]') ||
        target.closest(".glass-panel") ||
        target.closest("input") ||
        target.closest("textarea");

      if (hoverable) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    window.addEventListener("mouseover", handleMouseOver);

    // Dynamic RAF tick loop to animate the ring with smooth springy lag LERP logic
    let animFrameId: number;

    const tick = () => {
      // Direct high-speed follow on the center point
      dot.x += (mouse.x - dot.x) * 0.35;
      dot.y += (mouse.y - dot.y) * 0.35;

      // Slow lagging follow on the outer orbit ring
      ring.x += (mouse.x - ring.x) * 0.15;
      ring.y += (mouse.y - ring.y) * 0.15;

      if (cursorDotRef.current) {
        cursorDotRef.current.style.transform = `translate3d(${dot.x}px, ${dot.y}px, 0) translate3d(-50%, -50%, 0)`;
      }
      if (cursorRingRef.current) {
        cursorRingRef.current.style.transform = `translate3d(${ring.x}px, ${ring.y}px, 0) translate3d(-50%, -50%, 0)`;
      }

      animFrameId = requestAnimationFrame(tick);
    };

    tick();

    // Inject global cursor disabling style on desktop layout
    document.documentElement.classList.add("lg:cursor-none");

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
      cancelAnimationFrame(animFrameId);
      document.documentElement.classList.remove("lg:cursor-none");
    };
  }, []);

  if (!isVisible) return null;

  return (
    <>
      {/* Dynamic 60fps+ Center Blending Dot */}
      <div
        ref={cursorDotRef}
        className="fixed top-0 left-0 w-2.5 h-2.5 bg-white rounded-full pointer-events-none z-999"
        style={{
          mixBlendMode: "difference",
          willChange: "transform",
          transform: "translate3d(-50%, -50%, 0)",
        }}
      />
      {/* Dynamic Trailing Spring Orbital Ring */}
      <div
        ref={cursorRingRef}
        className={`fixed top-0 left-0 rounded-full pointer-events-none z-998 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isHovered
            ? "w-14 h-14 border-2 border-violet-400/80 bg-violet-500/10 scale-100"
            : "w-8 h-8 border border-white/20 bg-transparent scale-100"
        }`}
        style={{
          willChange: "transform, width, height, border-color, background-color",
          transform: "translate3d(-50%, -50%, 0)",
        }}
      />
    </>
  );
}
