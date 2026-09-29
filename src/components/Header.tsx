"use client";

import { Container, Menu, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const NAV = [
  { label: "Accueil", href: "/" },
  { label: "Catalogue", href: "/#catalogue" },
  { label: "Maritime", href: "/maritime" },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-zinc-100 bg-white/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3.5 sm:px-6">
        <Link href="/" className="flex items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-navy-900 via-navy-700 to-express-600 text-white shadow-sm">
            <Container className="h-4 w-4" strokeWidth={1.75} />
          </span>
          <span className="leading-tight">
            <span className="block text-[14.5px] font-bold tracking-tight text-navy-900">
              ODA SOURCES
            </span>
            <span className="block text-[10.5px] font-medium uppercase tracking-wider text-zinc-500">
              Import & Export
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-7 md:flex">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-[12.5px] font-semibold text-zinc-600 transition hover:text-navy-900"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label="Menu"
          className="flex h-9 w-9 items-center justify-center rounded-full border border-zinc-200 text-navy-900 md:hidden"
        >
          {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-zinc-100 bg-white md:hidden">
          <div className="mx-auto flex max-w-6xl flex-col gap-1 px-4 py-3">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-xl px-3 py-2.5 text-[13px] font-semibold text-navy-900 transition hover:bg-zinc-50"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}