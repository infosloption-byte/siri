declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

/**
 * Sends a GA4 page_view event manually. Needed because this is a client-rendered
 * SPA (react-router) — browser history changes (pushState) don't trigger new
 * page loads, so GA's automatic page_view on `gtag('config', ...)` only ever
 * fires once, on first load. Every subsequent route change must be sent explicitly.
 */
export function trackPageView(path: string, title: string) {
  if (typeof window === "undefined" || !window.gtag) return; // gtag blocked or not yet loaded
  window.gtag("event", "page_view", {
    page_path: path,
    page_title: title,
    page_location: window.location.href,
  });
}