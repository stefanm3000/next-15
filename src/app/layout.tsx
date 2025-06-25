import "./globals.css";

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { CodeIcon, MailIcon } from "lucide-react";
import Link from "next/link";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "next 15 playground",
  description: "playing with next 15 apis",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="min-h-[100dvh] bg-black flex flex-col">
          <div className="container mx-auto px-4 py-8">
            <header className="flex justify-between items-start py-2">
              <Link
                href="/"
                className="text-2xl md:text-4xl mb-2 font-mono font-bold hover:text-amber-300 transition-colors duration-300"
              >
                home
              </Link>
            </header>

            <main>{children}</main>
          </div>

          <footer className="px-4 text-center text-gray-400 font-mono py-4 mt-auto gap-4 flex justify-center items-center ">
            <div className="flex gap-4 border border-white/20 rounded-lg p-2 ml-auto">
              <a href="mailto:stefanmilenkovic3000@gmail.com">
                <MailIcon className="hover:text-amber-300 transition-colors duration-300 size-6" />
              </a>
              <a href="https://github.com/stefanm3000">
                <CodeIcon className="hover:text-amber-300 transition-colors duration-300 size-6" />
              </a>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
