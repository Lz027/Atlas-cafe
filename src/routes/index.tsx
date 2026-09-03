import { createFileRoute, Link } from "@tanstack/react-router";
import { Page, Eyebrow } from "@/components/site-chrome";
import { recipes, articles } from "@/lib/data";
import heroImg from "@/assets/journal-kettle.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Atlas Café — Measured coffee recipes & field notes" },
      {
        name: "description",
        content:
          "A field guide to coffee: 50+ measured recipes, a brewing journal on history and science, a guided brew builder, and community brews.",
      },
      { property: "og:title", content: "Atlas Café — Measured coffee recipes & field notes" },
      {
        property: "og:description",
        content:
          "50+ measured recipes, a brewing journal, a guided builder, and brews from the community.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const featured = recipes[0]!;
const methodCount = new Set(recipes.map((r) => r.method)).size;

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-xl border border-border bg-card p-5">
      <p className="font-serif text-3xl font-semibold text-foreground">{value}</p>
      <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
        {label}
      </p>
    </div>
  );
}

function Spec({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
        {label}
      </p>
      <p className="mt-0.5 font-mono text-sm text-foreground">{value}</p>
    </div>
  );
}

function Index() {
  const journal = articles.slice(0, 3);

  return (
    <Page>
      <section className="grid items-center gap-10 lg:grid-cols-[1.1fr_1fr]">
        <div>
          <Eyebrow>A field guide to coffee</Eyebrow>
          <h1 className="mt-4 font-serif text-5xl font-semibold leading-[1.05] tracking-tight text-foreground sm:text-6xl">
            Measured recipes,
            <br />
            written down properly.
          </h1>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted-foreground">
            {recipes.length} recipes across {methodCount} brew methods — every one with dose, water,
            temperature, time, and ratio. Plus a journal on history and brewing science, and brews
            sent in by readers.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to="/recipes"
              className="rounded-full bg-primary px-5 py-2.5 font-mono text-[11px] uppercase tracking-[0.14em] text-primary-foreground transition-opacity hover:opacity-90"
            >
              Browse recipes
            </Link>
            <Link
              to="/builder"
              className="rounded-full border border-border px-5 py-2.5 font-mono text-[11px] uppercase tracking-[0.14em] text-foreground transition-colors hover:border-clay"
            >
              Build my brew
            </Link>
          </div>
        </div>
        <img
          src={heroImg}
          alt="Gooseneck kettle pouring water over a ceramic dripper on a warm wooden counter"
          width={1200}
          height={900}
          className="h-[320px] w-full rounded-2xl object-cover shadow-sm sm:h-[380px]"
          loading="eager"
        />
      </section>

      <section className="mt-14 grid gap-4 sm:grid-cols-3">
        <Stat value={`${recipes.length}`} label="Measured recipes" />
        <Stat value={`${methodCount}`} label="Brew methods" />
        <Stat value={`${articles.length}`} label="Journal entries" />
      </section>

      <section className="mt-20">
        <div className="flex items-end justify-between gap-4">
          <div>
            <Eyebrow>Featured spec sheet</Eyebrow>
            <h2 className="mt-2 font-serif text-3xl font-semibold tracking-tight text-foreground">
              {featured.name}
            </h2>
          </div>
          <Link
            to="/recipes/$slug"
            params={{ slug: featured.slug }}
            className="shrink-0 font-mono text-[11px] uppercase tracking-[0.14em] text-clay hover:underline"
          >
            Full recipe →
          </Link>
        </div>
        <div className="mt-6 rounded-2xl border border-border bg-card p-6">
          <p className="text-[15px] leading-relaxed text-foreground/90">{featured.description}</p>
          <div className="mt-6 grid grid-cols-2 gap-5 border-t border-border pt-5 sm:grid-cols-5">
            <Spec label="Dose" value={`${featured.dose} g`} />
            <Spec label="Water" value={`${featured.water} g`} />
            <Spec
              label="Temp"
              value={featured.tempC == null ? "—" : `${featured.tempC} °C`}
            />
            <Spec label="Time" value={featured.timeLabel} />
            <Spec label="Ratio" value={featured.ratio} />
          </div>
        </div>
      </section>

      <section className="mt-20">
        <div className="flex items-end justify-between gap-4">
          <div>
            <Eyebrow>From the journal</Eyebrow>
            <h2 className="mt-2 font-serif text-3xl font-semibold tracking-tight text-foreground">
              History, science, and origin
            </h2>
          </div>
          <Link
            to="/journal"
            className="shrink-0 font-mono text-[11px] uppercase tracking-[0.14em] text-clay hover:underline"
          >
            All entries →
          </Link>
        </div>
        <div className="mt-6 grid gap-5 md:grid-cols-3">
          {journal.map((a) => (
            <Link
              key={a.slug}
              to="/journal/$slug"
              params={{ slug: a.slug }}
              className="group overflow-hidden rounded-xl border border-border bg-card transition-colors hover:border-clay/50"
            >
              <img
                src={a.image}
                alt={a.imageAlt}
                loading="lazy"
                width={1200}
                height={900}
                className="h-44 w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
              />
              <div className="p-5">
                <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-clay">
                  {a.category}
                </p>
                <h3 className="mt-2 font-serif text-xl font-semibold tracking-tight text-foreground">
                  {a.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{a.excerpt}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="mt-20 rounded-2xl border border-border bg-secondary/40 p-8 sm:p-10">
        <Eyebrow>Community</Eyebrow>
        <h2 className="mt-2 max-w-xl font-serif text-3xl font-semibold tracking-tight text-foreground">
          Poured something worth writing down?
        </h2>
        <p className="mt-3 max-w-xl leading-relaxed text-muted-foreground">
          Send in the recipe with its measurements, or a journal entry about how the cup came
          together. Reviewed entries land on the community feed.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            to="/submit"
            className="rounded-full bg-primary px-5 py-2.5 font-mono text-[11px] uppercase tracking-[0.14em] text-primary-foreground transition-opacity hover:opacity-90"
          >
            Submit a brew
          </Link>
          <Link
            to="/community"
            className="rounded-full border border-border px-5 py-2.5 font-mono text-[11px] uppercase tracking-[0.14em] text-foreground transition-colors hover:border-clay"
          >
            Read the feed
          </Link>
        </div>
      </section>
    </Page>
  );
}
