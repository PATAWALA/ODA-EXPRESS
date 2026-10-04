"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { cn } from "@/lib/utils";

interface PasswordInputProps {
  name: string;
  label?: string;
  placeholder?: string;
  required?: boolean;
  minLength?: number;
  defaultValue?: string;
  hint?: string;
  mono?: boolean;
}

export default function PasswordInput({
  name,
  label,
  placeholder = "••••••••",
  required,
  minLength,
  defaultValue,
  hint,
  mono,
}: PasswordInputProps) {
  const [visible, setVisible] = useState(false);

  return (
    <label className="block">
      {label && (
        <span className="mb-2 block text-[11px] font-bold uppercase tracking-[0.15em] text-zinc-500">
          {label}
        </span>
      )}

      <div className="relative">
        <input
          type={visible ? "text" : "password"}
          name={name}
          required={required}
          minLength={minLength}
          defaultValue={defaultValue}
          placeholder={placeholder}
          className={cn(
            "w-full rounded border border-zinc-200 bg-white py-3 pl-4 pr-12 text-[13.5px] text-navy-900 outline-none transition placeholder:text-zinc-400 focus:border-navy-700",
            mono && "font-mono",
          )}
        />

        <button
          type="button"
          onClick={() => setVisible((v) => !v)}
          aria-label={visible ? "Masquer" : "Afficher"}
          title={visible ? "Masquer le mot de passe" : "Afficher le mot de passe"}
          className="absolute right-2 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded text-zinc-400 transition hover:bg-zinc-100 hover:text-navy-900"
        >
          {visible ? (
            <EyeOff className="h-4 w-4" strokeWidth={1.75} />
          ) : (
            <Eye className="h-4 w-4" strokeWidth={1.75} />
          )}
        </button>
      </div>

      {hint && <p className="mt-2 text-[11.5px] text-zinc-500">{hint}</p>}
    </label>
  );
}