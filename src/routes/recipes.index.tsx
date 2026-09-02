import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Page, Eyebrow } from "@/components/site-chrome";
import { BrewArt } from "@/components/brew-art";
import { recipes, METHODS, STRENGTHS, FLAVOR_NOTES, type Method, type Strength } from "@/lib/data";

export const Route = createFileRoute("/recipes/")({
  head: () => ({
    meta: [
      { title: "Recipes — Atlas Café" },
      {
        name: "description",
        content:
          "Browse 50+ measured coffee recipes by brew method, strength, and flavor note — from espresso to cold brew.",
      },
      { property: "og:title", content: "Recipes — Atlas Café" },
      {
        property: "og:description",
        content: "50+ measured coffee recipes filtered by method, strength, and flavor.",
      },
      { property: "og:url", content: "/recipes" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/recipes" }],
  }),
  component: RecipesPage,
});

function Chip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={`rounded-full border px-3 py-1 font-mono text-[11px] uppercase tracking-[0.12em] transition-colors ${
        active
          ? "border-primary bg-primary text-primary-foreground"
          : "border-border text-muted-foreground hover:text-foreground"
      }`}
    >
      {children}
    </button>
  );
}

function RecipesPage() {
  const [method, setMethod] = useState<Method | null>(null);
  const [strength, setStrength] = useState<Strength | null>(null);
  const [flavor, setFlavor] = useState<string | null>(null);

  const filtered = useMemo(
    () =>
      recipes.filter(
        (r) =>
          (!method || r.method === method) &&
          (!strength || r.strength === strength) &&
          (!flavor || r.flavors.includes(flavor)),
      ),
    [method, strength, flavor],
  );

  return (
    <Page>
      <Eyebrow>The index</Eyebrow>
      <h1 className="mt-3 font-serif text-4xl font-semibold tracking-tight sm:text-5xl">Recipes</h1>
      <p className="mt-3 max-w-xl text-muted-foreground">
        {recipes.length} measured brews. Every card carries its dose, water, temperature, and time.
      </p>

      <div className="mt-10 grid gap-10 lg:grid-cols-[220px_1fr]">
        <aside className="space-y-7">
          <div>
            <Eyebrow>Method</Eyebrow>
            <div className="mt-3 flex flex-wrap gap-2">
              {METHODS.map((m) => (
                <Chip key={m} active={method === m} onClick={() => setMethod(method === m ? null : m)}>
                  {m}
                </Chip>
              ))}
            </div>
          </div>
          <div>
            <Eyebrow>Strength</Eyebrow>
            <div className="mt-3 flex flex-wrap gap-2">
              {STRENGTHS.map((s) => (
                <Chip key={s} active={strength === s} onClick={() => setStrength(strength === s ? null : s)}>
                  {s}
                </Chip>
              ))}
            </div>
          </div>
          <div>
            <Eyebrow>Flavor</Eyebrow>
            <div className="mt-3 flex flex-wrap gap-2">
              {FLAVOR_NOTES.map((f) => (
                <Chip key={f} active={flavor === f} onClick={() => setFlavor(flavor === f ? null : f)}>
                  {f}
                </Chip>
              ))}
            </div>
          </div>
        </aside>

        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
            {filtered.length} result{filtered.length === 1 ? "" : "s"}
          </p>
          <div className="mt-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {filtered.map((r) => (
              <Link
                key={r.slug}
                to="/recipes/$slug"
                params={{ slug: r.slug }}
                className="group rounded-xl border border-border bg-card p-5 transition-colors hover:border-clay"
              >
                <div className="mb-4 flex h-28 items-center justify-center rounded-lg bg-secondary">
                  <BrewArt method={r.method} seed={r.slug} className="h-24 w-24 transition-transform duration-500 group-hover:scale-105" />
                </div>
                <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-clay">{r.method}</p>
                <h2 className="mt-2 font-serif text-xl font-semibold leading-snug">{r.name}</h2>
                <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">{r.description}</p>
                <dl className="mt-4 grid grid-cols-3 gap-2 border-t border-border pt-3 font-mono text-[11px] text-muted-foreground">
                  <div>
                    <dt className="uppercase tracking-[0.1em]">Dose</dt>
                    <dd className="text-foreground">{r.dose}g</dd>
                  </div>
                  <div>
                    <dt className="uppercase tracking-[0.1em]">Ratio</dt>
                    <dd className="text-foreground">{r.ratio}</dd>
                  </div>
                  <div>
                    <dt className="uppercase tracking-[0.1em]">Time</dt>
                    <dd className="text-foreground">{r.timeLabel}</dd>
                  </div>
                </dl>
              </Link>
            ))}
          </div>
          {filtered.length === 0 && (
            <p className="mt-10 text-sm text-muted-foreground">
              No recipes match those filters. Try clearing one.
            </p>
          )}
        </div>
      </div>
    </Page>
  );
}
