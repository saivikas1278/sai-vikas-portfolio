import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Outfit } from "next/font/google";
import "./globals.css";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Sai Vikas - Full Stack Developer",
  description: "A premium software engineering and web development showcase, crafting responsive, high-performance digital experiences.",
  icons: {
    icon: "/assets/images/placeholder-avatar.png"
  }
};

import CustomCursor from "@/components/custom-cursor";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${plusJakarta.variable} ${outfit.variable} dark scroll-smooth`}
    >
      <body className="font-sans antialiased bg-[#030303] text-zinc-100 min-h-screen">
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}
