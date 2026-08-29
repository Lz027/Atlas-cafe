# Atlas Café

A Substack-style coffee platform: measured recipes, an editorial journal, a guided brew builder, and community submissions. Visual direction: "Field guide editorial" — warm paper palette, Fraunces serif headlines, mono spec readouts, restrained motion.

## Pages

- **Home (`/`)** — editorial hero, stat cards, featured recipe spec sheet, journal previews, community submission entry.
- **Recipes (`/recipes`)** — filter rail (method, strength, flavor notes) over a dense card grid of 50+ recipes.
- **Recipe detail (`/recipes/$slug`)** — full spec block (dose, water, temp, time, ratio), coffee type, origin, roast level, numbered steps, flavor tags.
- **Builder (`/builder`)** — inline stepper: coffee type → method → flavor preferences → suggested recipe with tweakable measurements (ratio recalculates live).
- **Journal (`/journal`)** — article index across History, Brewing Science, Regions & Farms.
- **Article (`/journal/$slug`)** — long-form layout with a citations block (books, papers, reputable sources).
- **Community (`/community`)** — feed of submitted recipes and brew journals.
- **Submit (`/submit`)** — form with measurement fields and flavor tag chips.

## Content

- 50+ premade recipes seeded into the database, each with name, style, coffee type, origin, roast level, dose/water/temp/time/ratio, flavor notes, strength, and step-by-step instructions.
- 8–10 journal articles across the three pillars, each with citations.
- Generated hero and article imagery in the direction's warm photographic style.

## Data layer (no hosted backend yet — bring your own later)

No Lovable Cloud or external database in this phase, so the backend can be self-hosted and connected later.

- `recipes` and `articles` live as structured JSON/TS data files in the repo (`src/data/`), typed with a shared schema.
- Community `submissions` go through a single `createServerFn` with Zod validation. For now it persists to the project's own data store (simple JSON file in dev) — the function is the only place that touches storage.
- All reads/writes are funneled through one data-access module (`src/lib/data.ts`), so swapping in your own backend later means replacing that one module — no page or component changes needed.
- When you're ready to connect your backend, tell me the API shape (REST endpoints, a database, anything) and I'll wire it into that module.

## Design system

- Tokens ported verbatim from the chosen direction into `src/styles.css`: paper, cream, ink, muted, line, espresso, clay; Fraunces / Inter / JetBrains Mono loaded via `<link>` in the root route; `rise` and `settle` keyframe animations.
- Shared header/footer in the root layout, matching the direction's minimal nav.

## Out of scope for now

Featured cafés, sponsorship, and advertising — structured so they can be added later without rework.
