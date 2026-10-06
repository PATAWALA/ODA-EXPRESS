import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import NewsletterSection from "@/components/widgets/NewsletterSection";
import { getArticles } from "@/lib/data/articles";

export const metadata = {
  title: "Actualités",
  description:
    "Guides, conseils et actualités sur le sourcing, l'import-export et la logistique entre la Chine et l'Afrique. Par ODA SOURCES.",
};

export const revalidate = 60;

export default async function ActualitesPage() {
  const articles = await getArticles();

  if (articles.length === 0) {
    return (
      <>
        <section className="relative overflow-hidden bg-white py-20">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-gradient-to-b from-navy-100/60 via-navy-50/30 to-white"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-gradient-to-br from-navy-200/40 via-express-100/30 to-transparent blur-3xl"
          />

          <Container className="relative">
            <div className="mx-auto max-w-2xl text-center">
              <p className="inline-flex items-center rounded-2xl border border-navy-200 bg-white/80 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.22em] text-express-600 shadow-sm backdrop-blur">
                Actualités
              </p>
              <h1 className="mt-6 text-[32px] font-bold tracking-tight text-navy-900">
                Aucun article pour l&apos;instant
              </h1>
              <p className="mt-4 text-[14px] text-zinc-600">
                Les articles seront publiés très prochainement. Inscrivez-vous
                pour être prévenu.
              </p>
            </div>
          </Container>
        </section>
        <NewsletterSection />
      </>
    );
  }

  const [featured, ...rest] = articles;

  return (
    <>
      {/* ============ HERO ============ */}
      <section className="relative overflow-hidden border-b border-zinc-200 bg-white">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-gradient-to-b from-navy-100/70 via-navy-50/30 to-white"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-gradient-to-br from-navy-200/40 via-express-100/30 to-transparent blur-3xl"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-24 -left-24 h-80 w-80 rounded-full bg-gradient-to-tr from-express-100/40 via-navy-100/30 to-transparent blur-3xl"
        />

        <Container className="relative">
          <div className="grid gap-12 py-16 sm:py-20 lg:grid-cols-[1.1fr_1fr] lg:items-center lg:gap-20 lg:py-24">
            <div>
              <p className="inline-flex items-center rounded-2xl border border-navy-200 bg-white/80 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.22em] text-express-600 shadow-sm backdrop-blur">
                Actualités & guides
              </p>

              <h1 className="mt-6 text-[36px] leading-[1.1] tracking-[-0.02em] text-navy-900 sm:text-[44px] lg:text-[50px]">
                Conseils pour vos
                <br />
                <span className="bg-gradient-to-r from-navy-900 via-navy-700 to-express-600 bg-clip-text text-transparent">
                  imports Chine — Afrique.
                </span>
              </h1>

              <p className="mt-7 max-w-xl text-[15.5px] leading-[1.75] text-zinc-600">
                Guides pratiques, actualités logistiques et retours
                d&apos;expérience terrain. Tout ce qu&apos;il faut savoir pour
                importer en toute confiance.
              </p>
            </div>

            <div className="relative aspect-[5/4] overflow-hidden rounded-2xl border border-zinc-200 shadow-[0_30px_70px_-25px_rgba(1,18,52,0.35)]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=1400&q=85"
                alt="Actualités"
                className="h-full w-full object-cover"
              />
              <div
                aria-hidden
                className="absolute inset-0 bg-gradient-to-t from-navy-900/40 via-transparent to-transparent"
              />
            </div>
          </div>
        </Container>
      </section>

      {/* ============ ARTICLE À LA UNE ============ */}
      <section className="relative overflow-hidden border-b border-zinc-200 bg-white py-16 sm:py-20">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white via-navy-50/30 to-white"
        />

        <Container className="relative">
          <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-express-600">
            À la une
          </p>

          <Link
            href={`/actualites/${featured.slug}`}
            className="group mt-8 grid gap-8 overflow-hidden rounded-2xl border border-zinc-200 bg-gradient-to-br from-white via-white to-navy-50/40 shadow-[0_4px_24px_-12px_rgba(1,18,52,0.12)] transition-all duration-300 hover:border-navy-300 hover:shadow-[0_20px_50px_-20px_rgba(1,18,52,0.25)] lg:grid-cols-[1.2fr_1fr]"
          >
            <div className="relative aspect-[16/10] overflow-hidden lg:aspect-auto">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={featured.image}
                alt={featured.title}
                className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.04]"
              />
              <div
                aria-hidden
                className="absolute inset-0 bg-gradient-to-t from-navy-900/40 via-transparent to-transparent"
              />
            </div>

            <div className="flex flex-col justify-between gap-6 p-6 sm:p-10">
              <div>
                <div className="flex flex-wrap items-center gap-4 text-[10.5px] font-bold uppercase tracking-[0.2em]">
                  <span className="rounded-2xl bg-express-600 px-2.5 py-1 text-white">
                    {featured.category}
                  </span>
                  <span className="text-zinc-400">·</span>
                  <span className="text-zinc-500">{featured.date}</span>
                  <span className="text-zinc-400">·</span>
                  <span className="text-zinc-500">{featured.readTime}</span>
                </div>

                <h2 className="mt-5 text-[22px] font-bold leading-tight tracking-tight text-navy-900 transition group-hover:text-express-600 sm:text-[28px]">
                  {featured.title}
                </h2>

                <p className="mt-4 text-[14px] leading-[1.75] text-zinc-600">
                  {featured.excerpt}
                </p>
              </div>

              <span className="inline-flex items-center gap-2 text-[12px] font-bold uppercase tracking-[0.1em] text-express-600 transition group-hover:gap-3">
                Lire l&apos;article
                <ArrowRight
                  className="h-3.5 w-3.5 transition group-hover:translate-x-0.5"
                  strokeWidth={2.5}
                />
              </span>
            </div>
          </Link>
        </Container>
      </section>

      {/* ============ AUTRES ARTICLES ============ */}
      {rest.length > 0 && (
        <section className="relative overflow-hidden bg-white py-16 sm:py-20">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white via-express-50/20 to-white"
          />

          <Container className="relative">
            <h2 className="text-[22px] font-bold tracking-tight text-navy-900 sm:text-[26px]">
              Tous les articles
            </h2>

            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {rest.map((article) => (
                <Link
                  key={article.slug}
                  href={`/actualites/${article.slug}`}
                  className="group relative flex flex-col overflow-hidden rounded-2xl border border-zinc-200 bg-gradient-to-br from-white via-white to-navy-50/40 shadow-[0_1px_2px_rgba(1,18,52,0.04)] transition-all duration-300 hover:-translate-y-1 hover:border-navy-300 hover:shadow-[0_20px_50px_-20px_rgba(1,18,52,0.25)]"
                >
                  <div className="relative aspect-[16/10] overflow-hidden bg-zinc-100">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={article.image}
                      alt={article.title}
                      loading="lazy"
                      className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.06]"
                    />

                    {/* Voile bleu au survol */}
                    <div className="absolute inset-0 bg-gradient-to-t from-navy-950/50 via-navy-950/10 to-transparent opacity-50 transition-opacity group-hover:opacity-100" />

                    {/* Badge catégorie */}
                    <div className="absolute left-3 top-3">
                      <span className="rounded-2xl border border-white/30 bg-navy-950/70 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.15em] text-white backdrop-blur">
                        {article.category}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-1 flex-col p-6">
                    <div className="flex flex-wrap items-center gap-3 text-[11px] font-medium text-zinc-400">
                      <span>{article.date}</span>
                      <span>·</span>
                      <span>{article.readTime}</span>
                    </div>

                    <h3 className="mt-3 text-[15.5px] font-bold leading-tight tracking-tight text-navy-900 transition group-hover:text-express-600">
                      {article.title}
                    </h3>

                    <p className="mt-3 flex-1 text-[13px] leading-relaxed text-zinc-600">
                      {article.excerpt}
                    </p>

                    <span className="mt-5 inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.15em] text-zinc-400 transition-all group-hover:gap-2.5 group-hover:text-express-600">
                      Lire
                      <ArrowRight
                        className="h-3 w-3 transition group-hover:translate-x-0.5"
                        strokeWidth={2.5}
                      />
                    </span>

                    {/* Trait rouge qui s'allonge au survol */}
                    <div
                      aria-hidden
                      className="mt-4 h-px w-8 bg-gradient-to-r from-express-600 to-transparent transition-all duration-300 group-hover:w-16"
                    />
                  </div>
                </Link>
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* ============ NEWSLETTER ============ */}
      <NewsletterSection />
    </>
  );
}