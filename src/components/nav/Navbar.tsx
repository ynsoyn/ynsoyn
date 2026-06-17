"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  { href: "/about", label: "about me" },
  { href: "/works", label: "works" },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-5 bg-white/90 backdrop-blur-sm">
      <Link
        href="/"
        className="text-sm font-medium tracking-tight text-black hover:opacity-60 transition-opacity"
      >
        ynsoyn.com
      </Link>

      <nav className="flex items-center gap-8">
        {navLinks.map(({ href, label }) => (
          <Link
            key={href}
            href={href}
            className={`text-sm transition-opacity hover:opacity-60 ${
              pathname === href ? "font-semibold" : "font-normal text-black"
            }`}
          >
            {label}
          </Link>
        ))}

        <Link
          href="/contact"
          className="text-sm font-medium text-white bg-black rounded-full px-5 py-2 hover:opacity-70 transition-opacity"
        >
          Contact
        </Link>
      </nav>
    </header>
  );
}
