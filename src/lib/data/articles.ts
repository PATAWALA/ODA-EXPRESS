import { createClient } from "@/lib/supabase/server";
import { ARTICLES, getArticle as getStaticArticle } from "@/content/articles";

export interface ArticleDisplay {
  slug: string;
  title: string;
  excerpt: string;
  content: string[];
  category: string;
  date: string;
  readTime: string;
  image: string;
  author: string;
  keyPoints?: string[];
  source: "supabase" | "local";
}

export async function getArticles(): Promise<ArticleDisplay[]> {
  const local = getStaticArticles();

  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("articles")
      .select("*")
      .eq("published", true)
      .order("created_at", { ascending: false });

    if (error || !data || data.length === 0) {
      return local;
    }

    const remote: ArticleDisplay[] = data.map((a) => ({
      slug: a.slug,
      title: a.title,
      excerpt: a.excerpt,
      content: a.content.split(/\n\n+/).filter(Boolean),
      category: a.category,
      date: new Date(a.created_at).toLocaleDateString("fr-FR", {
        day: "numeric",
        month: "long",
        year: "numeric",
      }),
      readTime: `${Math.max(2, Math.ceil(a.content.split(/\s+/).length / 200))} min`,
      image:
        a.cover_image ??
        "https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?w=1400&q=85",
      author: "ODA Sources",
      source: "supabase",
    }));

    const remoteSlugs = new Set(remote.map((r) => r.slug));
    const localFiltered = local.filter((l) => !remoteSlugs.has(l.slug));

    return [...remote, ...localFiltered];
  } catch {
    return local;
  }
}

export async function getArticleBySlug(
  slug: string,
): Promise<ArticleDisplay | undefined> {
  // Cherche d'abord côté Supabase
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("articles")
      .select("*")
      .eq("slug", slug)
      .eq("published", true)
      .single();

    if (!error && data) {
      return {
        slug: data.slug,
        title: data.title,
        excerpt: data.excerpt,
        content: data.content.split(/\n\n+/).filter(Boolean),
        category: data.category,
        date: new Date(data.created_at).toLocaleDateString("fr-FR", {
          day: "numeric",
          month: "long",
          year: "numeric",
        }),
        readTime: `${Math.max(2, Math.ceil(data.content.split(/\s+/).length / 200))} min`,
        image:
          data.cover_image ??
          "https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?w=1400&q=85",
        author: "ODA Sources",
        source: "supabase",
      };
    }
  } catch {
    /* ignore */
  }

  // Sinon côté local
  const localArticle = getStaticArticle(slug);
  if (localArticle) {
    return {
      slug: localArticle.slug,
      title: localArticle.title,
      excerpt: localArticle.excerpt,
      content: localArticle.content,
      category: localArticle.category,
      date: localArticle.date,
      readTime: localArticle.readTime,
      image: localArticle.image,
      author: localArticle.author,
      keyPoints: localArticle.keyPoints,
      source: "local",
    };
  }

  return undefined;
}

export async function getRelatedArticles(
  slug: string,
  count = 3,
): Promise<ArticleDisplay[]> {
  const all = await getArticles();
  return all.filter((a) => a.slug !== slug).slice(0, count);
}

function getStaticArticles(): ArticleDisplay[] {
  return ARTICLES.map((a) => ({
    slug: a.slug,
    title: a.title,
    excerpt: a.excerpt,
    content: a.content,
    category: a.category,
    date: a.date,
    readTime: a.readTime,
    image: a.image,
    author: a.author,
    keyPoints: a.keyPoints,
    source: "local",
  }));
}