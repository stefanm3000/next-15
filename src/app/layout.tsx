import "./globals.css";

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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
        <div className="min-h-screen bg-black">
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
        </div>
      </body>
    </html>
  );
}
