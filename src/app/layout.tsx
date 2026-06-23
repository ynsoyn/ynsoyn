import type { Metadata } from "next";
import Navbar from "@/components/nav/Navbar";
import "./globals.css";

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
    <html lang="ko" className="h-full antialiased">
      <body className="min-h-full" style={{ background: "#f0ebe3" }}>
        <Navbar />
        <main className="pt-[72px]">{children}</main>
      </body>
    </html>
  );
}
