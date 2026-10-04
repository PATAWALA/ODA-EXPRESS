import type { Metadata } from "next";
import {
  Mail,
  MapPin,
  PhoneCall,
  Clock,
  MessageCircle,
  ShieldCheck,
  Timer,
  UserCheck,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";
import ContactForm from "@/components/widgets/ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contactez ODA SOURCES pour votre projet d'import depuis la Chine. Réponse sous 24 h ouvrées. Sourcing, contrôle qualité, shipping, accompagnement complet.",
};

const INFOS = [
  {
    icon: MessageCircle,
    label: "WhatsApp",
    value: "+86 195 1566 0197",
    href: "https://wa.me/8619515660197",
    hint: "Le plus rapide pour une première prise de contact",
  },
  {
    icon: Mail,
    label: "Email",
    value: "odaxpress10@gmail.com",
    href: "mailto:odaxpress10@gmail.com",
    hint: "Pour les dossiers détaillés et documents",
  },
  {
    icon: MapPin,
    label: "Implantations",
    value: "Hong Kong · Chine continentale",
    href: null,
    hint: "Présence permanente sur le terrain",
  },
  {
    icon: Clock,
    label: "Disponibilités",
    value: "Lundi au samedi · 9h — 19h",
    href: null,
    hint: "Heure de Chine (GMT+8)",
  },
];

const REASSURANCE = [
  {
    icon: Timer,
    title: "Réponse sous 24 h",
    description:
      "Toute demande reçoit une réponse détaillée sous 24 heures ouvrées.",
  },
  {
    icon: ShieldCheck,
    title: "Confidentialité",
    description:
      "Vos informations et votre projet restent strictement confidentiels.",
  },
  {
    icon: UserCheck,
    title: "Un seul interlocuteur",
    description:
      "Un contact unique suit votre dossier du premier échange à la livraison.",
  },
];

