import "./globals.css";

import type { Metadata } from "next";
import { Geist_Mono } from "next/font/google";
import Link from "next/link";

const geistMono = Geist_Mono({
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
      <body className={`${geistMono.className} antialiased`}>
        <div className="min-h-[100dvh] bg-black flex flex-col">
          <div className="container mx-auto px-4 py-8">
            <header className="flex justify-between items-start py-2">
              <Link
                href="/"
                className="text-2xl md:text-4xl mb-2 font-bold hover:text-amber-300 transition-colors duration-300"
              >
                home
              </Link>
            </header>

            <main>{children}</main>
          </div>

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
        </div>
      </body>
    </html>
  );
}
