"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  { href: "/",      label: "home"     },
  { href: "/about", label: "about me" },
  { href: "/works", label: "works"    },
];

const NEU_RAISED = "5px 5px 14px rgba(155,135,115,0.26), -4px -4px 10px rgba(255,255,255,0.92)";

export default function Navbar() {
  const pathname = usePathname();

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8"
      style={{
        height: "72px",
        background: "rgba(240,235,227,0.82)",
        backdropFilter: "blur(18px)",
        WebkitBackdropFilter: "blur(18px)",
        boxShadow: "0 2px 20px rgba(155,135,115,0.1), 0 1px 0 rgba(255,255,255,0.6)",
      }}
    >
      <Link
        href="/"
        className="text-sm tracking-tight transition-opacity hover:opacity-50"
        style={{ color: "#3d3530", fontWeight: 500 }}
      >
        ynsoyn.com
      </Link>

      <nav className="flex items-center gap-4">
        {navLinks.map(({ href, label }) => {
          const isActive = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className="rounded-full transition-all"
              style={{
                fontSize: "0.95rem",
                padding: "10px 22px",
                color: "#3d3530",
                fontWeight: isActive ? 600 : 400,
                opacity: isActive ? 1 : 0.55,
                background: isActive ? "#f0ebe3" : "transparent",
                boxShadow: isActive ? NEU_RAISED : "none",
              }}
            >
              {label}
            </Link>
          );
        })}

        <Link
          href="/contact"
          className="rounded-full transition-all"
          style={{
            fontSize: "0.95rem",
            padding: "10px 26px",
            letterSpacing: "0.02em",
            background: "#3d3530",
            color: "#f0ebe3",
            boxShadow: "4px 4px 12px rgba(61,53,48,0.3), -2px -2px 8px rgba(255,255,255,0.6)",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLAnchorElement).style.boxShadow =
              "6px 6px 16px rgba(61,53,48,0.38), -3px -3px 10px rgba(255,255,255,0.7)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLAnchorElement).style.boxShadow =
              "4px 4px 12px rgba(61,53,48,0.3), -2px -2px 8px rgba(255,255,255,0.6)";
          }}
        >
          Contact
        </Link>
      </nav>
    </header>
  );
}
