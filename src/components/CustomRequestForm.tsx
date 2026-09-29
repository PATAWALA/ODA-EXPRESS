"use client";

import { useMemo, useState } from "react";
import { ImagePlus, Link2, PhoneCall, Send } from "lucide-react";
import { PORTS, WHATSAPP } from "@/data/odaData";

export default function CustomRequestForm() {
  const [productName, setProductName] = useState("");
  const [productLink, setProductLink] = useState("");
  const [quantity, setQuantity] = useState("");
  const [destination, setDestination] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [notes, setNotes] = useState("");

  const valid =
    productName.trim() !== "" &&
    destination !== "" &&
    name.trim() !== "" &&
    phone.trim() !== "";

  const whatsappHref = useMemo(() => {
    const lines: (string | null)[] = [
      "Bonjour ODA SOURCES,",
      "",
      "Je recherche un produit spécifique.",
      "",
      `Produit : ${productName}`,
      productLink.trim() ? `Lien fourni : ${productLink.trim()}` : null,
      quantity.trim() ? `Quantité souhaitée : ${quantity}` : null,
      `Ville de livraison : ${destination}`,
      notes.trim() ? `Remarques : ${notes.trim()}` : null,
      "",
      `Nom : ${name}`,
      `Téléphone : ${phone}`,
      "",
      "Merci de me faire un devis complet (produit + transport maritime).",
    ];
    const msg = lines.filter((l): l is string => l !== null).join("\n");
    return `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(msg)}`;
  }, [productName, productLink, quantity, destination, name, phone, notes]);

  return (
    <section
      id="sur-mesure"
      className="relative overflow-hidden border-t border-zinc-100 bg-gradient-to-b from-navy-50/50 to-white px-4 py-16 sm:px-6 sm:py-24"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute right-[-120px] top-[-120px] h-[400px] w-[400px] rounded-full bg-express-100/50 blur-3xl"
      />

      <div className="relative mx-auto max-w-4xl">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-[11.5px] font-bold uppercase tracking-[0.18em] text-express-600">
            Produit introuvable ?
          </p>
          <h2 className="mt-3 text-[24px] font-bold tracking-tight text-navy-900 sm:text-[32px]">
            Envoyez-nous votre produit, on s&apos;occupe du reste
          </h2>
          <p className="mt-3 text-[13.5px] leading-relaxed text-zinc-600">
            Vous avez vu un produit sur AliExpress, 1688, Taobao ou dans une
            boutique ? Collez le lien ou décrivez-le. Nous trouvons le
            fournisseur, vérifions la qualité et livrons en Afrique.
          </p>
        </div>

        <div className="mt-10 rounded-3xl border border-zinc-100 bg-white p-6 shadow-[0_4px_24px_-12px_rgba(10,25,49,0.12)] sm:p-8">
          <div className="grid gap-5 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <Field
                label="Nom du produit"
                value={productName}
                onChange={setProductName}
                placeholder="Ex. Machine à coudre industrielle"
                icon={<ImagePlus className="h-3.5 w-3.5" strokeWidth={1.75} />}
              />
            </div>

            <div className="sm:col-span-2">
              <Field
                label="Lien du produit (AliExpress, 1688, Taobao...)"
                value={productLink}
                onChange={setProductLink}
                placeholder="https://..."
                icon={<Link2 className="h-3.5 w-3.5" strokeWidth={1.75} />}
              />
              <p className="mt-1.5 text-[11px] text-zinc-400">
                Optionnel. Si vous avez une photo, envoyez-la directement sur
                WhatsApp après avoir soumis le formulaire.
              </p>
            </div>

            <Field
              label="Quantité souhaitée"
              value={quantity}
              onChange={setQuantity}
              placeholder="Ex. 2 unités / 50 cartons"
            />

            <label className="block">
              <span className="mb-2 block text-[11px] font-bold uppercase tracking-wider text-zinc-500">
                Ville de livraison
              </span>
              <select
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                className="w-full rounded-xl border border-zinc-200 bg-white px-3.5 py-3 text-[13.5px] text-navy-900 outline-none transition focus:border-navy-700 focus:ring-4 focus:ring-navy-100"
              >
                <option value="">Sélectionner une ville</option>
                {PORTS.map((p) => (
                  <option key={p.port} value={`${p.port} (${p.country})`}>
                    {p.port} — {p.country}
                  </option>
                ))}
              </select>
            </label>

            <Field
              label="Votre nom"
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

            <div className="sm:col-span-2">
              <label className="block">
                <span className="mb-2 block text-[11px] font-bold uppercase tracking-wider text-zinc-500">
                  Remarques (optionnel)
                </span>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={3}
                  placeholder="Couleur, taille, marque, budget..."
                  className="w-full resize-none rounded-xl border border-zinc-200 bg-white px-3.5 py-3 text-[13.5px] text-navy-900 outline-none transition placeholder:text-zinc-400 focus:border-navy-700 focus:ring-4 focus:ring-navy-100"
                />
              </label>
            </div>
          </div>

          <a
            href={valid ? whatsappHref : undefined}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => {
              if (!valid) e.preventDefault();
            }}
            className={
              "mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full px-6 py-3.5 text-[13px] font-bold text-white shadow-sm transition " +
              (valid
                ? "bg-gradient-to-br from-express-500 to-express-700 hover:shadow-md"
                : "cursor-not-allowed bg-zinc-300 shadow-none")
            }
          >
            <Send className="h-3.5 w-3.5" strokeWidth={2} />
            Envoyer ma demande à Mr ODA
          </a>

          <p className="mt-3 flex items-center justify-center gap-1.5 text-center text-[10.5px] text-zinc-400">
            <PhoneCall className="h-3 w-3" strokeWidth={1.75} />
            Réponse sous 24 h avec devis complet (produit + transport maritime)
          </p>
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  icon,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
  icon?: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-2 flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-zinc-500">
        {icon}
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