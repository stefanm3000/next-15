"use client";

import { Home } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function HomeLink() {
  const pathname = usePathname();

  if (pathname === "/") return null;

  return (
    <nav className={"fixed top-4 left-4 z-50"}>
      <Link
        href="/"
        className="inline-flex items-center justify-center p-3 bg-white/10 backdrop-blur-md rounded-lg border border-white/20 hover:bg-white/20 transition-all duration-300 group"
      >
        <Home className="w-5 h-5 text-white group-hover:text-gray-300 transition-colors" />
      </Link>
    </nav>
  );
}
