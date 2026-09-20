"use client";

import { ArrowRight } from "lucide-react";
import { OPTIONS, type Need } from "@/data/options";

export default function NeedSelector({
  onSelect,
}: {
  onSelect: (need: Need) => void;
}) {
  return (
    <>
      <p className="mt-10 text-center text-[13px] leading-relaxed text-zinc-500">
        Sélectionnez votre besoin pour être pris en charge sur WhatsApp.
      </p>

      <div className="mt-6 space-y-2.5">
        {OPTIONS.map((option) => (
          <button
            key={option.id}
            type="button"
            onClick={() => onSelect(option.id)}
            className="group flex w-full items-center gap-4 rounded-2xl border border-zinc-200 bg-white p-4 text-left transition hover:border-zinc-300 hover:bg-zinc-50"
          >
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-zinc-100 text-zinc-700">
              <option.icon className="h-[18px] w-[18px]" strokeWidth={1.75} />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block text-[13.5px] font-semibold tracking-tight text-zinc-900">
                {option.title}
              </span>
              <span className="mt-0.5 block text-[12px] text-zinc-500">
                {option.sub}
              </span>
            </span>
            <ArrowRight
              className="h-4 w-4 shrink-0 text-zinc-300 transition group-hover:translate-x-0.5 group-hover:text-zinc-500"
              strokeWidth={1.75}
            />
          </button>
        ))}
      </div>
    </>
  );
}