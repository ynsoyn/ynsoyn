import type { Metadata } from "next";
import { Geist } from "next/font/google";
import Navbar from "@/components/nav/Navbar";
import "./globals.css";

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ynsoyn",
  description: "Portfolio of ynsoyn",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={`${geist.variable} h-full antialiased`}>
      <body className="min-h-full bg-white text-black">
        <Navbar />
        <main className="pt-16">{children}</main>
      </body>
    </html>
  );
}
