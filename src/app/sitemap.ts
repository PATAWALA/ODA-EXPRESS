import type { MetadataRoute } from "next";
import { ARTICLES } from "@/content/articles";
import { SERVICES } from "@/content/services";
import { PRODUCT_FAMILIES } from "@/content/products";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.odasources.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  // 1. Pages statiques
  const staticPages: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE_URL}/services`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE_URL}/produits`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE_URL}/realisations`, lastModified: now, changeFrequency: "weekly", priority: 0.85 },
    { url: `${SITE_URL}/newsletter`, lastModified: now, changeFrequency: "monthly", priority: 0.85 },
    { url: `${SITE_URL}/actualites`, lastModified: now, changeFrequency: "weekly", priority: 0.75 },
    { url: `${SITE_URL}/a-propos`, lastModified: now, changeFrequency: "monthly", priority: 0.65 },
    { url: `${SITE_URL}/contact`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/mentions-legales`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${SITE_URL}/confidentialite`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
  ];

  // 2. Pages de services (ex: /services/sourcing)
  const servicePages: MetadataRoute.Sitemap = SERVICES.map((service) => ({
    url: `${SITE_URL}/services/${service.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.85,
  }));

  // 3. Pages de produits (ex: /produits/machines-industrielles)
  const productPages: MetadataRoute.Sitemap = PRODUCT_FAMILIES.map((product) => ({
    url: `${SITE_URL}/produits/${product.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  // 4. Pages d'articles de blog (ex: /actualites/importer-chine-2026)
  const articlePages: MetadataRoute.Sitemap = ARTICLES.map((article) => ({
    url: `${SITE_URL}/actualites/${article.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticPages, ...servicePages, ...productPages, ...articlePages];
}