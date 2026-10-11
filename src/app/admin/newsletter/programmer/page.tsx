import { createClient } from "@/lib/supabase/server";
import VeilleProgrammer from "@/components/admin/VeilleProgrammer";

export default async function ProgrammerVeillePage() {
  const supabase = await createClient();
  const { data: veilles } = await supabase
    .from("newsletter_veilles")
    .select("*")
    .order("scheduled_for", { ascending: false });

  return (
    <div>
      <div className="mb-8">
        <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-express-600">
          Newsletter
        </p>
        <h1 className="mt-2 text-[24px] font-bold tracking-tight text-navy-900">
          Programmer une veille import
        </h1>
        <p className="mt-2 max-w-2xl text-[13px] text-zinc-600">
          Composez la veille et choisissez la date à laquelle elle sera
          envoyée automatiquement à tous vos contacts. Une fois programmée,
          vous n&apos;avez plus rien à faire.
        </p>
      </div>

      <VeilleProgrammer veilles={veilles ?? []} />
    </div>
  );
}