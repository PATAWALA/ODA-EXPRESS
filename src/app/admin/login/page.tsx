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
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-navy-50 via-white to-navy-50/60 px-4 py-12">
      <div className="w-full max-w-md">
        <div className="mb-8 flex justify-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/brand/logo/logo-full-960.png"
            alt="ODA Sources"
            className="h-auto w-[200px]"
          />
        </div>

        <div className="rounded-3xl border border-zinc-100 bg-white p-8 shadow-[0_4px_24px_-12px_rgba(1,18,52,0.12)]">
          <div className="mb-6 text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-navy-700 to-express-600 text-white shadow-md">
              <Lock className="h-5 w-5" strokeWidth={1.75} />
            </div>
            <h1 className="mt-4 text-[20px] font-bold tracking-tight text-navy-700">
              Espace administrateur
            </h1>
            <p className="mt-1 text-[12.5px] text-zinc-500">
              Connectez-vous pour gérer le site.
            </p>
          </div>

          <form action={handleSubmit} className="space-y-4">
            <label className="block">
              <span className="mb-2 block text-[11px] font-bold uppercase tracking-wider text-zinc-500">
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
                  className="w-full rounded-xl border border-zinc-200 bg-white py-3 pl-10 pr-4 text-[13.5px] outline-none transition focus:border-navy-700 focus:ring-4 focus:ring-navy-100"
                />
              </div>
            </label>

            <label className="block">
              <span className="mb-2 block text-[11px] font-bold uppercase tracking-wider text-zinc-500">
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
                  className="w-full rounded-xl border border-zinc-200 bg-white py-3 pl-10 pr-4 text-[13.5px] outline-none transition focus:border-navy-700 focus:ring-4 focus:ring-navy-100"
                />
              </div>
            </label>

            <input type="hidden" name="redirect" value={redirectTo} />

            {error && (
              <p className="rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-[12px] text-red-700">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-br from-navy-700 to-navy-900 px-6 py-3 text-[13px] font-bold text-white shadow-sm transition hover:shadow-md disabled:opacity-60"
            >
              {loading ? "Connexion..." : "Se connecter"}
              <ArrowRight className="h-3.5 w-3.5" strokeWidth={2.5} />
            </button>
          </form>
        </div>

        <p className="mt-6 text-center text-[11px] text-zinc-400">
          Accès réservé à l&apos;équipe ODA Sources.
        </p>
      </div>
    </div>
  );
}