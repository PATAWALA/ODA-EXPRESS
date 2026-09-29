"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Check, PhoneCall, X } from "lucide-react";
import { PORTS, WHATSAPP, type Product } from "@/data/odaData";

interface Props {
  product: Product;
  onClose: () => void;
}

export default function QualificationModal({ product, onClose }: Props) {
  const [step, setStep] = useState(1);

  const [details, setDetails] = useState("");
  const [quantity, setQuantity] = useState("");
  const [destination, setDestination] = useState("");

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [company, setCompany] = useState("");

  useEffect(() => {
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onEsc = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onEsc);
    return () => {
      document.body.style.overflow = original;
      window.removeEventListener("keydown", onEsc);
    };
  }, [onClose]);

  const canStep1 =
    details.trim() !== "" && quantity.trim() !== "" && destination !== "";
  const canStep2 = name.trim() !== "" && phone.trim() !== "";

  const whatsappHref = useMemo(() => {
    const lines: (string | null)[] = [
      "Bonjour ODA SOURCES,",
      "",
      `Produit / service : ${product.title}`,
      `Détails : ${details}`,
      `Quantité / Volume : ${quantity}`,
      `Destination : ${destination}`,
      "",
      `Nom : ${name}`,
      `Téléphone : ${phone}`,
      company.trim() ? `Entreprise : ${company.trim()}` : null,
      "",
      "Merci de me transmettre votre devis maritime complet.",
    ];
    const message = lines
      .filter((line): line is string => line !== null)
      .join("\n");
    return `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(message)}`;
  }, [product.title, details, quantity, destination, name, phone, company]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-end justify-center bg-navy-900/50 backdrop-blur-sm sm:items-center"
        onClick={onClose}
      >
        <motion.div
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: "100%", opacity: 0 }}
          transition={{ type: "spring", damping: 30, stiffness: 300 }}
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-md overflow-hidden rounded-t-3xl bg-white shadow-2xl sm:rounded-3xl"
        >
          <div className="flex items-start justify-between gap-4 border-b border-zinc-100 px-5 py-4">
            <div className="min-w-0">
              <p className="text-[10.5px] font-bold uppercase tracking-wider text-express-600">
                Demande de devis
              </p>
              <p className="mt-0.5 truncate text-[14px] font-bold tracking-tight text-navy-900">
                {product.title}
              </p>
            </div>
            <button
              type="button"
              onClick={onClose}
              aria-label="Fermer"
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-zinc-400 transition hover:bg-zinc-100 hover:text-navy-900"
            >
              <X className="h-4 w-4" strokeWidth={2} />
            </button>
          </div>

          <div className="flex items-center gap-2 px-5 pt-4">
            {[1, 2, 3].map((n) => (
              <div
                key={n}
                className={
                  "h-1 flex-1 rounded-full transition " +
                  (step >= n
                    ? "bg-gradient-to-r from-navy-900 to-express-600"
                    : "bg-zinc-100")
                }
              />
            ))}
          </div>

          <div className="max-h-[65vh] overflow-y-auto px-5 py-5">
            {step === 1 && (
              <div className="space-y-4">
                <p className="text-[12.5px] font-semibold text-zinc-500">
                  Étape 1 — Détails de votre besoin
                </p>

                <Field
                  label="Produit / machine recherché(e)"
                  value={details}
                  onChange={setDetails}
                  placeholder="Ex. Presse hydraulique 50T"
                />
                <Field
                  label="Quantité ou volume souhaité"
                  value={quantity}
                  onChange={setQuantity}
                  placeholder="Ex. 2 unités / 8 CBM"
                />

                <label className="block">
                  <span className="mb-2 block text-[11px] font-bold uppercase tracking-wider text-zinc-500">
                    Port de destination
                  </span>
                  <select
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    className="w-full rounded-xl border border-zinc-200 bg-white px-3.5 py-3 text-[13.5px] text-navy-900 outline-none transition focus:border-navy-700 focus:ring-4 focus:ring-navy-100"
                  >
                    <option value="">Sélectionner un port</option>
                    {PORTS.map((p) => (
                      <option key={p.port} value={`${p.port} (${p.country})`}>
                        {p.port} — {p.country}
                      </option>
                    ))}
                  </select>
                </label>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-4">
                <p className="text-[12.5px] font-semibold text-zinc-500">
                  Étape 2 — Vos coordonnées
                </p>

                <Field
                  label="Nom & prénom"
                  value={name}
                  onChange={setName}
                  placeholder="Ex. Jean Mbala"
                />
                <Field
                  label="Numéro WhatsApp"
                  value={phone}
                  onChange={setPhone}
                  placeholder="Ex. +243 81 23 45 678"
                  type="tel"
                />
                <Field
                  label="Entreprise (optionnel)"
                  value={company}
                  onChange={setCompany}
                  placeholder="Ex. Ets Mbala Import"
                />
              </div>
            )}

            {step === 3 && (
              <div className="space-y-4">
                <p className="text-[12.5px] font-semibold text-zinc-500">
                  Étape 3 — Vérifiez votre dossier
                </p>

                <div className="overflow-hidden rounded-2xl border border-zinc-100 bg-zinc-50/60">
                  <dl className="divide-y divide-zinc-100">
                    <Row label="Produit" value={product.title} />
                    <Row label="Détails" value={details} />
                    <Row label="Quantité / Volume" value={quantity} />
                    <Row label="Destination" value={destination} />
                    <Row label="Nom" value={name} />
                    <Row label="Téléphone" value={phone} />
                    {company.trim() !== "" && (
                      <Row label="Entreprise" value={company} />
                    )}
                  </dl>
                </div>

                <p className="text-[11.5px] leading-relaxed text-zinc-500">
                  En cliquant ci-dessous, votre dossier sera transmis directement
                  à notre équipe à Guangzhou. Nous revenons vers vous avec un
                  devis maritime sous 24 h.
                </p>
              </div>
            )}
          </div>

          <div className="flex items-center justify-between gap-3 border-t border-zinc-100 bg-white px-5 py-4">
            {step > 1 ? (
              <button
                type="button"
                onClick={() => setStep(step - 1)}
                className="inline-flex items-center gap-1.5 rounded-full border border-zinc-200 px-4 py-2.5 text-[12.5px] font-semibold text-navy-900 transition hover:border-zinc-300"
              >
                <ArrowLeft className="h-3.5 w-3.5" strokeWidth={2} />
                Retour
              </button>
            ) : (
              <span />
            )}

            {step === 1 && (
              <button
                type="button"
                disabled={!canStep1}
                onClick={() => setStep(2)}
                className={
                  "inline-flex items-center gap-1.5 rounded-full px-5 py-2.5 text-[12.5px] font-semibold text-white shadow-sm transition " +
                  (canStep1
                    ? "bg-gradient-to-br from-navy-900 to-navy-700 hover:shadow-md"
                    : "cursor-not-allowed bg-zinc-300 shadow-none")
                }
              >
                Continuer
                <ArrowRight className="h-3.5 w-3.5" strokeWidth={2} />
              </button>
            )}

            {step === 2 && (
              <button
                type="button"
                disabled={!canStep2}
                onClick={() => setStep(3)}
                className={
                  "inline-flex items-center gap-1.5 rounded-full px-5 py-2.5 text-[12.5px] font-semibold text-white shadow-sm transition " +
                  (canStep2
                    ? "bg-gradient-to-br from-navy-900 to-navy-700 hover:shadow-md"
                    : "cursor-not-allowed bg-zinc-300 shadow-none")
                }
              >
                Continuer
                <ArrowRight className="h-3.5 w-3.5" strokeWidth={2} />
              </button>
            )}

            {step === 3 && (
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-gradient-to-br from-express-500 to-express-700 px-5 py-3 text-[12.5px] font-bold text-white shadow-sm transition hover:shadow-md"
              >
                <PhoneCall className="h-3.5 w-3.5" strokeWidth={2} />
                Transmettre sur WhatsApp
              </a>
            )}
          </div>

          {step === 3 && (
            <div className="border-t border-zinc-100 bg-zinc-50/60 px-5 py-3 text-center">
              <p className="inline-flex items-center gap-1.5 text-[10.5px] font-medium text-zinc-500">
                <Check className="h-3 w-3 text-express-600" strokeWidth={2.5} />
                Vos informations sont confidentielles et transmises à Mr ODA uniquement.
              </p>
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-[11px] font-bold uppercase tracking-wider text-zinc-500">
        {label}
      </span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-xl border border-zinc-200 bg-white px-3.5 py-3 text-[13.5px] text-navy-900 outline-none transition placeholder:text-zinc-400 focus:border-navy-700 focus:ring-4 focus:ring-navy-100"
      />
    </label>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start justify-between gap-4 px-4 py-3">
      <dt className="text-[11.5px] font-medium text-zinc-500">{label}</dt>
      <dd className="max-w-[60%] text-right text-[12.5px] font-semibold text-navy-900">
        {value}
      </dd>
    </div>
  );
}