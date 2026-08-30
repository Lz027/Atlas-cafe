import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Page, Eyebrow } from "@/components/site-chrome";
import { getRecipe } from "@/lib/data";

export const Route = createFileRoute("/recipes/$slug")({
  loader: ({ params }) => {
    const recipe = getRecipe(params.slug);
    if (!recipe) throw notFound();
    return { recipe };
  },
  head: ({ loaderData, params }) => {
    if (!loaderData) {
      return { meta: [{ title: "Recipe unavailable — Atlas Café" }, { name: "robots", content: "noindex" }] };
    }
    const r = loaderData.recipe;
    const desc = `${r.method} · ${r.dose}g coffee, ${r.water}ml water, ${r.ratio}. ${r.description}`;
    return {
      meta: [
        { title: `${r.name} — ${r.method} recipe | Atlas Café` },
        { name: "description", content: desc.slice(0, 155) },
        { property: "og:title", content: `${r.name} — Atlas Café` },
        { property: "og:description", content: desc.slice(0, 155) },
        { property: "og:url", content: `/recipes/${params.slug}` },
        { property: "og:type", content: "article" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
      links: [{ rel: "canonical", href: `/recipes/${params.slug}` }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Recipe",
            name: r.name,
            recipeCategory: r.method,
            description: r.description,
            recipeIngredient: [`${r.dose}g ${r.coffeeType} coffee (${r.origin})`, `${r.water}ml water`],
            recipeInstructions: r.steps.map((s) => ({ "@type": "HowToStep", text: s })),
          }),
        },
      ],
    };
  },
  component: RecipeDetail,
});

function Spec({ label, value }: { label: string; value: string }) {
  return (
    <div className="border-l border-border pl-3">
      <dt className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">{label}</dt>
      <dd className="mt-1 font-serif text-xl">{value}</dd>
    </div>
  );
}

function RecipeDetail() {
  const { recipe: r } = Route.useLoaderData();

  return (
    <Page>
      <Link
        to="/recipes"
        className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground hover:text-foreground"
      >
        ← All recipes
      </Link>

      <div className="mt-6 grid gap-12 lg:grid-cols-[1.2fr_1fr]">
        <div>
          <Eyebrow>{r.method}</Eyebrow>
          <h1 className="mt-3 font-serif text-4xl font-semibold tracking-tight sm:text-5xl">{r.name}</h1>
          <p className="mt-4 max-w-prose text-lg text-muted-foreground">{r.description}</p>

          <div className="mt-8 flex flex-wrap gap-2">
            {r.flavors.map((f) => (
              <span
                key={f}
                className="rounded-full border border-border px-3 py-1 font-mono text-[11px] uppercase tracking-[0.12em] text-muted-foreground"
              >
                {f}
              </span>
            ))}
          </div>

          <h2 className="mt-12 font-serif text-2xl font-semibold">Method</h2>
          <ol className="mt-5 space-y-5">
            {r.steps.map((s, i) => (
              <li key={i} className="flex gap-4">
                <span className="font-mono text-sm text-clay">{String(i + 1).padStart(2, "0")}</span>
                <p className="max-w-prose leading-relaxed">{s}</p>
              </li>
            ))}
          </ol>
        </div>

        <aside className="h-fit rounded-xl border border-border bg-secondary p-6">
          <Eyebrow>Spec sheet</Eyebrow>
          <dl className="mt-5 grid grid-cols-2 gap-5">
            <Spec label="Dose" value={`${r.dose} g`} />
            <Spec label="Water" value={`${r.water} ml`} />
            <Spec label="Ratio" value={r.ratio} />
            <Spec label="Temp" value={r.tempC == null ? "Ambient" : `${r.tempC} °C`} />
            <Spec label="Time" value={r.timeLabel} />
            <Spec label="Strength" value={r.strength} />
          </dl>
          <dl className="mt-7 space-y-4 border-t border-border pt-5">
            <Spec label="Coffee" value={r.coffeeType} />
            <Spec label="Origin" value={r.origin} />
            <Spec label="Roast" value={r.roast} />
          </dl>
        </aside>
      </div>
    </Page>
  );
}
