"use client";

import { useEffect, useState } from "react";
import { NAV_ITEMS } from "@/data/odaData";

export default function BottomNav() {
  const [active, setActive] = useState("#top");

  useEffect(() => {
    const sections = NAV_ITEMS.map((item) =>
      document.querySelector(item.href),
    ).filter((el): el is Element => el !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(`#${entry.target.id}`);
          }
        });
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: 0 },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 border-t border-zinc-100 bg-white/95 backdrop-blur-md md:hidden">
      <div className="mx-auto flex max-w-md items-stretch justify-between px-2 py-2">
        {NAV_ITEMS.map((item) => {
          const isActive = active === item.href;
          return (
            <a
              key={item.href}
              href={item.href}
              className={
                "flex flex-1 flex-col items-center justify-center gap-1 rounded-xl px-2 py-2 text-[10.5px] font-semibold transition " +
                (isActive
                  ? "text-navy-900"
                  : "text-zinc-400 hover:text-navy-700")
              }
            >
              <span
                className={
                  "flex h-8 w-8 items-center justify-center rounded-xl transition " +
                  (isActive
                    ? "bg-gradient-to-br from-navy-900 to-express-600 text-white shadow-sm"
                    : "bg-zinc-50 text-zinc-500")
                }
              >
                <item.icon className="h-4 w-4" strokeWidth={1.75} />
              </span>
              <span>{item.label}</span>
            </a>
          );
        })}
      </div>
    </nav>
  );
}