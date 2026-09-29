"use client";

import { useState } from "react";
import { CheckCircle2, Mail } from "lucide-react";

export default function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim() || !email.includes("@")) return;
    setDone(true);
  }

  if (done) {
    return (
      <div className="flex items-center gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 px-5 py-4">
        <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-600" strokeWidth={2} />
        <p className="text-[13px] font-semibold text-emerald-800">
          Merci ! Vous recevrez nos prochaines nouveautés et arrivages.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-3 rounded-2xl border border-zinc-100 bg-white p-5 shadow-[0_4px_24px_-12px_rgba(10,25,49,0.12)] sm:flex-row sm:items-center"
    >
      <div className="relative flex-1">
        <Mail
          className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400"
          strokeWidth={1.75}
        />
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="votre@email.com"
          className="w-full rounded-full border border-zinc-200 bg-white py-3 pl-10 pr-4 text-[13.5px] outline-none transition focus:border-navy-700 focus:ring-4 focus:ring-navy-100"
        />
      </div>
      <button
        type="submit"
        className="rounded-full bg-gradient-to-br from-navy-900 to-navy-700 px-6 py-3 text-[13px] font-bold text-white shadow-sm transition hover:shadow-md"
      >
        M&apos;informer
      </button>
    </form>
  );
}