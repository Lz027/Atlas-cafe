import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";

const NAV = [
  { to: "/recipes", label: "Recipes" },
  { to: "/builder", label: "Builder" },
  { to: "/journal", label: "Journal" },
  { to: "/community", label: "Community" },
] as const;

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/85 backdrop-blur">
      <div className="mx-auto flex max-w-6xl flex-col items-start gap-2 px-5 py-3 sm:h-16 sm:flex-row sm:items-center sm:justify-between sm:gap-0 sm:py-0">
        <Link to="/" className="font-serif text-lg font-semibold tracking-tight">
          Atlas<span className="text-clay">&nbsp;Café</span>
        </Link>
        <nav className="flex w-full items-center gap-1 overflow-x-auto pb-1 sm:w-auto sm:gap-4 sm:overflow-visible sm:pb-0">
          {NAV.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className="shrink-0 rounded px-2 py-1 font-mono text-[10px] uppercase tracking-[0.12em] text-muted-foreground transition-colors hover:text-foreground sm:text-[11px] sm:tracking-[0.14em]"
              activeProps={{ className: "text-foreground" }}
            >
              {n.label}
            </Link>
          ))}
          <Link
            to="/submit"
            className="ml-1 shrink-0 rounded-full bg-primary px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.12em] text-primary-foreground transition-opacity hover:opacity-90 sm:text-[11px] sm:tracking-[0.14em]"
          >
            Submit
          </Link>
        </nav>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-border">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-5 py-10 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
        <p className="font-serif text-base text-foreground">Atlas Café</p>
        <p className="font-mono text-[11px] uppercase tracking-[0.14em]">
          Measured recipes · Field notes · Community brews
        </p>
      </div>
    </footer>
  );
}

export function Page({ children }: { children: ReactNode }) {
  return <main className="mx-auto w-full max-w-6xl px-5 py-12 animate-[var(--animate-rise)]">{children}</main>;
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-clay">{children}</p>
  );
}
