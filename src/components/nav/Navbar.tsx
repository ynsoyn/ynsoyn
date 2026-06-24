"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  { href: "/",        label: "home"     },
  { href: "/about",   label: "about me" },
  { href: "/works",   label: "works"    },
  { href: "/contact", label: "contact"  },
];

const NEU_RAISED = "5px 5px 14px rgba(155,135,115,0.26), -4px -4px 10px rgba(255,255,255,0.92)";

export default function Navbar() {
  const pathname = usePathname();

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between"
      style={{
        height: "72px",
        paddingLeft: "40px",
        paddingRight: "40px",
        background: "rgba(244,244,242,0.88)",
        backdropFilter: "blur(18px)",
        WebkitBackdropFilter: "blur(18px)",
        boxShadow: "0 2px 20px rgba(155,135,115,0.1), 0 1px 0 rgba(255,255,255,0.6)",
      }}
    >
      <Link
        href="/"
        className="flex items-center gap-2 transition-opacity hover:opacity-60"
        style={{ color: "#3d3530", fontWeight: 400, fontSize: "1.4rem", letterSpacing: "0.01em", textDecoration: "none", fontFamily: "'Galmat', cursive" }}
      >
        YunSoyeon's Portfolio
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
                fontSize: "0.88rem",
                padding: "10px 22px",
                color: "#3d3530",
                fontWeight: 700,
                fontFamily: "'SchoolSafetyNotification', sans-serif",
                opacity: isActive ? 1 : 0.55,
                background: isActive ? "#f4f4f2" : "transparent",
                boxShadow: isActive ? NEU_RAISED : "none",
              }}
            >
              {label}
            </Link>
          );
        })}
      </nav>
    </header>
  );
}
