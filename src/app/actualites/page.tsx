import { ArrowRight } from "lucide-react";
import Link from "next/link";
import BottomNav from "@/components/BottomNav";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import NewsletterForm from "@/components/NewsletterForm";
import { ARTICLES } from "@/data/odaData";

export default function ActualitesPage() {
  return (
    <>
      <Header />
      <main>
        <section className="border-b border-zinc-100 bg-gradient-to-b from-navy-50/50 to-white px-4 py-12 sm:px-6 sm:py-16">
          <div className="mx-auto max-w-6xl">
            <p className="text-[11.5px] font-bold uppercase tracking-[0.18em] text-express-600">
              Actualités & guides
            </p>
            <h1 className="mt-3 text-[28px] font-bold tracking-tight text-navy-900 sm:text-[36px]">
              Conseils pour vos imports Chine — Afrique
            </h1>
            <p className="mt-3 max-w-2xl text-[13.5px] leading-relaxed text-zinc-600">
              Guides pratiques, nouveautés produits et conseils logistiques.
              Recevez-les avant tout le monde.
            </p>

            <div className="mt-8 max-w-xl">
              <NewsletterForm />
            </div>
          </div>
        </section>

        <section className="px-4 py-12 sm:px-6 sm:py-16">
          <div className="mx-auto max-w-6xl">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {ARTICLES.map((article) => (
                <Link
                  key={article.id}
                  href={`/actualites/${article.id}`}
                  className="group flex flex-col overflow-hidden rounded-2xl border border-zinc-100 bg-white transition hover:-translate-y-0.5 hover:border-zinc-200 hover:shadow-[0_12px_32px_-12px_rgba(10,25,49,0.15)]"
                >
                  <div className="aspect-[16/10] overflow-hidden bg-zinc-100">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={article.image}
                      alt={article.title}
                      loading="lazy"
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.04]"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-wide">
                      <span className="rounded-full bg-navy-50 px-2.5 py-1 text-navy-700">
                        {article.category}
                      </span>
                      <span className="text-zinc-400">{article.date}</span>
                      <span className="text-zinc-300">·</span>
                      <span className="text-zinc-400">{article.readTime}</span>
                    </div>
                    <h2 className="mt-3 text-[15px] font-bold tracking-tight text-navy-900 group-hover:text-express-600">
                      {article.title}
                    </h2>
                    <p className="mt-2 line-clamp-3 flex-1 text-[12.5px] leading-relaxed text-zinc-600">
                      {article.excerpt}
                    </p>
                    <span className="mt-4 inline-flex items-center gap-1.5 text-[12px] font-semibold text-express-600">
                      Lire l&apos;article
                      <ArrowRight
                        className="h-3 w-3 transition group-hover:translate-x-0.5"
                        strokeWidth={2.5}
                      />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <BottomNav />
    </>
  );
}