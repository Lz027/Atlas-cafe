import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Page, Eyebrow } from "@/components/site-chrome";
import { articles, type ArticleCategory } from "@/lib/data";

const CATEGORIES: ArticleCategory[] = ["History", "Brewing Science", "Regions & Farms"];

export const Route = createFileRoute("/journal/")({
  head: () => ({
    meta: [
      { title: "Journal — Atlas Café" },
      {
        name: "description",
        content:
          "Long-form coffee writing: history, brewing science, and the regions and farms behind the cup. Each piece cited.",
      },
      { property: "og:title", content: "Journal — Atlas Café" },
      {
        property: "og:description",
        content: "Cited long-form writing on coffee history, brewing science, and origin.",
      },
      { property: "og:url", content: "/journal" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/journal" }],
  }),
  component: JournalIndex,
});

function JournalIndex() {
  const [cat, setCat] = useState<ArticleCategory | null>(null);
  const list = cat ? articles.filter((a) => a.category === cat) : articles;

  return (
    <Page>
      <Eyebrow>Field notes</Eyebrow>
      <h1 className="mt-3 font-serif text-4xl font-semibold tracking-tight sm:text-5xl">Journal</h1>
      <p className="mt-3 max-w-xl text-muted-foreground">
        History, brewing science, and the regions behind the cup — with sources at the bottom of every piece.
      </p>

      <div className="mt-8 flex flex-wrap gap-2">
        {CATEGORIES.map((c) => (
          <button
            key={c}
            onClick={() => setCat(cat === c ? null : c)}
            className={`rounded-full border px-3 py-1 font-mono text-[11px] uppercase tracking-[0.12em] transition-colors ${
              cat === c
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border text-muted-foreground hover:text-foreground"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((a) => (
          <Link
            key={a.slug}
            to="/journal/$slug"
            params={{ slug: a.slug }}
            className="group block"
          >
            <div className="overflow-hidden rounded-xl border border-border">
              <img
                src={a.image}
                alt={a.imageAlt}
                loading="lazy"
                className="aspect-[4/3] w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
              />
            </div>
            <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.14em] text-clay">{a.category}</p>
            <h2 className="mt-2 font-serif text-xl font-semibold leading-snug">{a.title}</h2>
            <p className="mt-2 text-sm text-muted-foreground">{a.excerpt}</p>
            <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.12em] text-muted-foreground">
              {a.dateLabel} · {a.readTime}
            </p>
          </Link>
        ))}
      </div>
    </Page>
  );
}
