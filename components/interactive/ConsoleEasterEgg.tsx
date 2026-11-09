"use client";

import { useEffect } from "react";
import { profile } from "@/data/profile";

declare global {
  interface Window {
    antigravity?: () => void;
  }
}

export function ConsoleEasterEgg({ openTerminal }: { openTerminal?: () => void }) {
  useEffect(() => {
    if (typeof window === "undefined") return;

    window.antigravity = () => {
      openTerminal?.();
      console.log("%c[Antigravity CLI Launched]", "color: #ff4d1f; font-weight: bold;");
    };

    const ascii = `
   ___            __  __         
  / _ | ___ ___ __/ /_/ /       
 / __ |/ _ \`/ // / __/ _ \\      
/_/ |_|\\_,_/\\_,_/\\__/_//_/ RAJ 
=========================================
Technical Co-founder @ DOZO
CS Dual Degree @ NIT Hamirpur (CGPA 8.49)
Reliance Foundation Scholar
=========================================
`;

    console.log(
      `%c${ascii}`,
      "color: #ff4d1f; font-family: monospace; font-size: 11px; font-weight: bold;"
    );

    console.log(
      "%cInterested in hiring or collaborating? Run %cantigravity()%c or press %c`%c (backtick) on the page to open the interactive CLI shell.\nDirect Mail: %c" +
        (profile.links.email || "aayush.ardy@gmail.com"),
      "color: #f2f0ea; font-family: sans-serif; font-size: 12px;",
      "color: #ff4d1f; font-family: monospace; font-weight: bold; background: #222; padding: 2px 4px; border-radius: 3px;",
      "color: #f2f0ea; font-family: sans-serif; font-size: 12px;",
      "color: #ff4d1f; font-family: monospace; font-weight: bold;",
      "color: #f2f0ea; font-family: sans-serif; font-size: 12px;",
      "color: #ff4d1f; text-decoration: underline;"
    );
  }, [openTerminal]);

  return null;
}
