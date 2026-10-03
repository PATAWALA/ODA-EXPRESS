import type { Metadata } from "next";
import { Mail, MapPin, PhoneCall, Clock, MessageCircle } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionTitle } from "@/components/ui/SectionTitle";
import ContactForm from "@/components/widgets/ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contactez ODA SOURCES pour votre projet d'import depuis la Chine. Réponse sous 24 h ouvrées. Sourcing, contrôle qualité, shipping.",
};

const INFOS = [
  {
    icon: MessageCircle,
    title: "WhatsApp",
    value: "+86 195 1566 0197",
    href: "https://wa.me/8619515660197",
  },
  {
    icon: Mail,
    title: "Email",
    value: "odaxpress10@gmail.com",
    href: "mailto:odaxpress10@gmail.com",
  },
  {
    icon: MapPin,
    title: "Implantations",
    value: "Hong Kong · Chine Continentale",
    href: null,
  },
  {
    icon: Clock,
    title: "Délai de réponse",
    value: "Sous 24 heures ouvrées",
    href: null,
  },
];

export default function ContactPage() {
  return (
    <>
      <section className="border-b border-zinc-100 bg-gradient-to-b from-navy-50/40 to-white py-16 sm:py-20">
        <Container>
          <SectionTitle
            badge="Contact"
            title="Parlons de votre projet"
            subtitle="Décrivez-nous votre produit, votre besoin ou votre projet d'import. Nous vous répondons sous 24 heures ouvrées avec une solution claire."
          />
        </Container>
      </section>

      <section className="py-16 sm:py-20">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
            <div>
              <h2 className="text-[18px] font-bold tracking-tight text-navy-700">
                Nos coordonnées
              </h2>
              <p className="mt-2 text-[13px] leading-relaxed text-zinc-600">
                Choisissez le canal qui vous convient. WhatsApp est le plus
                rapide pour une première prise de contact.
              </p>

              <ul className="mt-8 space-y-4">
                {INFOS.map((info) => {
                  const content = (
                    <>
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-navy-50 text-navy-700">
                        <info.icon className="h-4 w-4" strokeWidth={1.75} />
                      </span>
                      <div>
                        <p className="text-[11px] font-bold uppercase tracking-wider text-zinc-500">
                          {info.title}
                        </p>
                        <p className="mt-0.5 text-[13px] font-semibold text-navy-700">
                          {info.value}
                        </p>
                      </div>
                    </>
                  );

                  return (
                    <li key={info.title}>
                      {info.href ? (
                        <a
                          href={info.href}
                          target={info.href.startsWith("http") ? "_blank" : undefined}
                          rel={
                            info.href.startsWith("http")
                              ? "noopener noreferrer"
                              : undefined
                          }
                          className="flex items-start gap-3 rounded-2xl border border-zinc-100 bg-white p-4 transition hover:border-navy-200 hover:shadow-sm"
                        >
                          {content}
                        </a>
                      ) : (
                        <div className="flex items-start gap-3 rounded-2xl border border-zinc-100 bg-white p-4">
                          {content}
                        </div>
                      )}
                    </li>
                  );
                })}
              </ul>

              <div className="mt-8 rounded-2xl border border-zinc-100 bg-gradient-to-br from-navy-50/60 to-white p-5">
                <p className="text-[11px] font-bold uppercase tracking-wider text-express-600">
                  Urgence ?
                </p>
                <p className="mt-2 text-[13px] leading-relaxed text-zinc-600">
                  Pour une réponse immédiate, écrivez-nous directement sur
                  WhatsApp. Nous sommes disponibles du lundi au samedi.
                </p>
                <a
                  href="https://wa.me/8619515660197"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center gap-2 rounded-full bg-gradient-to-br from-emerald-500 to-emerald-700 px-5 py-2.5 text-[12.5px] font-bold text-white shadow-sm transition hover:shadow-md"
                >
                  <PhoneCall className="h-3.5 w-3.5" strokeWidth={2} />
                  Ouvrir WhatsApp
                </a>
              </div>
            </div>

            <div>
              <h2 className="text-[18px] font-bold tracking-tight text-navy-700">
                Envoyer un message
              </h2>
              <p className="mt-2 text-[13px] leading-relaxed text-zinc-600">
                Remplissez le formulaire ci-dessous. Plus vous êtes précis,
                plus notre réponse sera rapide et adaptée.
              </p>

              <div className="mt-8">
                <ContactForm />
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}