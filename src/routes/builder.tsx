import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Page, Eyebrow } from "@/components/site-chrome";
import { METHODS, FLAVOR_NOTES, suggestRecipe, type Method } from "@/lib/data";

const COFFEE_TYPES = ["Arabica", "Robusta", "Blend"];

export const Route = createFileRoute("/builder")({
  head: () => ({
    meta: [
      { title: "Brew Builder — Atlas Café" },
      {
        name: "description",
        content:
          "Pick your coffee type, method, and flavor preferences and get a measured recipe you can scale live.",
      },
      { property: "og:title", content: "Brew Builder — Atlas Café" },
      {
        property: "og:description",
        content: "A guided builder that turns your preferences into a measured brew recipe.",
      },
      { property: "og:url", content: "/builder" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/builder" }],
  }),
  component: BuilderPage,
});

function Section({ n, title, children }: { n: number; title: string; children: React.ReactNode }) {
  return (
    <section className="border-t border-border py-8 first:border-t-0 first:pt-0">
      <div className="flex items-baseline gap-3">
        <span className="font-mono text-sm text-clay">{String(n).padStart(2, "0")}</span>
        <h2 className="font-serif text-2xl font-semibold">{title}</h2>
      </div>
      <div className="mt-5">{children}</div>
    </section>
  );
}

function Pill({
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
      className={`rounded-full border px-4 py-1.5 font-mono text-[11px] uppercase tracking-[0.12em] transition-colors ${
        active
          ? "border-primary bg-primary text-primary-foreground"
          : "border-border text-muted-foreground hover:text-foreground"
      }`}
    >
      {children}
    </button>
  );
}

function BuilderPage() {
  const [coffeeType, setCoffeeType] = useState("Arabica");
  const [method, setMethod] = useState<Method>("V60");
  const [flavors, setFlavors] = useState<string[]>(["Floral"]);
  const [dose, setDose] = useState<number | null>(null);

  const suggestion = useMemo(
    () => suggestRecipe({ coffeeType, method, flavors }),
    [coffeeType, method, flavors],
  );

  const activeDose = dose ?? suggestion?.dose ?? 18;
  const ratioNum = suggestion ? suggestion.water / suggestion.dose : 16.7;
  const scaledWater = Math.round(activeDose * ratioNum);

  return (
    <Page>
      <Eyebrow>Guided</Eyebrow>
      <h1 className="mt-3 font-serif text-4xl font-semibold tracking-tight sm:text-5xl">Brew builder</h1>
      <p className="mt-3 max-w-xl text-muted-foreground">
        Three choices in, one measured recipe out. Adjust the dose and the water scales with it.
      </p>

      <div className="mt-10 grid gap-12 lg:grid-cols-[1fr_380px]">
        <div>
          <Section n={1} title="Coffee type">
            <div className="flex flex-wrap gap-2">
              {COFFEE_TYPES.map((c) => (
                <Pill key={c} active={coffeeType === c} onClick={() => setCoffeeType(c)}>
                  {c}
                </Pill>
              ))}
            </div>
          </Section>

          <Section n={2} title="Method">
            <div className="flex flex-wrap gap-2">
              {METHODS.map((m) => (
                <Pill
                  key={m}
                  active={method === m}
                  onClick={() => {
                    setMethod(m);
                    setDose(null);
                  }}
                >
                  {m}
                </Pill>
              ))}
            </div>
          </Section>

          <Section n={3} title="Flavor preferences">
            <div className="flex flex-wrap gap-2">
              {FLAVOR_NOTES.map((f) => (
                <Pill
                  key={f}
                  active={flavors.includes(f)}
                  onClick={() =>
                    setFlavors((prev) =>
                      prev.includes(f) ? prev.filter((x) => x !== f) : [...prev, f],
                    )
                  }
                >
                  {f}
                </Pill>
              ))}
            </div>
          </Section>
        </div>

        <aside className="h-fit rounded-xl border border-border bg-secondary p-6 lg:sticky lg:top-24">
          <Eyebrow>Your brew</Eyebrow>
          {suggestion ? (
            <>
              <h2 className="mt-3 font-serif text-2xl font-semibold">{suggestion.name}</h2>
              <p className="mt-2 text-sm text-muted-foreground">{suggestion.description}</p>

              <label className="mt-7 block font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
                Dose — {activeDose} g
              </label>
              <input
                type="range"
                min={7}
                max={suggestion.method === "Cold Brew" ? 120 : 40}
                step={1}
                value={activeDose}
                onChange={(e) => setDose(Number(e.target.value))}
                className="mt-3 w-full accent-[var(--clay)]"
              />

              <dl className="mt-6 grid grid-cols-2 gap-5 border-t border-border pt-5">
                <div>
                  <dt className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
                    Water
                  </dt>
                  <dd className="mt-1 font-serif text-xl">{scaledWater} ml</dd>
                </div>
                <div>
                  <dt className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
                    Ratio
                  </dt>
                  <dd className="mt-1 font-serif text-xl">{suggestion.ratio}</dd>
                </div>
                <div>
                  <dt className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
                    Temp
                  </dt>
                  <dd className="mt-1 font-serif text-xl">
                    {suggestion.tempC == null ? "Ambient" : `${suggestion.tempC} °C`}
                  </dd>
                </div>
                <div>
                  <dt className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
                    Time
                  </dt>
                  <dd className="mt-1 font-serif text-xl">{suggestion.timeLabel}</dd>
                </div>
              </dl>

              <Link
                to="/recipes/$slug"
                params={{ slug: suggestion.slug }}
                className="mt-7 inline-flex rounded-full bg-primary px-4 py-2 font-mono text-[11px] uppercase tracking-[0.14em] text-primary-foreground"
              >
                Full method →
              </Link>
            </>
          ) : (
            <p className="mt-3 text-sm text-muted-foreground">No match yet — try another method.</p>
          )}
        </aside>
      </div>
    </Page>
  );
}
