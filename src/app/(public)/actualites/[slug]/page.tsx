import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";
import {
  getArticleBySlug,
  getRelatedArticles,
} from "@/lib/data/articles";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  if (!article) return { title: "Article introuvable" };
  return {
    title: article.title,
    description: article.excerpt,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      images: [{ url: article.image, width: 1400, height: 800, alt: article.title }],
      type: "article",
    },
  };
}

export default async function ArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);

  if (!article) notFound();

  const related = await getRelatedArticles(slug, 3);

  return (
    <>
      <section className="border-b border-zinc-200 bg-white">
        <Container>
          <div className="py-12 sm:py-16 lg:py-20">
            <Link
              href="/actualites"
              className="inline-flex items-center gap-2 text-[11.5px] font-bold uppercase tracking-[0.15em] text-zinc-500 transition hover:text-navy-900"
            >
              <ArrowLeft className="h-3.5 w-3.5" strokeWidth={2} />
              Toutes les actualités
            </Link>

            <div className="mt-8 flex flex-wrap items-center gap-4 text-[10.5px] font-bold uppercase tracking-[0.2em]">
              <span className="text-express-600">{article.category}</span>
              <span className="text-zinc-400">·</span>
              <span className="text-zinc-500">{article.date}</span>
              <span className="text-zinc-400">·</span>
              <span className="text-zinc-500">{article.readTime}</span>
            </div>

            <h1 className="mt-6 max-w-4xl text-[32px] font-bold leading-[1.15] tracking-[-0.02em] text-navy-900 sm:text-[42px] lg:text-[48px]">
              {article.title}
            </h1>

            <p className="mt-6 max-w-3xl text-[16px] leading-[1.7] text-zinc-600">
              {article.excerpt}
            </p>

            <p className="mt-8 text-[12.5px] font-semibold text-express-600">
              Par {article.author}
            </p>
          </div>

          <div className="relative aspect-[16/9] overflow-hidden rounded-2xl border border-zinc-200">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={article.image}
              alt={article.title}
              className="h-full w-full object-cover"
            />
          </div>
        </Container>
      </section>

      <section className="bg-white py-16 sm:py-20">
        <Container>
          <div className="mx-auto max-w-3xl">
            {article.keyPoints && article.keyPoints.length > 0 && (
              <div className="mb-12 rounded-2xl border border-zinc-200 bg-zinc-50/50 p-6 sm:p-8">
                <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-express-600">
                  À retenir
                </p>
                <ul className="mt-5 space-y-3">
                  {article.keyPoints.map((point) => (
                    <li
                      key={point}
                      className="flex gap-3 text-[14px] leading-relaxed text-navy-900"
                    >
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 bg-express-600" />
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="space-y-6">
              {article.content.map((paragraph, index) => (
                <p
                  key={index}
                  className="text-[15.5px] leading-[1.85] text-zinc-700"
                >
                  {paragraph}
                </p>
              ))}
            </div>

            <div className="mt-16 rounded-2xl border border-zinc-200 bg-navy-950 p-8 sm:p-10">
              <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-express-400">
                Passer à l&apos;action
              </p>
              <h2 className="mt-5 text-[22px] font-bold leading-tight tracking-tight text-white sm:text-[26px]">
                Un produit en tête ? Parlons-en.
              </h2>
              <p className="mt-4 text-[14px] leading-[1.75] text-navy-200">
                Nous trouvons le fournisseur, vérifions la marchandise et
                coordonnons l&apos;expédition vers votre ville.
              </p>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <ButtonLink href="/contact" variant="white" size="md" className="group">
                  Se faire accompagner
                  <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" strokeWidth={2.5} />
                </ButtonLink>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {related.length > 0 && (
        <section className="border-t border-zinc-200 bg-zinc-50/50 py-16 sm:py-20">
          <Container>
            <h2 className="text-[22px] font-bold tracking-tight text-navy-900 sm:text-[26px]">
              À lire aussi
            </h2>
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((other) => (
                <Link
                  key={other.slug}
                  href={`/actualites/${other.slug}`}
                  className="group flex flex-col overflow-hidden rounded-2xl border border-zinc-200 bg-white transition hover:border-navy-300"
                >
                  <div className="relative aspect-[16/10] overflow-hidden bg-zinc-100">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={other.image}
                      alt={other.title}
                      loading="lazy"
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <span className="text-[10.5px] font-bold uppercase tracking-[0.2em] text-express-600">
                      {other.category}
                    </span>
                    <h3 className="mt-3 text-[15px] font-bold leading-tight tracking-tight text-navy-900 group-hover:text-express-600">
                      {other.title}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
          </Container>
        </section>
      )}
    </>
  );
}