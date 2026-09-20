"use client";

import { useMemo, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Calculator,
  CheckCircle2,
  MapPin,
  PhoneCall,
  Plane,
  Ship,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useCurrency } from "@/lib/currency";
import {
  AFRICA_DESTINATIONS,
  PRODUCT_CATEGORIES,
  SERVICES,
  WHATSAPP_NUMBER,
  computeQuote,
  type ServiceId,
  type ShippingMode,
} from "@/data/odaData";

const STEP_LABELS = ["Votre besoin", "Votre marchandise", "Votre devis"];

const SHIPPING_MODES: {
  id: ShippingMode;
  label: string;
  hint: string;
  icon: LucideIcon;
}[] = [
  {
    id: "air",
    label: "Aérien express",
    hint: "5 à 7 jours · dès $10 / kg",
    icon: Plane,
  },
  {
    id: "sea",
    label: "Maritime groupé",
    hint: "35 à 50 jours · dès $180 / CBM",
    icon: Ship,
  },
];

const inputClass =
  "w-full rounded-xl border border-slate-200 bg-slate-50/70 px-4 py-3 text-[14px] text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-brand-500 focus:bg-white focus:ring-4 focus:ring-brand-100";

const labelClass =
  "mb-2 block text-[12.5px] font-semibold uppercase tracking-wide text-slate-600";

function parseNumber(value: string): number {
  const parsed = Number.parseFloat(value.replace(",", "."));
  return Number.isFinite(parsed) && parsed > 0 ? parsed : 0;
}

