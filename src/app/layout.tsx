import type { Metadata } from "next";
import Navbar from "@/components/nav/Navbar";
import PageTransition from "@/components/nav/PageTransition";
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
    <html lang="ko" className="h-full antialiased" style={{ overflow: "hidden" }}>
      <body className="h-full" style={{ background: "#f4f4f2", overflow: "hidden" }}>
        <Navbar />
        <main style={{
          position: "relative",
          overflow: "hidden",
          height: "calc(100vh - 72px)",
          marginTop: "72px",
        }}>
          <PageTransition>{children}</PageTransition>
        </main>
      </body>
    </html>
  );
}
