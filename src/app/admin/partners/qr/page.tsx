import { ArrowLeft, Download, Printer } from "lucide-react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";

export default function AdminPartnersQRPage() {
  const publicUrl =
    (process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.odasources.com") +
    "/partenaire/nouveau";

  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=800x800&margin=20&data=${encodeURIComponent(publicUrl)}`;

  return (
    <div>
      <div className="mb-8">
        <Link
          href="/admin/partners"
          className="inline-flex items-center gap-2 text-[11.5px] font-bold uppercase tracking-[0.15em] text-zinc-500 transition hover:text-navy-900"
        >
          <ArrowLeft className="h-3.5 w-3.5" strokeWidth={2} />
          Retour aux partenaires
        </Link>
        <p className="mt-4 text-[11px] font-bold uppercase tracking-[0.22em] text-express-600">
          Réseau
        </p>
        <h1 className="mt-2 text-[24px] font-bold tracking-tight text-navy-900">
          QR Code d&apos;inscription
        </h1>
        <p className="mt-2 max-w-2xl text-[13px] text-zinc-600">
          Partagez ce QR code avec vos partenaires. En le scannant, ils
          accèdent directement au formulaire d&apos;inscription.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_1.2fr]">
        {/* QR Code */}
        <div className="rounded-2xl border border-zinc-200 bg-white p-8 text-center">
          <div className="mx-auto inline-block rounded-2xl border-2 border-navy-900 bg-white p-4">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={qrUrl}
              alt="QR code d'inscription"
              width={320}
              height={320}
              className="block h-auto w-full max-w-[320px]"
            />
          </div>
          <p className="mt-6 text-[12.5px] font-semibold text-navy-900">
            Scanner pour s&apos;inscrire
          </p>
          <p className="mt-1.5 text-[11.5px] text-zinc-500">
            Fonctionne avec tous les smartphones
          </p>

          <div className="mt-6 flex flex-col gap-2">
            <a
              href={qrUrl}
              download="qr-partenaires-oda-sources.png"
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-navy-900 px-5 py-3 text-[12px] font-bold uppercase tracking-[0.1em] text-white transition hover:bg-navy-800"
            >
              <Download className="h-3.5 w-3.5" strokeWidth={2} />
              Télécharger le QR
            </a>
            <a
              href={qrUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-2xl border border-zinc-200 bg-white px-5 py-3 text-[12px] font-bold uppercase tracking-[0.1em] text-navy-900 transition hover:bg-zinc-50"
            >
              <Printer className="h-3.5 w-3.5" strokeWidth={2} />
              Ouvrir en grand (impression)
            </a>
          </div>
        </div>

        {/* Infos + lien direct */}
        <div className="space-y-4">
          <div className="rounded-2xl border border-zinc-200 bg-white p-6">
            <p className="text-[14px] font-bold text-navy-900">
              Lien direct à partager
            </p>
            <p className="mt-1.5 text-[12.5px] text-zinc-600">
              Vous pouvez aussi envoyer ce lien par WhatsApp ou email.
            </p>
            <div className="mt-4 rounded-2xl border border-zinc-200 bg-zinc-50 px-4 py-3">
              <code className="break-all text-[11.5px] font-mono text-navy-900">
                {publicUrl}
              </code>
            </div>
          </div>

          <div className="rounded-2xl border border-navy-100 bg-gradient-to-br from-white via-white to-navy-50/50 p-6">
            <p className="text-[14px] font-bold text-navy-900">
              💡 Comment l&apos;utiliser ?
            </p>
            <ul className="mt-4 space-y-3 text-[12.5px] leading-relaxed text-zinc-600">
              <li className="flex gap-2.5">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-express-600" />
                <span>
                  <strong className="text-navy-900">Carte de visite</strong> —
                  imprimez le QR au dos de votre carte.
                </span>
              </li>
              <li className="flex gap-2.5">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-express-600" />
                <span>
                  <strong className="text-navy-900">WhatsApp</strong> — envoyez
                  le lien directement aux partenaires.
                </span>
              </li>
              <li className="flex gap-2.5">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-express-600" />
                <span>
                  <strong className="text-navy-900">Salon / événement</strong>{" "}
                  — affichez le QR sur un support imprimé.
                </span>
              </li>
              <li className="flex gap-2.5">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-express-600" />
                <span>
                  <strong className="text-navy-900">Signature email</strong> —
                  ajoutez le lien à votre signature.
                </span>
              </li>
            </ul>
          </div>

          <div className="rounded-2xl border border-emerald-100 bg-emerald-50/50 p-6">
            <p className="text-[13.5px] font-bold text-emerald-900">
              ✅ Aucune connexion requise
            </p>
            <p className="mt-1.5 text-[12.5px] leading-relaxed text-emerald-800">
              Vos partenaires remplissent le formulaire librement. Vous recevez
              leur fiche directement dans cet espace admin.
            </p>
          </div>
        </div>
      </div>

      <p className="mt-6 text-center text-[11px] text-zinc-400">
        Le QR code est généré automatiquement via l&apos;API qrserver.com.
      </p>
    </div>
  );
}