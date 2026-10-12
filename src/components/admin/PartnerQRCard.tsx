"use client";

import { useState } from "react";
import {
  QrCode,
  Download,
  Copy,
  Check,
  ExternalLink,
  X,
} from "lucide-react";

interface PartnerQRCardProps {
  publicUrl: string;
}

export default function PartnerQRCard({ publicUrl }: PartnerQRCardProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=800x800&margin=20&data=${encodeURIComponent(publicUrl)}`;

  function copyLink() {
    navigator.clipboard.writeText(publicUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <>
      {/* Carte compacte dans le dashboard */}
      <div className="rounded-2xl border border-zinc-200 bg-white p-5 transition hover:border-navy-200">
        <div className="flex items-center justify-between gap-3">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-express-600 to-express-700 text-white">
            <QrCode className="h-5 w-5" strokeWidth={1.75} />
          </span>
          <p className="text-[11.5px] font-bold uppercase tracking-[0.15em] text-zinc-500">
            Partager
          </p>
        </div>

        <p className="mt-4 text-[13.5px] font-bold tracking-tight text-navy-900">
          QR d&apos;inscription
        </p>
        <p className="mt-1.5 text-[11.5px] leading-relaxed text-zinc-500">
          Invitez un partenaire à s&apos;enregistrer en scannant le QR
        </p>

        <button
          type="button"
          onClick={() => setModalOpen(true)}
          className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-express-600 px-4 py-2.5 text-[11.5px] font-bold uppercase tracking-[0.1em] text-white transition hover:bg-express-700"
        >
          <QrCode className="h-3.5 w-3.5" strokeWidth={2} />
          Afficher le QR
        </button>
      </div>

      {/* Modale plein écran */}
      {modalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-navy-950/80 px-4 py-8 backdrop-blur-sm"
          onClick={() => setModalOpen(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-md overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-2xl"
          >
            {/* En-tête */}
            <div className="flex items-center justify-between border-b border-zinc-200 px-6 py-4">
              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-2xl bg-gradient-to-br from-express-600 to-express-700 text-white">
                  <QrCode className="h-4 w-4" strokeWidth={1.75} />
                </span>
                <div>
                  <p className="text-[15px] font-bold tracking-tight text-navy-900">
                    QR d&apos;inscription
                  </p>
                  <p className="mt-0.5 text-[11.5px] text-zinc-500">
                    À partager avec vos partenaires
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="flex h-8 w-8 items-center justify-center rounded-2xl text-zinc-400 transition hover:bg-zinc-100 hover:text-navy-900"
                aria-label="Fermer"
              >
                <X className="h-4 w-4" strokeWidth={1.75} />
              </button>
            </div>

            {/* Contenu */}
            <div className="p-6">
              {/* QR */}
              <div className="mx-auto inline-block w-full rounded-2xl border-2 border-navy-900 bg-white p-4">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={qrUrl}
                  alt="QR code d'inscription partenaire"
                  className="mx-auto block h-auto w-full max-w-[280px]"
                />
              </div>

              <p className="mt-4 text-center text-[12.5px] font-semibold text-navy-900">
                Scanner pour s&apos;inscrire
              </p>
              <p className="mt-1 text-center text-[11px] text-zinc-500">
                Fonctionne avec tous les smartphones · Aucun login requis
              </p>

              {/* Lien direct */}
              <div className="mt-5">
                <p className="mb-2 text-[10.5px] font-bold uppercase tracking-[0.15em] text-zinc-500">
                  Ou partager le lien direct
                </p>
                <div className="flex items-center gap-2 rounded-2xl border border-zinc-200 bg-zinc-50 px-3 py-2">
                  <code className="min-w-0 flex-1 truncate text-[11px] font-mono text-navy-900">
                    {publicUrl}
                  </code>
                  <button
                    type="button"
                    onClick={copyLink}
                    className="flex h-7 w-7 shrink-0 items-center justify-center rounded-2xl border border-zinc-200 bg-white text-zinc-500 transition hover:border-navy-300 hover:text-navy-900"
                    title="Copier le lien"
                  >
                    {copied ? (
                      <Check
                        className="h-3.5 w-3.5 text-emerald-600"
                        strokeWidth={2.5}
                      />
                    ) : (
                      <Copy className="h-3.5 w-3.5" strokeWidth={1.75} />
                    )}
                  </button>
                </div>
              </div>

              {/* Actions */}
              <div className="mt-5 flex gap-2">
                <a
                  href={qrUrl}
                  download="qr-partenaires-oda-sources.png"
                  className="inline-flex flex-1 items-center justify-center gap-2 rounded-2xl bg-navy-900 px-4 py-3 text-[11.5px] font-bold uppercase tracking-[0.1em] text-white transition hover:bg-navy-800"
                >
                  <Download className="h-3.5 w-3.5" strokeWidth={2} />
                  Télécharger
                </a>
                <button
                  type="button"
                  onClick={copyLink}
                  className="inline-flex flex-1 items-center justify-center gap-2 rounded-2xl border border-zinc-200 bg-white px-4 py-3 text-[11.5px] font-bold uppercase tracking-[0.1em] text-navy-900 transition hover:bg-zinc-50"
                >
                  {copied ? (
                    <>
                      <Check
                        className="h-3.5 w-3.5 text-emerald-600"
                        strokeWidth={2.5}
                      />
                      Copié
                    </>
                  ) : (
                    <>
                      <Copy className="h-3.5 w-3.5" strokeWidth={1.75} />
                      Copier le lien
                    </>
                  )}
                </button>
              </div>

              <a
                href={publicUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-flex w-full items-center justify-center gap-2 text-[11.5px] font-semibold text-navy-700 transition hover:text-express-600"
              >
                <ExternalLink className="h-3 w-3" strokeWidth={2} />
                Tester le formulaire public
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}