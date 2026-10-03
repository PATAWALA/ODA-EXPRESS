import { createClient } from "@/lib/supabase/server";
import { logoutAction } from "./actions";
import { LogOut } from "lucide-react";

export default async function AdminDashboard() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div className="min-h-screen bg-zinc-50">
      <header className="border-b border-zinc-200 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
          <div className="flex items-center gap-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/brand/mark/logo-mark-256.png"
              alt="ODA"
              className="h-8 w-8 rounded-lg"
            />
            <div>
              <p className="text-[13px] font-bold text-navy-700">Back-office</p>
              <p className="text-[11px] text-zinc-500">ODA Sources</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="hidden text-[12px] text-zinc-500 sm:block">
              {user?.email}
            </span>
            <form action={logoutAction}>
              <button
                type="submit"
                className="inline-flex items-center gap-1.5 rounded-full border border-zinc-200 px-4 py-2 text-[12px] font-semibold text-zinc-700 transition hover:border-red-200 hover:bg-red-50 hover:text-red-700"
              >
                <LogOut className="h-3.5 w-3.5" strokeWidth={1.75} />
                Déconnexion
              </button>
            </form>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <div className="rounded-2xl border border-zinc-100 bg-white p-8 shadow-sm">
          <p className="text-[11px] font-bold uppercase tracking-wider text-express-600">
            Tableau de bord
          </p>
          <h1 className="mt-2 text-[24px] font-bold tracking-tight text-navy-700">
            Bienvenue, {user?.email}
          </h1>
          <p className="mt-2 text-[13px] text-zinc-600">
            Le back-office est en cours de construction. Les modules Actualités,
            Produits, Témoignages et Leads seront ajoutés à l&apos;étape suivante.
          </p>
        </div>
      </main>
    </div>
  );
}