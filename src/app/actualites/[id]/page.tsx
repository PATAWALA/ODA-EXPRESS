import { ArrowLeft, ArrowRight, Calendar, Clock, Tag } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import BottomNav from "@/components/BottomNav";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import NewsletterForm from "@/components/NewsletterForm";
import { ARTICLES, getArticle } from "@/data/odaData";

export function generateStaticParams() {
  return ARTICLES.map((article) => ({ id: article.id }));
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const article = getArticle(id);

  if (!article) {
    notFound();
  }

  const others = ARTICLES.filter((a) => a.id !== article.id).slice(0, 2);

  return (
    <>
      <Header />
      <main>
        {/* Hero article */}
        <section className="relative overflow-hidden bg-navy-900 px-4 py-16 sm:px-6 sm:py-24">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={article.image}
            alt={article.title}
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div
            aria-hidden
            className="absolute inset-0 bg-gradient-to-br from-navy-900/95 via-navy-900/85 to-navy-900/70"
          />

          <div className="relative mx-auto max-w-3xl">
            <Link
              href="/actualites"
              className="inline-flex items-center gap-1.5 text-[12.5px] font-semibold text-white/70 transition hover:text-white"
            >
              <ArrowLeft className="h-3.5 w-3.5" strokeWidth={2} />
              Retour aux actualités
            </Link>

            <div className="mt-6 flex flex-wrap items-center gap-3 text-[11px] font-bold uppercase tracking-wide text-white/90">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-express-600 px-2.5 py-1">
                <Tag className="h-3 w-3" strokeWidth={2} />
                {article.category}
              </span>
              <span className="inline-flex items-center gap-1.5 text-white/70">
                <Calendar className="h-3 w-3" strokeWidth={2} />
                {article.date}
              </span>
              <span className="inline-flex items-center gap-1.5 text-white/70">
                <Clock className="h-3 w-3" strokeWidth={2} />
                {article.readTime}
              </span>
            </div>

            <h1 className="mt-5 text-[28px] font-bold leading-tight tracking-tight text-white sm:text-[40px]">
              {article.title}
            </h1>

            <p className="mt-5 text-[14.5px] leading-relaxed text-navy-100">
              {article.excerpt}
            </p>
          </div>
        </section>

        {/* Contenu */}
        <section className="px-4 py-12 sm:px-6 sm:py-16">
          <div className="mx-auto max-w-3xl">
            {/* Points clés */}
            {article.keyPoints && article.keyPoints.length > 0 && (
              <div className="mb-10 rounded-2xl border border-navy-100 bg-gradient-to-br from-navy-50/60 to-white p-6">
                <p className="text-[11px] font-bold uppercase tracking-wider text-navy-700">
                  À retenir
                </p>
                <ul className="mt-4 space-y-2.5">
                  {article.keyPoints.map((point) => (
                    <li
                      key={point}
                      className="flex gap-3 text-[13px] leading-relaxed text-navy-900"
                    >
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-express-600" />
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Paragraphes */}
            <div className="space-y-5">
              {article.content.map((paragraph, index) => (
                <p
                  key={index}
                  className="text-[14px] leading-[1.75] text-zinc-700"
                >
                  {paragraph}
                </p>
              ))}
            </div>

            {/* CTA */}
            <div className="mt-12 rounded-2xl bg-gradient-to-br from-navy-900 to-navy-700 p-6 sm:p-8">
              <p className="text-[11px] font-bold uppercase tracking-wider text-express-400">
                Passer à l&apos;action
              </p>
              <h2 className="mt-3 text-[20px] font-bold tracking-tight text-white sm:text-[24px]">
                Un produit en tête ? Envoyez-nous le lien.
              </h2>
              <p className="mt-3 text-[13px] leading-relaxed text-navy-100">
                Nous trouvons le fournisseur, vérifions la marchandise et
                livrons en Afrique par voie maritime.
              </p>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/#sur-mesure"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3.5 text-[13px] font-bold text-navy-900 transition hover:shadow-lg"
                >
                  Envoyer mon produit
                  <ArrowRight className="h-3.5 w-3.5" strokeWidth={2.5} />
                </Link>
                <Link
                  href="/#catalogue"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/5 px-6 py-3.5 text-[13px] font-semibold text-white backdrop-blur transition hover:bg-white/10"
                >
                  Voir le catalogue
                </Link>
              </div>
            </div>

            {/* Newsletter */}
            <div className="mt-12 border-t border-zinc-100 pt-10">
              <p className="text-[11px] font-bold uppercase tracking-wider text-express-600">
                Newsletter
              </p>
              <h3 className="mt-3 text-[18px] font-bold tracking-tight text-navy-900">
                Recevez les prochains articles
              </h3>
              <p className="mt-2 text-[13px] text-zinc-600">
                Conseils, nouveautés et opportunités d&apos;import, une fois par
                mois.
              </p>
              <div className="mt-5">
                <NewsletterForm />
              </div>
            </div>
          </div>
        </section>

        {/* Autres articles */}
        {others.length > 0 && (
          <section className="border-t border-zinc-100 bg-gradient-to-b from-navy-50/40 to-white px-4 py-12 sm:px-6 sm:py-16">
            <div className="mx-auto max-w-6xl">
              <h2 className="text-[20px] font-bold tracking-tight text-navy-900 sm:text-[24px]">
                À lire aussi
              </h2>

              <div className="mt-8 grid gap-6 sm:grid-cols-2">
                {others.map((other) => (
                  <Link
                    key={other.id}
                    href={`/actualites/${other.id}`}
                    className="group flex gap-4 overflow-hidden rounded-2xl border border-zinc-100 bg-white p-4 transition hover:-translate-y-0.5 hover:border-zinc-200 hover:shadow-[0_12px_32px_-12px_rgba(10,25,49,0.15)]"
                  >
                    <div className="h-24 w-24 shrink-0 overflow-hidden rounded-xl bg-zinc-100">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={other.image}
                        alt={other.title}
                        loading="lazy"
                        className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.04]"
                      />
                    </div>
                    <div className="flex min-w-0 flex-col">
                      <span className="text-[10.5px] font-bold uppercase tracking-wide text-express-600">
                        {other.category}
                      </span>
                      <h3 className="mt-1 line-clamp-2 text-[13.5px] font-bold tracking-tight text-navy-900 group-hover:text-express-600">
                        {other.title}
                      </h3>
                      <p className="mt-1.5 line-clamp-2 text-[12px] leading-relaxed text-zinc-500">
                        {other.excerpt}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
      <Footer />
      <BottomNav />
    </>
  );
}