"use client";

import { useEffect, useState } from "react";
import {
  QrCode,
  Download,
  Copy,
  Check,
  ExternalLink,
  X,
  Loader2,
} from "lucide-react";

interface PartnerQRModalProps {
  open: boolean;
  onClose: () => void;
}

export default function PartnerQRModal({
  open,
  onClose,
}: PartnerQRModalProps) {
  const [copied, setCopied] = useState(false);
  const [downloading, setDownloading] = useState(false);

  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.odasources.com";
  const publicUrl = `${siteUrl}/partenaire/nouveau`;
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=800x800&margin=20&data=${encodeURIComponent(publicUrl)}`;

  useEffect(() => {
    if (!open) return;
    function onEsc(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onEsc);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onEsc);
    };
  }, [open, onClose]);

  function copyLink() {
    navigator.clipboard.writeText(publicUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  /**
   * Télécharge l'image du QR en la récupérant via fetch,
   * puis en la transformant en blob pour forcer le download.
   */
  async function downloadQR() {
    try {
      setDownloading(true);
      const response = await fetch(qrUrl);
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "qr-partenaires-oda-sources.png";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Erreur téléchargement QR :", err);
      // Fallback : ouvrir dans un nouvel onglet
      window.open(qrUrl, "_blank");
    } finally {
      setDownloading(false);
    }
  }

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-navy-950/80 px-4 py-8 backdrop-blur-sm"
      onClick={onClose}
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
            onClick={onClose}
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
            <button
              type="button"
              onClick={downloadQR}
              disabled={downloading}
              className="inline-flex flex-1 items-center justify-center gap-2 rounded-2xl bg-navy-900 px-4 py-3 text-[11.5px] font-bold uppercase tracking-[0.1em] text-white transition hover:bg-navy-800 disabled:opacity-60"
            >
              {downloading ? (
                <>
                  <Loader2 className="h-3.5 w-3.5 animate-spin" strokeWidth={2} />
                  Téléchargement...
                </>
              ) : (
                <>
                  <Download className="h-3.5 w-3.5" strokeWidth={2} />
                  Télécharger
                </>
              )}
            </button>
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
                  Copier
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
  );
}