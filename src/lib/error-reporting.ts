/**
 * Optional application-level error reporting hook.
 *
 * A host application can attach `window.__atlasReportError` when it needs
 * telemetry without coupling the site to a specific monitoring provider.
 */
type ErrorReporter = (payload: { error: unknown; context: Record<string, unknown> }) => void;

declare global {
  interface Window {
    __atlasReportError?: ErrorReporter;
  }
}

export function reportError(error: unknown, context: Record<string, unknown> = {}) {
  if (typeof window === "undefined") return;

  window.__atlasReportError?.({
    error,
    context: {
      route: window.location.pathname,
      ...context,
    },
  });
}
