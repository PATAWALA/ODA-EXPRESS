"use client";

import { useState } from "react";

interface SlugFieldProps {
  name: string;
  label?: string;
  prefix: string;
  defaultValue?: string;
  required?: boolean;
  titleValue?: string;
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export default function SlugField({
  name,
  label = "Lien de la page",
  prefix,
  defaultValue = "",
  required = false,
}: SlugFieldProps) {
  const [value, setValue] = useState(defaultValue);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const raw = e.target.value
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, "");
    setValue(raw);
  }

  function autoGenerate() {
    const titleInput = document.querySelector<HTMLInputElement>(
      'input[name="title"]',
    );
    if (titleInput && titleInput.value) {
      setValue(slugify(titleInput.value));
    }
  }

  const preview = `${prefix}${value || "mon-article"}`;

  return (
    <div>
      <div className="mb-2 flex items-center justify-between gap-3">
        <label
          htmlFor={name}
          className="text-[11px] font-bold uppercase tracking-[0.15em] text-zinc-500"
        >
          {label}
        </label>
        <button
          type="button"
          onClick={autoGenerate}
          className="text-[10.5px] font-bold uppercase tracking-[0.1em] text-express-600 transition hover:text-express-700"
        >
          Générer depuis le titre
        </button>
      </div>

      <div className="flex overflow-hidden rounded border border-zinc-200 bg-white focus-within:border-navy-700">
        <span className="flex items-center border-r border-zinc-200 bg-zinc-50 px-3 font-mono text-[13px] text-zinc-500">
          {prefix}
        </span>

        <input
          id={name}
          name={name}
          type="text"
          required={required}
          value={value}
          onChange={handleChange}
          placeholder="mon-article"
          className="flex-1 px-3 py-3 font-mono text-[13.5px] text-navy-900 outline-none placeholder:text-zinc-300"
        />
      </div>

      <div className="mt-2 flex items-start gap-2 text-[11.5px] text-zinc-500">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="mt-0.5 h-3.5 w-3.5 shrink-0 text-zinc-400"
        >
          <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
          <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
        </svg>
        <span className="min-w-0">
          Lien final :{" "}
          <code className="break-all font-mono text-navy-900">
            odasources.com{preview}
          </code>
        </span>
      </div>
    </div>
  );
}