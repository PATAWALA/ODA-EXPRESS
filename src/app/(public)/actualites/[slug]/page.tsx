import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getArticle, getRelatedArticles } from "@/content/articles";
import { Container } from "@/components/ui/Container";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.odasources.com";

// 1. Génération des métadonnées dynamiques (Title, Description, OG)
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);

  if (!article) {
    return { title: "Article introuvable" };
  }

  return {
    title: article.title,
    description: article.excerpt,
    alternates: {
      canonical: `/actualites/${article.slug}`,
    },
    openGraph: {
      type: "article",
      title: article.title,
      description: article.excerpt,
      url: `${SITE_URL}/actualites/${article.slug}`,
      images: [
        {
          url: article.image,
          width: 1200,
          height: 630,
          alt: article.title,
        },
      ],
      publishedTime: article.date,
      authors: [article.author],
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.excerpt,
      images: [article.image],
    },
  };
}

// 2. Page de l'article avec JSON-LD (Article + BreadcrumbList)
export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getArticle(slug);

  if (!article) {
    notFound();
  }

  const relatedArticles = getRelatedArticles(article.slug);

  return (
    <>
      {/* JSON-LD : Article + BreadcrumbList */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "Article",
                "@id": `${SITE_URL}/actualites/${article.slug}/#article`,
                headline: article.title,
                description: article.excerpt,
                image: article.image,
                datePublished: article.date,
                author: {
                  "@type": "Person",
                  name: article.author,
                },
                publisher: {
                  "@id": `${SITE_URL}/#organization`,
                },
                mainEntityOfPage: {
                  "@type": "WebPage",
                  "@id": `${SITE_URL}/actualites/${article.slug}`,
                },
              },
              {
                "@type": "BreadcrumbList",
                "@id": `${SITE_URL}/actualites/${article.slug}/#breadcrumb`,
                itemListElement: [
                  {
                    "@type": "ListItem",
                    position: 1,
                    name: "Accueil",
                    item: SITE_URL,
                  },
                  {
                    "@type": "ListItem",
                    position: 2,
                    name: "Actualités",
                    item: `${SITE_URL}/actualites`,
                  },
                  {
                    "@type": "ListItem",
                    position: 3,
                    name: article.title,
                    item: `${SITE_URL}/actualites/${article.slug}`,
                  },
                ],
              },
            ],
          }),
        }}
      />

      <article className="bg-white">
        {/* En-tête de l'article */}
        <div className="border-b border-zinc-200">
          <Container>
            <div className="mx-auto max-w-4xl py-16 sm:py-20 lg:py-24">
              <nav className="mb-6 text-sm text-zinc-500">
                <Link href="/" className="hover:text-navy-700">Accueil</Link>
                <span className="mx-2">/</span>
                <Link href="/actualites" className="hover:text-navy-700">Actualités</Link>
                <span className="mx-2">/</span>
                <span className="text-navy-700">{article.title}</span>
              </nav>

              <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-express-600">
                {article.category}
              </p>

              <h1 className="mt-4 text-[32px] font-bold leading-[1.15] tracking-tight text-navy-900 sm:text-[44px] lg:text-[52px]">
                {article.title}
              </h1>

              <p className="mt-5 max-w-2xl text-[16px] leading-[1.75] text-zinc-600">
                {article.excerpt}
              </p>

              <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-zinc-500">
                <span>Par {article.author}</span>
                <span>•</span>
                <span>{article.date}</span>
                <span>•</span>
                <span>{article.readTime} de lecture</span>
              </div>
            </div>
          </Container>
        </div>

        {/* Image de couverture */}
        <div className="relative mx-auto aspect-[21/9] max-w-5xl overflow-hidden rounded-xl my-8 sm:my-12">
          <Image
            src={article.image}
            alt={article.title}
            fill
            className="object-cover"
            priority
            sizes="(max-width: 1024px) 100vw, 1024px"
          />
        </div>

        {/* Contenu de l'article */}
        <Container>
          <div className="mx-auto max-w-3xl py-8 sm:py-12">
            {article.keyPoints && (
              <div className="mb-10 rounded-xl border border-navy-100 bg-navy-50/50 p-6">
                <h2 className="text-sm font-bold uppercase tracking-wider text-navy-700">
                  Points clés
                </h2>
                <ul className="mt-4 space-y-2">
                  {article.keyPoints.map((point, i) => (
                    <li key={i} className="flex items-start gap-2 text-[15px] text-zinc-700">
                      <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-express-500" />
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="prose prose-lg max-w-none prose-headings:text-navy-900 prose-p:text-zinc-700 prose-p:leading-[1.8] prose-a:text-express-600">
              {article.content.map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </div>
          </div>
        </Container>

        {/* Articles similaires */}
        {relatedArticles.length > 0 && (
          <div className="border-t border-zinc-200 bg-zinc-50">
            <Container>
              <div className="mx-auto max-w-5xl py-16">
                <h2 className="text-[24px] font-bold tracking-tight text-navy-900 sm:text-[28px]">
                  À lire aussi
                </h2>
                <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {relatedArticles.map((rel) => (
                    <Link
                      key={rel.slug}
                      href={`/actualites/${rel.slug}`}
                      className="group rounded-xl border border-zinc-200 bg-white p-5 transition hover:border-navy-300 hover:shadow-sm"
                    >
                      <p className="text-[10px] font-bold uppercase tracking-wider text-express-600">
                        {rel.category}
                      </p>
                      <h3 className="mt-2 text-[16px] font-bold leading-snug text-navy-900 group-hover:text-express-600">
                        {rel.title}
                      </h3>
                      <p className="mt-2 line-clamp-2 text-[14px] text-zinc-500">
                        {rel.excerpt}
                      </p>
                    </Link>
                  ))}
                </div>
              </div>
            </Container>
          </div>
        )}
      </article>
    </>
  );
}