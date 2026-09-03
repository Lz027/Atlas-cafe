# Atlas Café

Atlas Café is a field guide for better coffee: a focused editorial and community experience built around measured recipes, brewing notes, origins, and practical experimentation.

The site brings together a recipe library, a guided brew builder, journal articles, and community submissions in a warm, editorial interface inspired by a printed coffee field guide. Each section is designed to help visitors either make a better cup immediately or understand more about the ingredients and techniques behind it.

## What the site includes

| Area           | Description                                                                                                                              |
| -------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| Home           | Introduces the Atlas Café concept, highlights a recipe, summarizes the catalog, and surfaces recent journal entries.                     |
| Recipes        | Browses measured recipes by brew method, strength, and flavor notes.                                                                     |
| Recipe details | Presents coffee type, origin, roast, measurements, ratio, ingredients, and step-by-step instructions.                                    |
| Brew builder   | Suggests a recipe from coffee type, brew method, and flavor preferences, then allows the dose to be adjusted while water scales with it. |
| Journal        | Publishes articles about coffee history, brewing science, origins, farms, and related field notes.                                       |
| Community      | Displays approved reader submissions, including recipes and brew journals.                                                               |
| Submit a brew  | Accepts recipe or journal submissions with author details, method, measurements, flavor tags, and notes.                                 |

## User experience

The application is organized around a simple path: learn, choose, brew, and contribute. Visitors can start with the homepage, browse the recipe archive, or use the builder when they want a recommendation rather than a fixed recipe. Recipe pages keep measurements prominent, while journal pages provide the editorial context behind coffee practices and origins.

The community flow is intentionally review-oriented. A visitor can submit a recipe or brew journal, but new entries are stored with a `pending` status. Only approved entries are returned to the community feed. This keeps the public journal curated while preserving a straightforward submission workflow.

The design system uses a paper-toned palette, espresso and clay accents, serif display typography, compact monospace labels, editorial spacing, responsive grids, and coffee photography. Shared site chrome keeps navigation and footer content consistent across all routes.

## Routes

| Route            | Purpose                                  |
| ---------------- | ---------------------------------------- |
| `/`              | Homepage and featured content overview.  |
| `/recipes`       | Recipe archive and filtering interface.  |
| `/recipes/:slug` | Individual recipe detail page.           |
| `/journal`       | Journal article archive.                 |
| `/journal/:slug` | Individual journal article.              |
| `/builder`       | Guided recipe suggestion tool.           |
| `/community`     | Approved community submissions feed.     |
| `/submit`        | Recipe and brew-journal submission form. |

## Architecture

```text
src/
├── assets/             Editorial photography and site imagery
├── components/         Shared site chrome and visual components
├── data/               Static recipe and journal content
├── hooks/              Reusable browser hooks
├── lib/                Data exports, recipe matching, submissions, and utilities
├── routes/             TanStack file-based route components
├── types/              Generated and shared TypeScript types
├── router.tsx          Router configuration
├── server.ts           Server entry point
├── start.ts            Application startup entry point
└── styles.css          Global styles and Atlas Café design tokens
```

`src/components/site-chrome.tsx` provides the shared header, footer, page wrapper, and eyebrow label. `src/components/brew-art.tsx` contains decorative brewing visuals used by the interface. The route files compose these pieces into the site’s main experiences rather than duplicating layout logic.

## Content and data model

Recipe and journal content is currently defined in local TypeScript modules. `src/data/recipes.ts` contains the recipe catalog, supported brewing methods, strengths, flavor notes, and recipe types. `src/data/articles.ts` contains journal entries, article metadata, citations, excerpts, and imagery. `src/lib/data.ts` re-exports these modules and contains the guided recipe matching logic.

A recipe includes the following kinds of information:

| Field                                     | Purpose                                                           |
| ----------------------------------------- | ----------------------------------------------------------------- |
| `name` and `slug`                         | Display title and route identifier.                               |
| `method`                                  | Brewing method such as V60, espresso, French press, or cold brew. |
| `coffeeType`                              | Coffee type used by the builder and recipe detail view.           |
| `origin` and `roast`                      | Context about the coffee itself.                                  |
| `dose`, `water`, `tempC`, and `timeLabel` | Measured brewing parameters.                                      |
| `ratio`                                   | Coffee-to-water ratio presented to the visitor.                   |
| `flavors` and `strength`                  | Descriptive tags used for browsing and recipe matching.           |
| `steps`                                   | Ordered instructions for preparing the brew.                      |

The brew builder first narrows recipes by selected method, uses coffee type when a match is available, and ranks remaining candidates by overlap with the visitor’s selected flavor notes. When the dose is adjusted, the corresponding water amount scales using the recipe ratio.

## Community submissions

The submission form supports two entry types: `recipe` and `journal`. It validates titles, author names, brewing methods, optional measurements, flavor tags, and notes with Zod before the server function accepts the record.

Submitted records are stored in `data/submissions.json` with a generated ID, creation timestamp, and `pending` status. The community page reads the same store and returns only entries marked `approved`, ordered from newest to oldest. This is a deliberately lightweight persistence layer suitable for a small content experiment; a production deployment with multiple instances or durable editorial workflows should move submissions to a managed database or content system.

## Technology

| Technology      | Role                                                |
| --------------- | --------------------------------------------------- |
| React           | Component-based interface development.              |
| TypeScript      | Type-safe route, content, and server-function code. |
| TanStack Start  | Full-stack React application framework.             |
| TanStack Router | File-based routing and route metadata.              |
| TanStack Query  | Client-side query and cache support.                |
| Vite            | Development server and production build pipeline.   |
| Tailwind CSS    | Responsive styling and design-token composition.    |
| Nitro           | Server build and runtime integration.               |
| Framer Motion   | Page and interaction transitions.                   |
| Zod             | Submission input validation.                        |
| Lucide React    | Interface icons.                                    |

## Local development

### Requirements

Install Node.js 18 or newer and a supported package manager. Bun is the preferred package manager because the repository includes `bun.lock`; npm can also be used with the equivalent commands.

### Install and run

```bash
git clone https://github.com/Lz027/atlas-cafe-site.git
cd atlas-cafe-site
bun install
bun run dev
```

The development server normally runs at `http://localhost:3000`.

## Available commands

| Command             | Purpose                                         |
| ------------------- | ----------------------------------------------- |
| `bun run dev`       | Starts the Vite development server.             |
| `bun run build`     | Creates a production build.                     |
| `bun run build:dev` | Creates a development-mode build.               |
| `bun run preview`   | Serves the production build locally for review. |
| `bun run lint`      | Runs ESLint across the project.                 |
| `bun run format`    | Formats project files with Prettier.            |

The equivalent commands can be run with `npm` if Bun is not installed.

## Engineering notes

Atlas Café keeps editorial content local and explicit, which makes the catalog easy to review and version alongside the interface. Shared route layout, reusable content helpers, and a small server-function boundary keep the project understandable while still demonstrating a full-stack flow for community submissions.

The current application does not include authentication, a CMS, payment processing, or a persistent multi-user database. Community moderation is represented by the pending/approved status in the submission store, and the public feed intentionally exposes only approved records.

## Portfolio context

This project demonstrates an editorial product rather than a generic marketing page. It combines content architecture, responsive presentation, measured data, recommendation logic, validated server input, route-level metadata, and a curated community workflow in one cohesive experience.

Natural next steps would be a proper editorial admin view, durable submission storage, user accounts, richer recipe comparisons, and a café directory. Those features are not included in the current implementation.

## License

No license is currently included in the repository. Add a license file before distributing Atlas Café as an open-source project.
