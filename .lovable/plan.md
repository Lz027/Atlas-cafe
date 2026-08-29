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

## Backend (Lovable Cloud)

- `recipes` — premade catalog, public read.
- `articles` — journal content with a citations field, public read.
- `submissions` — community recipes and brew journals, with a `status` field (pending/approved). Public read of approved rows only; anyone can insert.
- Submissions are validated with Zod on both client and server before insert.
- No login required to submit in this phase; a moderation gate keeps the public feed clean.

## Design system

- Tokens ported verbatim from the chosen direction into `src/styles.css`: paper, cream, ink, muted, line, espresso, clay; Fraunces / Inter / JetBrains Mono loaded via `<link>` in the root route; `rise` and `settle` keyframe animations.
- Shared header/footer in the root layout, matching the direction's minimal nav.

## Out of scope for now

Featured cafés, sponsorship, and advertising — structured so they can be added later without rework.
