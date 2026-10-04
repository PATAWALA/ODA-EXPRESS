"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { Lock, Mail, ArrowRight } from "lucide-react";
import { loginAction } from "../actions";

export default function AdminLoginPage() {
  const params = useSearchParams();
  const redirectTo = params.get("redirect") ?? "/admin";
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(formData: FormData) {
    setLoading(true);
    setError(null);
    const result = await loginAction(formData);
    if (result?.error) {
      setError(result.error);
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 px-4 py-12">
      <div className="w-full max-w-md border border-zinc-200 bg-white p-8 shadow-sm">
        <div className="text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center border border-express-600 bg-express-600 text-white">
            <Lock className="h-6 w-6" strokeWidth={1.75} />
          </div>
          <h1 className="mt-6 text-[22px] font-bold tracking-tight text-navy-900">
            Espace administrateur
          </h1>
          <p className="mt-2 text-[13px] text-zinc-500">
            Connectez-vous pour gérer le site.
          </p>
        </div>

        <form action={handleSubmit} className="mt-8 space-y-5">
          <label className="block">
            <span className="mb-2 block text-[11px] font-bold uppercase tracking-[0.15em] text-zinc-500">
              Email
            </span>
            <div className="relative">
              <Mail
                className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400"
                strokeWidth={1.75}
              />
              <input
                type="email"
                name="email"
                required
                placeholder="votre@email.com"
                className="w-full border border-zinc-200 bg-white py-3 pl-10 pr-4 text-[13.5px] text-navy-900 outline-none transition focus:border-navy-700"
              />
            </div>
          </label>

          <label className="block">
            <span className="mb-2 block text-[11px] font-bold uppercase tracking-[0.15em] text-zinc-500">
              Mot de passe
            </span>
            <div className="relative">
              <Lock
                className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400"
                strokeWidth={1.75}
              />
              <input
                type="password"
                name="password"
                required
                placeholder="••••••••"
                className="w-full border border-zinc-200 bg-white py-3 pl-10 pr-4 text-[13.5px] text-navy-900 outline-none transition focus:border-navy-700"
              />
            </div>
          </label>

          <input type="hidden" name="redirect" value={redirectTo} />

          {error && (
            <p className="border border-red-200 bg-red-50 px-3 py-2 text-[12px] text-red-700">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="inline-flex w-full items-center justify-center gap-2 bg-navy-900 px-6 py-3.5 text-[12px] font-bold uppercase tracking-[0.1em] text-white transition hover:bg-navy-800 disabled:opacity-60"
          >
            {loading ? "Connexion..." : "Se connecter"}
            <ArrowRight className="h-3.5 w-3.5" strokeWidth={2.5} />
          </button>
        </form>
      </div>
    </div>
  );
}

