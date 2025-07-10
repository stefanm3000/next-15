"use client";

import { Routes } from "@/src/utils/routes";
import { usePathname } from "next/navigation";

export default function Footer() {
  const pathname = usePathname();
  const isChat = pathname === Routes.CHAT;

  if (isChat) return null;

  return (
    <footer className="px-4 text-center text-gray-400  py-4 mt-auto flex justify-center items-center gap-2">
      <a
        className="border border-white/20 rounded-lg p-2 hover:bg-white/10 transition-colors duration-300"
        href="mailto:stefanmilenkovic3000@gmail.com"
      >
        email
      </a>
      <a
        className="border border-white/20 rounded-lg p-2 hover:bg-white/10 transition-colors duration-300"
        href="https://github.com/stefanm3000"
      >
        code
      </a>
    </footer>
  );
}
