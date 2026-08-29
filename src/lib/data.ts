import { articles, getArticle, recipes, type Article, type Method, type Recipe, type Strength } from "@/data/recipes";

export { articles, getArticle, recipes };
export type { Article, Method, Recipe, Strength };

export function getRecipe(slug: string): Recipe | undefined {
  return recipes.find((r) => r.slug === slug);
}

export interface BuilderPrefs {
  coffeeType: string;
  method: Method;
  flavors: string[];
}

/**
 * Pick the best-matching recipe for the guided builder: hard filter on method
 * and coffee type when possible, then score by flavor overlap.
 */
export function suggestRecipe(prefs: BuilderPrefs): Recipe | undefined {
  const pool = recipes.filter((r) => r.method === prefs.method);
  if (pool.length === 0) return undefined;
  const typed = pool.filter((r) =>
    r.coffeeType.toLowerCase().includes(prefs.coffeeType.toLowerCase()),
  );
  const candidates = typed.length > 0 ? typed : pool;
  const wanted = new Set(prefs.flavors.map((f) => f.toLowerCase()));
  return candidates
    .map((r) => ({
      r,
      score: r.flavors.filter((f) => wanted.has(f.toLowerCase())).length,
    }))
    .sort((a, b) => b.score - a.score)[0].r;
}
