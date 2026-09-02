import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { Page, Eyebrow } from "@/components/site-chrome";
import { BrewArt } from "@/components/brew-art";
import { listApprovedSubmissions, type Submission } from "@/lib/submissions.functions";

export const Route = createFileRoute("/community")({
  head: () => ({
    meta: [
      { title: "Community brews — Atlas Café" },
      {
        name: "description",
        content:
          "Recipes and brew journals sent in by the Atlas Café community — measurements, methods, and field notes from home brewers.",
      },
      { property: "og:title", content: "Community brews — Atlas Café" },
      {
        property: "og:description",
        content: "Reader-submitted coffee recipes and brew journals, with full measurements.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/community" }],
  }),
  component: CommunityPage,
});

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

function SubmissionCard({ s }: { s: Submission }) {
  const specs: Array<[string, string]> = [];
  if (s.dose) specs.push(["Dose", `${s.dose} g`]);
  if (s.water) specs.push(["Water", `${s.water} g`]);
  if (s.tempC) specs.push(["Temp", `${s.tempC} °C`]);
  if (s.timeLabel) specs.push(["Time", s.timeLabel]);

  return (
    <article className="overflow-hidden rounded-xl border border-border bg-card transition-colors hover:border-clay/50">
      {s.imageUrl ? (
        <img
          src={s.imageUrl}
          alt={s.imageAlt || `${s.title} — brew photo by ${s.authorName}`}
          loading="lazy"
          className="h-48 w-full border-b border-border object-cover"
        />
      ) : (
        <div className="flex h-48 items-center justify-center border-b border-border bg-secondary">
          <BrewArt method={s.method} seed={s.id} className="h-32 w-32" />
        </div>
      )}
      <div className="p-6">
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-full border border-border px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.16em] text-clay">
            {s.kind === "recipe" ? "Recipe" : "Brew journal"}
          </span>
          <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
            {s.method}
          </span>
        </div>
        <h2 className="mt-3 font-serif text-2xl font-semibold tracking-tight text-foreground">
          {s.title}
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          by {s.authorName} ·{" "}
          {new Date(s.createdAt).toLocaleDateString("en-GB", {
            day: "numeric",
            month: "short",
            year: "numeric",
          })}
        </p>
        {specs.length > 0 && (
          <div className="mt-5 grid grid-cols-2 gap-4 border-y border-border py-4 sm:grid-cols-4">
            {specs.map(([label, value]) => (
              <Spec key={label} label={label} value={value} />
            ))}
          </div>
        )}
        {s.notes && (
          <p className="mt-4 text-[15px] leading-relaxed text-foreground/90">{s.notes}</p>
        )}
        {s.flavors.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-1.5">
            {s.flavors.map((f) => (
              <span
                key={f}
                className="rounded-full bg-secondary px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-secondary-foreground"
              >
                {f}
              </span>
            ))}
          </div>
        )}
      </div>
    </article>
  );
}

function CommunityPage() {
  const fetchSubmissions = useServerFn(listApprovedSubmissions);
  const { data, isPending } = useQuery({
    queryKey: ["submissions"],
    queryFn: () => fetchSubmissions(),
  });

  return (
    <Page>
      <header className="max-w-2xl">
        <Eyebrow>Community</Eyebrow>
        <h1 className="mt-3 font-serif text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
          Brews from the field
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
          Recipes and journals sent in by readers. Every entry lists its measurements, so you can
          reproduce the cup exactly as it was poured.
        </p>
        <Link
          to="/submit"
          className="mt-6 inline-flex rounded-full bg-primary px-4 py-2 font-mono text-[11px] uppercase tracking-[0.14em] text-primary-foreground transition-opacity hover:opacity-90"
        >
          Submit your brew
        </Link>
      </header>

      <div className="mt-12 grid gap-5 md:grid-cols-2">
        {isPending && (
          <p className="font-mono text-xs uppercase tracking-[0.16em] text-muted-foreground">
            Loading brews…
          </p>
        )}
        {data?.map((s) => (
          <SubmissionCard key={s.id} s={s} />
        ))}
        {data && data.length === 0 && (
          <p className="text-muted-foreground">
            No approved submissions yet — yours could be the first.
          </p>
        )}
      </div>
    </Page>
  );
}
