import { getPartners } from "@/lib/data/partners";
import { getPartnerSectorsWithCount } from "@/lib/data/partner-sectors";
import PartnersManager from "@/components/admin/PartnersManager";

export default async function AdminPartnersPage() {
  const [partners, sectors] = await Promise.all([
    getPartners(),
    getPartnerSectorsWithCount(),
  ]);

  return (
    <div>
      <div className="mb-8">
        <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-express-600">
          Réseau
        </p>
        <h1 className="mt-2 text-[24px] font-bold tracking-tight text-navy-900">
          Partenaires & Secteurs
        </h1>
        <p className="mt-2 max-w-2xl text-[13px] text-zinc-600">
          Votre annuaire interne — transitaires, fournisseurs, cabinets,
          universités... Tout retrouver en un clic.
        </p>
      </div>

      <PartnersManager partners={partners} sectors={sectors} />
    </div>
  );
}