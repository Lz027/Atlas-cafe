import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Page, Eyebrow } from "@/components/site-chrome";
import { getArticle } from "@/lib/data";

export const Route = createFileRoute("/journal/$slug")({
  loader: ({ params }) => {
    const article = getArticle(params.slug);
    if (!article) throw notFound();
    return { article };
  },
  head: ({ loaderData, params }) => {
    if (!loaderData) {
      return {
        meta: [
          { title: "Article unavailable — Atlas Café" },
          { name: "robots", content: "noindex" },
        ],
      };
    }
    const a = loaderData.article;
    return {
      meta: [
        { title: `${a.title} — Atlas Café` },
        { name: "description", content: a.excerpt },
        { property: "og:title", content: `${a.title} — Atlas Café` },
        { property: "og:description", content: a.excerpt },
        { property: "og:url", content: `/journal/${params.slug}` },
        { property: "og:type", content: "article" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
      links: [{ rel: "canonical", href: `/journal/${params.slug}` }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: a.title,
            description: a.excerpt,
            articleSection: a.category,
          }),
        },
      ],
    };
  },
  component: ArticlePage,
});

function ArticlePage() {
  const { article: a } = Route.useLoaderData();

  return (
    <Page>
      <Link
        to="/journal"
        className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground hover:text-foreground"
      >
        ← Journal
      </Link>

      <article className="mx-auto mt-6 max-w-2xl">
        <Eyebrow>{a.category}</Eyebrow>
        <h1 className="mt-3 font-serif text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
          {a.title}
        </h1>
        <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
          {a.dateLabel} · {a.readTime}
        </p>

        <img
          src={a.image}
          alt={a.imageAlt}
          width={1200}
          height={900}
          className="mt-8 aspect-[16/9] w-full rounded-xl border border-border object-cover shadow-sm"
        />

        <div className="mt-10 space-y-6">
          {a.paragraphs.map((p, i) => (
            <p key={i} className="text-lg leading-relaxed">
              {p}
            </p>
          ))}
        </div>

        <section className="mt-14 rounded-xl border border-border bg-secondary p-6">
          <Eyebrow>Sources</Eyebrow>
          <ul className="mt-4 space-y-3">
            {a.citations.map((c) => (
              <li key={c.label} className="text-sm">
                <span className="font-medium">{c.label}</span>
                <span className="text-muted-foreground"> — {c.source}</span>
              </li>
            ))}
          </ul>
        </section>
      </article>
    </Page>
  );
}
