import { createFileRoute, Link } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useState } from "react";
import { Page, Eyebrow } from "@/components/site-chrome";
import { METHODS, FLAVOR_NOTES } from "@/lib/data";
import { submitBrew } from "@/lib/submissions.functions";
import { BrewArt } from "@/components/brew-art";

export const Route = createFileRoute("/submit")({
  head: () => ({
    meta: [
      { title: "Submit a brew — Atlas Café" },
      {
        name: "description",
        content:
          "Share your coffee recipe or brew journal with the Atlas Café community: dose, water, temperature, time, and flavor tags.",
      },
      { property: "og:title", content: "Submit a brew — Atlas Café" },
      {
        property: "og:description",
        content: "Send in your recipe or brew journal with full measurements and flavor tags.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/submit" }],
  }),
  component: SubmitPage,
});

const fieldClass =
  "mt-1.5 w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-clay";

function Label({ children }: { children: React.ReactNode }) {
  return (
    <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
      {children}
    </span>
  );
}

function SubmitPage() {
  const send = useServerFn(submitBrew);
  const [kind, setKind] = useState<"recipe" | "journal">("recipe");
  const [flavors, setFlavors] = useState<string[]>([]);
  const [previewMethod, setPreviewMethod] = useState<string>("V60");
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [message, setMessage] = useState("");

  function toggleFlavor(f: string) {
    setFlavors((prev) =>
      prev.includes(f) ? prev.filter((x) => x !== f) : [...prev, f].slice(0, 8),
    );
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const num = (k: string) => {
      const v = String(fd.get(k) ?? "").trim();
      return v === "" ? undefined : Number(v);
    };
    const str = (k: string) => {
      const v = String(fd.get(k) ?? "").trim();
      return v === "" ? undefined : v;
    };

    setStatus("sending");
    setMessage("");
    try {
      await send({
        data: {
          kind,
          title: String(fd.get("title") ?? "").trim(),
          authorName: String(fd.get("authorName") ?? "").trim(),
          method: String(fd.get("method") ?? "").trim(),
          dose: num("dose"),
          water: num("water"),
          tempC: num("tempC"),
          timeLabel: str("timeLabel"),
          flavors,
          notes: str("notes"),
        },
      });
      setStatus("done");
      form.reset();
      setFlavors([]);
      setPreviewMethod("V60");
    } catch (err) {
      setStatus("error");
      setMessage(
        err instanceof Error ? err.message : "Something went wrong. Check the fields and retry.",
      );
    }
  }

  return (
    <Page>
      <header className="max-w-2xl">
        <Eyebrow>Submit</Eyebrow>
        <h1 className="mt-3 font-serif text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
          Send in a brew
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
          Recipes need measurements; journals just need the story. Submissions are reviewed before
          they appear on the{" "}
          <Link to="/community" className="underline underline-offset-4 hover:text-foreground">
            community feed
          </Link>
          .
        </p>
      </header>

      <form onSubmit={onSubmit} className="mt-10 max-w-2xl space-y-6">
        <div className="flex gap-2">
          {(["recipe", "journal"] as const).map((k) => (
            <button
              key={k}
              type="button"
              onClick={() => setKind(k)}
              className={`rounded-full border px-3.5 py-1.5 font-mono text-[11px] uppercase tracking-[0.14em] transition-colors ${
                kind === k
                  ? "border-clay bg-clay text-primary-foreground"
                  : "border-border text-muted-foreground hover:text-foreground"
              }`}
            >
              {k === "recipe" ? "Recipe" : "Brew journal"}
            </button>
          ))}
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <label className="block">
            <Label>Title</Label>
            <input
              name="title"
              required
              minLength={2}
              maxLength={120}
              className={fieldClass}
              placeholder="Sunday Chemex, half-batch"
            />
          </label>
          <label className="block">
            <Label>Your name</Label>
            <input
              name="authorName"
              required
              maxLength={80}
              className={fieldClass}
              placeholder="Mara Ellison"
            />
          </label>
        </div>

        <label className="block">
          <Label>Method</Label>
          <select
            name="method"
            required
            value={previewMethod}
            onChange={(e) => setPreviewMethod(e.target.value)}
            className={fieldClass}
          >
            {METHODS.map((m) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </select>
        </label>

        <fieldset className="rounded-xl border border-border p-5">
          <legend className="px-2 font-mono text-[10px] uppercase tracking-[0.16em] text-clay">
            Measurements {kind === "journal" && "(optional)"}
          </legend>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            <label className="block">
              <Label>Dose (g)</Label>
              <input
                name="dose"
                type="number"
                step="0.1"
                min="0"
                className={fieldClass}
                placeholder="18"
              />
            </label>
            <label className="block">
              <Label>Water (g)</Label>
              <input
                name="water"
                type="number"
                step="1"
                min="0"
                className={fieldClass}
                placeholder="300"
              />
            </label>
            <label className="block">
              <Label>Temp (°C)</Label>
              <input
                name="tempC"
                type="number"
                step="1"
                min="0"
                max="100"
                className={fieldClass}
                placeholder="94"
              />
            </label>
            <label className="block">
              <Label>Time</Label>
              <input name="timeLabel" maxLength={20} className={fieldClass} placeholder="3:00" />
            </label>
          </div>
        </fieldset>

        <div>
          <Label>Flavor tags</Label>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {FLAVOR_NOTES.map((f) => (
              <button
                key={f}
                type="button"
                onClick={() => toggleFlavor(f)}
                className={`rounded-full border px-3 py-1 font-mono text-[10px] uppercase tracking-[0.14em] transition-colors ${
                  flavors.includes(f)
                    ? "border-clay bg-clay text-primary-foreground"
                    : "border-border text-muted-foreground hover:text-foreground"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        <label className="block">
          <Label>Notes</Label>
          <textarea
            name="notes"
            rows={5}
            maxLength={1000}
            className={fieldClass}
            placeholder="Grind, pour schedule, what the cup tasted like…"
          />
        </label>

        <div className="flex flex-wrap items-center gap-4">
          <button
            type="submit"
            disabled={status === "sending"}
            className="rounded-full bg-primary px-5 py-2.5 font-mono text-[11px] uppercase tracking-[0.14em] text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-60"
          >
            {status === "sending" ? "Sending…" : "Submit brew"}
          </button>
          {status === "done" && (
            <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-clay">
              Received — pending review.
            </p>
          )}
          {status === "error" && <p className="text-sm text-destructive">{message}</p>}
        </div>
      </form>
    </Page>
  );
}
