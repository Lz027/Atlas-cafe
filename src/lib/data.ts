import {
  articles,
  getArticle,
  type Article,
  type ArticleCategory,
  type Citation,
} from "@/data/articles";
import {
  recipes,
  getRecipe,
  METHODS,
  STRENGTHS,
  FLAVOR_NOTES,
  type Method,
  type Recipe,
  type Strength,
} from "@/data/recipes";

export { articles, getArticle, recipes, getRecipe, METHODS, STRENGTHS, FLAVOR_NOTES };
export type { Article, ArticleCategory, Citation, Method, Recipe, Strength };

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
  const ranked = candidates
    .map((r) => ({ r, score: r.flavors.filter((f) => wanted.has(f.toLowerCase())).length }))
    .sort((a, b) => b.score - a.score);
  return ranked[0]?.r;
}