export default function ContactPage() {
  return (
    <>
      {/* Hero */}
      <section className="border-b border-zinc-200 bg-white">
        <Container>
          <div className="grid gap-12 py-16 sm:py-20 lg:grid-cols-[1.1fr_1fr] lg:items-center lg:gap-20 lg:py-24">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-express-600">
                Contact
              </p>

              <h1 className="mt-6 text-[36px] leading-[1.1] tracking-[-0.02em] text-navy-900 sm:text-[44px] lg:text-[50px]">
                Parlons de votre
                <br />
                projet d&apos;import.
              </h1>

              <p className="mt-7 max-w-xl text-[15.5px] leading-[1.75] text-zinc-600">
                Décrivez-nous votre produit, votre volume ou votre besoin. Nous
                vous répondons sous 24 heures ouvrées avec une solution claire
                et un devis précis.
              </p>
            </div>

            <div className="border border-zinc-200 bg-zinc-50/50 p-8 sm:p-10">
              <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-express-600">
                Contact direct
              </p>
              <h2 className="mt-5 text-[22px] font-bold leading-tight tracking-tight text-navy-900 sm:text-[26px]">
                Le plus rapide ?
                <br />
                WhatsApp.
              </h2>
              <p className="mt-5 text-[14px] leading-[1.75] text-zinc-600">
                Écrivez-nous directement sur WhatsApp. Nous répondons
                généralement dans les 2 heures pendant nos horaires d&apos;ouverture.
              </p>
              <div className="mt-7">
                <ButtonLink
                  href="https://wa.me/8619515660197"
                  variant="whatsapp"
                  size="lg"
                  className="group w-full sm:w-auto"
                >
                  <MessageCircle className="h-4 w-4" strokeWidth={2} />
                  Ouvrir WhatsApp
                </ButtonLink>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Coordonnées + Formulaire */}
      <section className="bg-white py-16 sm:py-20 lg:py-24">
        <Container>
          <div className="grid gap-14 lg:grid-cols-[1fr_1.4fr] lg:gap-20">
            {/* Coordonnées */}
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-express-600">
                Nos coordonnées
              </p>
              <h2 className="mt-5 text-[24px] font-bold leading-tight tracking-tight text-navy-900 sm:text-[28px]">
                Choisissez le canal
                <br />
                qui vous convient.
              </h2>

              <ul className="mt-10 space-y-px overflow-hidden border border-zinc-200 bg-zinc-200">
                {INFOS.map((info) => {
                  const content = (
                    <div className="flex items-start gap-4 bg-white p-5">
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center border border-zinc-200 text-navy-900">
                        <info.icon className="h-5 w-5" strokeWidth={1.6} />
                      </span>
                      <div className="min-w-0">
                        <p className="text-[10.5px] font-bold uppercase tracking-[0.2em] text-zinc-500">
                          {info.label}
                        </p>
                        <p className="mt-1.5 text-[14px] font-bold tracking-tight text-navy-900">
                          {info.value}
                        </p>
                        <p className="mt-1 text-[12px] leading-relaxed text-zinc-500">
                          {info.hint}
                        </p>
                      </div>
                    </div>
                  );

                  if (info.href) {
                    return (
                      <li key={info.label}>
                        <a
                          href={info.href}
                          target={
                            info.href.startsWith("http") ? "_blank" : undefined
                          }
                          rel={
                            info.href.startsWith("http")
                              ? "noopener noreferrer"
                              : undefined
                          }
                          className="block transition hover:bg-navy-50/40"
                        >
                          {content}
                        </a>
                      </li>
                    );
                  }

                  return <li key={info.label}>{content}</li>;
                })}
              </ul>
            </div>

            {/* Formulaire */}
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-express-600">
                Formulaire
              </p>
              <h2 className="mt-5 text-[24px] font-bold leading-tight tracking-tight text-navy-900 sm:text-[28px]">
                Décrivez-nous votre projet.
              </h2>
              <p className="mt-4 max-w-lg text-[14px] leading-[1.75] text-zinc-600">
                Plus vous êtes précis sur le produit, la quantité et la
                destination, plus notre réponse sera rapide et adaptée.
              </p>

              <div className="mt-8">
                <ContactForm />
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Réassurance */}
      <section className="border-t border-zinc-200 bg-zinc-50/50 py-16 sm:py-20">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-express-600">
              Nos engagements
            </p>
            <h2 className="mt-5 text-[24px] font-bold leading-tight tracking-tight text-navy-900 sm:text-[28px]">
              Ce que vous pouvez attendre
              <br />
              de chaque échange.
            </h2>
          </div>

          <div className="mx-auto mt-12 grid max-w-6xl gap-px overflow-hidden border border-zinc-200 bg-zinc-200 sm:grid-cols-3">
            {REASSURANCE.map((item) => (
              <div key={item.title} className="bg-white p-7">
                <span className="flex h-11 w-11 items-center justify-center border border-express-600 bg-express-600 text-white">
                  <item.icon className="h-5 w-5" strokeWidth={1.6} />
                </span>
                <h3 className="mt-5 text-[15px] font-bold tracking-tight text-navy-900">
                  {item.title}
                </h3>
                <p className="mt-2.5 text-[13px] leading-relaxed text-zinc-600">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA final */}
      <section className="bg-navy-950 py-16 sm:py-20">
        <Container>
          <div className="mx-auto flex max-w-3xl flex-col items-center gap-6 text-center">
            <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-express-400">
              En urgence ?
            </p>
            <h2 className="text-[24px] font-bold leading-tight tracking-tight text-white sm:text-[30px]">
              Pour une réponse immédiate,
              <br />
              contactez-nous sur WhatsApp.
            </h2>
            <p className="text-[14px] leading-relaxed text-navy-200">
              Disponibles du lundi au samedi, 9h — 19h (heure de Chine).
            </p>
            <div className="mt-4 flex flex-col gap-3 sm:flex-row">
              <ButtonLink
                href="https://wa.me/8619515660197"
                variant="whatsapp"
                size="lg"
                className="group min-w-[220px]"
              >
                <MessageCircle className="h-4 w-4" strokeWidth={2} />
                Ouvrir WhatsApp
              </ButtonLink>
              <ButtonLink
                href="mailto:odaxpress10@gmail.com"
                variant="outline"
                size="lg"
                className="min-w-[220px] border-white/20 bg-white/5 text-white hover:border-white/40 hover:bg-white/10"
              >
                <Mail className="h-4 w-4" strokeWidth={2} />
                Envoyer un email
              </ButtonLink>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}