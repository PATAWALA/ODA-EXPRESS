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
        <section className="bg-white py-20">
          <Container>
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-express-600">
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
      {/* Hero */}
      <section className="border-b border-zinc-200 bg-white">
        <Container>
          <div className="grid gap-12 py-16 sm:py-20 lg:grid-cols-[1.1fr_1fr] lg:items-center lg:gap-20 lg:py-24">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-express-600">
                Actualités & guides
              </p>

              <h1 className="mt-6 text-[36px] leading-[1.1] tracking-[-0.02em] text-navy-900 sm:text-[44px] lg:text-[50px]">
                Conseils pour vos
                <br />
                imports Chine — Afrique.
              </h1>

              <p className="mt-7 max-w-xl text-[15.5px] leading-[1.75] text-zinc-600">
                Guides pratiques, actualités logistiques et retours
                d&apos;expérience terrain. Tout ce qu&apos;il faut savoir pour
                importer en toute confiance.
              </p>
            </div>

            <div className="relative aspect-[5/4] overflow-hidden border border-zinc-200 shadow-[0_30px_70px_-25px_rgba(1,18,52,0.25)]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=1400&q=85"
                alt="Actualités"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </Container>
      </section>

      {/* Article à la une */}
      <section className="border-b border-zinc-200 bg-white py-16 sm:py-20">
        <Container>
          <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-express-600">
            À la une
          </p>

          <Link
            href={`/actualites/${featured.slug}`}
            className="group mt-8 grid gap-8 border border-zinc-200 bg-white transition hover:border-navy-300 lg:grid-cols-[1.2fr_1fr]"
          >
            <div className="relative aspect-[16/10] overflow-hidden lg:aspect-auto">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={featured.image}
                alt={featured.title}
                className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.02]"
              />
            </div>

            <div className="flex flex-col justify-between gap-6 p-6 sm:p-10">
              <div>
                <div className="flex flex-wrap items-center gap-4 text-[10.5px] font-bold uppercase tracking-[0.2em]">
                  <span className="text-express-600">
                    {featured.category}
                  </span>
                  <span className="text-zinc-400">·</span>
                  <span className="text-zinc-500">{featured.date}</span>
                  <span className="text-zinc-400">·</span>
                  <span className="text-zinc-500">{featured.readTime}</span>
                </div>

                <h2 className="mt-5 text-[22px] font-bold leading-tight tracking-tight text-navy-900 group-hover:text-express-600 sm:text-[28px]">
                  {featured.title}
                </h2>

                <p className="mt-4 text-[14px] leading-[1.75] text-zinc-600">
                  {featured.excerpt}
                </p>
              </div>

              <span className="inline-flex items-center gap-2 text-[12px] font-bold uppercase tracking-[0.1em] text-express-600 transition group-hover:gap-3">
                Lire l&apos;article
                <ArrowRight className="h-3.5 w-3.5" strokeWidth={2.5} />
              </span>
            </div>
          </Link>
        </Container>
      </section>

      {/* Autres articles */}
      {rest.length > 0 && (
        <section className="bg-white py-16 sm:py-20">
          <Container>
            <h2 className="text-[22px] font-bold tracking-tight text-navy-900 sm:text-[26px]">
              Tous les articles
            </h2>

            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {rest.map((article) => (
                <Link
                  key={article.slug}
                  href={`/actualites/${article.slug}`}
                  className="group flex flex-col overflow-hidden border border-zinc-200 bg-white transition hover:border-navy-300"
                >
                  <div className="relative aspect-[16/10] overflow-hidden bg-zinc-100">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={article.image}
                      alt={article.title}
                      loading="lazy"
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
                    />
                    <div className="absolute left-3 top-3">
                      <span className="border border-white/30 bg-navy-950/70 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.15em] text-white backdrop-blur">
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

                    <h3 className="mt-3 text-[15.5px] font-bold leading-tight tracking-tight text-navy-900 group-hover:text-express-600">
                      {article.title}
                    </h3>

                    <p className="mt-3 flex-1 text-[13px] leading-relaxed text-zinc-600">
                      {article.excerpt}
                    </p>

                    <span className="mt-5 inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.15em] text-zinc-400 transition group-hover:gap-2.5 group-hover:text-express-600">
                      Lire
                      <ArrowRight className="h-3 w-3" strokeWidth={2.5} />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* Newsletter — formulaire d'inscription */}
      <NewsletterSection />
    </>
  );
}