export default function ConversionWizard() {
  const { format } = useCurrency();

  const [step, setStep] = useState(1);
  const [service, setService] = useState<ServiceId | null>(null);
  const [productType, setProductType] = useState("");
  const [weight, setWeight] = useState("");
  const [volume, setVolume] = useState("");
  const [shippingMode, setShippingMode] = useState<ShippingMode>("air");
  const [destination, setDestination] = useState("");
  const [fullName, setFullName] = useState("");
  const [withInspection, setWithInspection] = useState(false);
  const [showErrors, setShowErrors] = useState(false);

  const selectedService = useMemo(
    () => SERVICES.find((item) => item.id === service) ?? null,
    [service],
  );

  const quote = useMemo(
    () =>
      computeQuote({
        service: service ?? "shipping",
        shippingMode,
        weightKg: parseNumber(weight),
        volumeM3: parseNumber(volume),
        withInspection,
      }),
    [service, shippingMode, weight, volume, withInspection],
  );

  const inspectionRequested = service === "inspection" || withInspection;
  const stepTwoValid = productType.trim() !== "" && destination.trim() !== "";

  const whatsappHref = useMemo(() => {
    const rows: (string | null)[] = [
      "Bonjour Mr ODA, je viens du site ODA Express.",
      "",
      `Besoin principal : ${selectedService?.wizardLabel ?? "Non précisé"}`,
      `Type de produit : ${productType || "À préciser"}`      ,
      parseNumber(weight) > 0 ? `Poids estimé : ${weight} kg` : null,
      parseNumber(volume) > 0 ? `Volume estimé : ${volume} m³` : null,
      `Mode d'expédition : ${
        shippingMode === "air" ? "Fret aérien express" : "Fret maritime groupé"
      }`,
      `Ville de livraison : ${destination || "À préciser"}`,
      `Inspection qualité en usine : ${inspectionRequested ? "Oui" : "Non"}`,
      `Estimation indicative : ${format(quote.totalUsd)}${
        quote.isPartial ? " (à confirmer)" : ""
      }`,
      fullName.trim() ? `Nom / entreprise : ${fullName.trim()}` : null,
      "",
      "Merci de me confirmer le tarif final et le délai de livraison.",
    ];

    const message = rows
      .filter((row): row is string => row !== null)
      .join("\n");

    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  }, [
    selectedService,
    productType,
    weight,
    volume,
    shippingMode,
    destination,
    inspectionRequested,
    quote.totalUsd,
    quote.isPartial,
    fullName,
    format,
  ]);

  function handleNext() {
    if (step === 1) {
      if (!service) {
        setShowErrors(true);
        return;
      }
      setShowErrors(false);
      setStep(2);
      return;
    }
    if (step === 2) {
      if (!stepTwoValid) {
        setShowErrors(true);
        return;
      }
      setShowErrors(false);
      setStep(3);
    }
  }

  function handleBack() {
    setShowErrors(false);
    setStep((current) => Math.max(1, current - 1));
  }

  return (
    <section id="devis" className="border-b border-slate-200 bg-white py-20 lg:py-24">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-[11.5px] font-bold uppercase tracking-[0.16em] text-brand-700">
            Assistant de devis express
          </span>
          <h2 className="mt-3 text-[28px] font-bold leading-tight tracking-tight text-slate-900 sm:text-[36px]">
            Votre demande qualifiée en 3 étapes
          </h2>
          <p className="mt-4 text-[15px] leading-relaxed text-slate-600">
            60 secondes, aucune inscription. À la fin, votre demande complète est
            transmise directement à Mr ODA sur WhatsApp.
          </p>
        </div>

        <div className="mt-12 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-10">
          {/* Indicateur d'étapes */}
          <div className="mb-9 flex items-center gap-3 sm:gap-4">
            {STEP_LABELS.map((label, index) => {
              const stepNumber = index + 1;
              const isDone = step > stepNumber;
              const isActive = step === stepNumber;

              return (
                <div key={label} className="flex flex-1 items-center gap-3">
                  <div className="flex items-center gap-3">
                    <span
                      className={cn(
                        "flex h-8 w-8 shrink-0 items-center justify-center rounded-full border text-[12px] font-bold transition",
                        isDone && "border-brand-600 bg-brand-600 text-white",
                        isActive && "border-slate-900 bg-slate-900 text-white",
                        !isDone &&
                          !isActive &&
                          "border-slate-200 bg-white text-slate-400",
                      )}
                    >
                      {isDone ? <CheckCircle2 className="h-4 w-4" /> : stepNumber}
                    </span>
                    <span
                      className={cn(
                        "hidden text-[12.5px] font-semibold sm:block",
                        isActive || isDone ? "text-slate-900" : "text-slate-400",
                      )}
                    >
                      {label}
                    </span>
                  </div>
                  {index < STEP_LABELS.length - 1 && (
                    <span
                      className={cn(
                        "h-px flex-1",
                        isDone ? "bg-brand-500" : "bg-slate-200",
                      )}
                    />
                  )}
                </div>
              );
            })}
          </div>

          {/* ÉTAPE 1 */}
          {step === 1 && (
            <div>
              <h3 className="text-[17px] font-bold tracking-tight text-slate-900">
                Quel est votre besoin principal ?
              </h3>
              <p className="mt-1.5 text-[13.5px] text-slate-500">
                Sélectionnez l&apos;option qui correspond à votre situation.
              </p>

              <div className="mt-6 grid gap-4 lg:grid-cols-3">
                {SERVICES.map((item) => {
                  const isSelected = service === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => {
                        setService(item.id);
                        setShowErrors(false);
                      }}
                      className={cn(
                        "flex h-full flex-col rounded-2xl border p-5 text-left transition",
                        isSelected
                          ? "border-brand-600 bg-brand-50/60 ring-4 ring-brand-100"
                          : "border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50",
                      )}
                    >
                      <span
                        className={cn(
                          "flex h-11 w-11 items-center justify-center rounded-xl transition",
                          isSelected
                            ? "bg-brand-600 text-white"
                            : "bg-slate-900 text-white",
                        )}
                      >
                        <item.icon className="h-5 w-5" />
                      </span>
                      <span className="mt-4 text-[15px] font-bold text-slate-900">
                        {item.wizardLabel}
                      </span>
                      <span className="mt-1.5 text-[13px] leading-relaxed text-slate-500">
                        {item.wizardDescription}
                      </span>
                      <span
                        className={cn(
                          "mt-4 inline-flex items-center gap-1.5 text-[11.5px] font-bold uppercase tracking-wide",
                          isSelected ? "text-brand-700" : "text-slate-400",
                        )}
                      >
                        {isSelected ? (
                          <>
                            <CheckCircle2 className="h-3.5 w-3.5" />
                            Sélectionné
                          </>
                        ) : (
                          "Choisir"
                        )}
                      </span>
                    </button>
                  );
                })}
              </div>

              {showErrors && !service && (
                <p className="mt-5 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-[13px] font-medium text-amber-800">
                  Merci de sélectionner votre besoin principal pour continuer.
                </p>
              )}
            </div>
          )}

          {/* ÉTAPE 2 */}
          {step === 2 && (
            <div>
              <h3 className="text-[17px] font-bold tracking-tight text-slate-900">
                Détails de votre marchandise
              </h3>
              <p className="mt-1.5 text-[13.5px] text-slate-500">
                Plus vous êtes précis, plus notre estimation est fiable.
              </p>

              <div className="mt-6 grid gap-5 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <label htmlFor="productType" className={labelClass}>
                    Type de produit
                  </label>
                  <select
                    id="productType"
                    value={productType}
                    onChange={(event) => setProductType(event.target.value)}
                    className={inputClass}
                  >
                    <option value="">Sélectionnez une catégorie</option>
                    {PRODUCT_CATEGORIES.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="weight" className={labelClass}>
                    Poids estimé (kg)
                  </label>
                  <input
                    id="weight"
                    type="number"
                    min="0"
                    step="1"
                    inputMode="decimal"
                    placeholder="Ex. 150"
                    value={weight}
                    onChange={(event) => setWeight(event.target.value)}
                    className={inputClass}
                  />
                  <p className="mt-1.5 text-[11.5px] text-slate-400">
                    Requis pour le fret aérien express.
                  </p>
                </div>

                <div>
                  <label htmlFor="volume" className={labelClass}>
                    Volume estimé (m³)
                  </label>
                  <input
                    id="volume"
                    type="number"
                    min="0"
                    step="0.1"
                    inputMode="decimal"
                    placeholder="Ex. 2.5"
                    value={volume}
                    onChange={(event) => setVolume(event.target.value)}
                    className={inputClass}
                  />
                  <p className="mt-1.5 text-[11.5px] text-slate-400">
                    Requis pour le fret maritime groupé.
                  </p>
                </div>

                <div className="sm:col-span-2">
                  <span className={labelClass}>Mode d&apos;expédition</span>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {SHIPPING_MODES.map((mode) => {
                      const isSelected = shippingMode === mode.id;
                      return (
                        <button
                          key={mode.id}
                          type="button"
                          onClick={() => setShippingMode(mode.id)}
                          className={cn(
                            "flex items-center gap-3 rounded-xl border px-4 py-3.5 text-left transition",
                            isSelected
                              ? "border-brand-600 bg-brand-50/60 ring-4 ring-brand-100"
                              : "border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50",
                          )}
                        >
                          <mode.icon
                            className={cn(
                              "h-5 w-5 shrink-0",
                              isSelected ? "text-brand-700" : "text-slate-400",
                            )}
                          />
                          <span className="leading-tight">
                            <span className="block text-[13.5px] font-semibold text-slate-900">
                              {mode.label}
                            </span>
                            <span className="mt-0.5 block text-[11.5px] text-slate-500">
                              {mode.hint}
                            </span>
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <label htmlFor="destination" className={labelClass}>
                    Ville de livraison en Afrique
                  </label>
                  <select
                    id="destination"
                    value={destination}
                    onChange={(event) => setDestination(event.target.value)}
                    className={inputClass}
                  >
                    <option value="">Sélectionnez votre ville</option>
                    {AFRICA_DESTINATIONS.map((entry) => (
                      <optgroup key={entry.country} label={entry.country}>
                        {entry.cities.map((city) => (
                          <option
                            key={`${entry.country}-${city}`}
                            value={`${city}, ${entry.country}`}
                          >
                            {city}
                          </option>
                        ))}
                      </optgroup>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="fullName" className={labelClass}>
                    Votre nom ou entreprise{" "}
                    <span className="font-normal normal-case text-slate-400">
                      (optionnel)
                    </span>
                  </label>
                  <input
                    id="fullName"
                    type="text"
                    placeholder="Ex. Ets Mbala Import"
                    value={fullName}
                    onChange={(event) => setFullName(event.target.value)}
                    className={inputClass}
                  />
                </div>

                {service !== "inspection" && (
                  <div className="sm:col-span-2">
                    <button
                      type="button"
                      onClick={() => setWithInspection((value) => !value)}
                      className={cn(
                        "flex w-full items-start gap-3 rounded-xl border px-4 py-4 text-left transition",
                        withInspection
                          ? "border-brand-600 bg-brand-50/60 ring-4 ring-brand-100"
                          : "border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50",
                      )}
                    >
                      <span
                        className={cn(
                          "mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md border transition",
                          withInspection
                            ? "border-brand-600 bg-brand-600 text-white"
                            : "border-slate-300 bg-white",
                        )}
                      >
                        {withInspection && <CheckCircle2 className="h-3.5 w-3.5" />}
                      </span>
                      <span>
                        <span className="flex items-center gap-2 text-[13.5px] font-semibold text-slate-900">
                          <ShieldCheck className="h-4 w-4 text-brand-600" />
                          Ajouter une inspection qualité en usine (+99 $)
                        </span>
                        <span className="mt-1 block text-[12.5px] leading-relaxed text-slate-500">
                          Notre équipe se déplace dans l&apos;usine et vous envoie un
                          rapport photo / vidéo sous 24 heures.
                        </span>
                      </span>
                    </button>
                  </div>
                )}
              </div>

              {showErrors && !stepTwoValid && (
                <p className="mt-5 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-[13px] font-medium text-amber-800">
                  Merci de renseigner le type de produit et votre ville de livraison.
                </p>
              )}
            </div>
          )}

          {/* ÉTAPE 3 */}
          {step === 3 && (
            <div>
              <h3 className="text-[17px] font-bold tracking-tight text-slate-900">
                Récapitulatif de votre demande
              </h3>
              <p className="mt-1.5 text-[13.5px] text-slate-500">
                Vérifiez les informations avant de transmettre votre dossier à Mr ODA.
              </p>

              <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200">
                <dl className="divide-y divide-slate-100">
                  <div className="flex items-start justify-between gap-6 px-5 py-3.5">
                    <dt className="text-[13px] font-medium text-slate-500">
                      Besoin principal
                    </dt>
                    <dd className="text-right text-[13.5px] font-semibold text-slate-900">
                      {selectedService?.wizardLabel}
                    </dd>
                  </div>
                  <div className="flex items-start justify-between gap-6 px-5 py-3.5">
                    <dt className="text-[13px] font-medium text-slate-500">
                      Type de produit
                    </dt>
                    <dd className="text-right text-[13.5px] font-semibold text-slate-900">
                      {productType}
                    </dd>
                  </div>
                  <div className="flex items-start justify-between gap-6 px-5 py-3.5">
                    <dt className="text-[13px] font-medium text-slate-500">
                      Poids / Volume
                    </dt>
                    <dd className="text-right text-[13.5px] font-semibold text-slate-900">
                      {parseNumber(weight) > 0 ? `${weight} kg` : "—"} /{" "}
                      {parseNumber(volume) > 0 ? `${volume} m³` : "—"}
                    </dd>
                  </div>
                  <div className="flex items-start justify-between gap-6 px-5 py-3.5">
                    <dt className="text-[13px] font-medium text-slate-500">
                      Mode d&apos;expédition
                    </dt>
                    <dd className="text-right text-[13.5px] font-semibold text-slate-900">
                      {shippingMode === "air"
                        ? "Fret aérien express"
                        : "Fret maritime groupé"}
                    </dd>
                  </div>
                  <div className="flex items-start justify-between gap-6 px-5 py-3.5">
                    <dt className="text-[13px] font-medium text-slate-500">
                      Destination
                    </dt>
                    <dd className="flex items-center justify-end gap-1.5 text-right text-[13.5px] font-semibold text-slate-900">
                      <MapPin className="h-3.5 w-3.5 text-brand-600" />
                      {destination}
                    </dd>
                  </div>
                  <div className="flex items-start justify-between gap-6 px-5 py-3.5">
                    <dt className="text-[13px] font-medium text-slate-500">
                      Inspection qualité en usine
                    </dt>
                    <dd className="text-right text-[13.5px] font-semibold text-slate-900">
                      {inspectionRequested ? "Oui" : "Non"}
                    </dd>
                  </div>
                  {fullName.trim() !== "" && (
                    <div className="flex items-start justify-between gap-6 px-5 py-3.5">
                      <dt className="text-[13px] font-medium text-slate-500">
                        Nom / entreprise
                      </dt>
                      <dd className="text-right text-[13.5px] font-semibold text-slate-900">
                        {fullName}
                      </dd>
                    </div>
                  )}
                </dl>
              </div>

              {/* Estimation */}
              <div className="mt-5 rounded-2xl bg-slate-900 p-6 sm:p-7">
                <div className="flex items-center gap-2 text-[11.5px] font-bold uppercase tracking-[0.16em] text-brand-400">
                  <Calculator className="h-4 w-4" />
                  Estimation indicative
                </div>

                <ul className="mt-5 space-y-3.5">
                  {quote.lines.map((line) => (
                    <li
                      key={line.label}
                      className="flex items-start justify-between gap-6 border-b border-white/10 pb-3.5 last:border-0 last:pb-0"
                    >
                      <span>
                        <span className="block text-[13.5px] font-semibold text-white">
                          {line.label}
                        </span>
                        <span className="mt-0.5 block text-[11.5px] text-slate-400">
                          {line.detail}
                        </span>
                      </span>
                      <span className="shrink-0 text-[13.5px] font-bold text-white">
                        {line.amountUsd === null ? "À confirmer" : format(line.amountUsd)}
                      </span>
                    </li>
                  ))}
                </ul>

                <div className="mt-6 flex flex-wrap items-end justify-between gap-4 border-t border-white/10 pt-5">
                  <div>
                    <p className="text-[11.5px] font-semibold uppercase tracking-wide text-slate-400">
                      Total estimé
                    </p>
                    <p className="mt-1 text-[30px] font-bold leading-none tracking-tight text-white">
                      {quote.isPartial ? "≈ " : ""}
                      {format(quote.totalUsd)}
                    </p>
                  </div>
                  <p className="text-[12px] font-medium text-slate-400">
                    Délai estimé : {quote.delay}
                  </p>
                </div>
              </div>

              <p className="mt-4 text-[12px] leading-relaxed text-slate-500">
                Cette estimation est indicative et ne comprend pas les droits de douane
                locaux. Le tarif final est confirmé par Mr ODA après vérification du
                fournisseur et du poids réel.
              </p>

              {/* CTA WhatsApp */}
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 flex w-full items-center justify-center gap-3 rounded-2xl bg-brand-600 px-6 py-5 text-center text-[15px] font-bold text-white shadow-sm transition hover:bg-brand-700"
              >
                <PhoneCall className="h-5 w-5" />
                Transmettre ma demande qualifiée sur WhatsApp à Mr ODA
                <ArrowRight className="h-5 w-5" />
              </a>

              <p className="mt-3 text-center text-[12px] font-medium text-slate-500">
                Réponse en moins de 30 minutes · Aucun engagement
              </p>
            </div>
          )}

          {/* Navigation */}
          {step < 3 && (
            <div className="mt-9 flex items-center justify-between gap-4 border-t border-slate-100 pt-7">
              <button
                type="button"
                onClick={handleBack}
                disabled={step === 1}
                className={cn(
                  "inline-flex items-center gap-2 rounded-xl border px-5 py-3 text-[13.5px] font-semibold transition",
                  step === 1
                    ? "cursor-not-allowed border-slate-100 text-slate-300"
                    : "border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-slate-50",
                )}
              >
                <ArrowLeft className="h-4 w-4" />
                Retour
              </button>

              <button
                type="button"
                onClick={handleNext}
                className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-6 py-3.5 text-[13.5px] font-semibold text-white transition hover:bg-slate-800"
              >
                {step === 1 ? "Continuer" : "Voir mon estimation"}
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          )}

          {step === 3 && (
            <div className="mt-6 flex justify-center border-t border-slate-100 pt-6">
              <button
                type="button"
                onClick={handleBack}
                className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-5 py-3 text-[13.5px] font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
              >
                <ArrowLeft className="h-4 w-4" />
                Modifier ma demande
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}