import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getPartnerWithRelations } from "@/lib/data/partners";
import { getPartnerSectorsWithCount } from "@/lib/data/partner-sectors";
import PartnerDetail from "@/components/admin/PartnerDetail";

export default async function PartnerDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const [partner, sectors] = await Promise.all([
    getPartnerWithRelations(id),
    getPartnerSectorsWithCount(),
  ]);

  if (!partner) notFound();

  return (
    <div>
      <Link
        href="/admin/partners"
        className="mb-6 inline-flex items-center gap-2 text-[11.5px] font-bold uppercase tracking-[0.15em] text-zinc-500 transition hover:text-navy-900"
      >
        <ArrowLeft className="h-3.5 w-3.5" strokeWidth={2} />
        Retour aux partenaires
      </Link>

      <PartnerDetail partner={partner} sectors={sectors} />
    </div>
  );
}