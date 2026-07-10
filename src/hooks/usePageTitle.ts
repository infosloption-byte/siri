import { useEffect } from "react";

const SITE_NAME = "Umayanga Sriyarathna";
const DEFAULT_DESCRIPTION =
  "Y.C. Umayanga Sriyarathna — Full-stack engineer and product builder. Voxora, Ubiq Editor, SL Option, OREL Innovation. Architecture through production, end to end.";

/**
 * Sets document.title and the <meta name="description"> tag for the current route.
 * Runs on every route change since this is a client-rendered SPA (BrowserRouter),
 * so search engines / social scrapers that execute JS see per-page metadata.
 *
 * @param title  Page-specific title. Rendered as "{title} — Umayanga Sriyarathna".
 *               Pass undefined to just use the site name (e.g. on Home).
 * @param description  Page-specific description. Falls back to the site default.
 */
export function usePageTitle(title?: string, description?: string) {
  useEffect(() => {
    document.title = title ? `${title} — ${SITE_NAME}` : SITE_NAME;

    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", description || DEFAULT_DESCRIPTION);
    }

    // Reset to the site default on unmount so navigating away never leaves stale metadata
    return () => {
      document.title = SITE_NAME;
      if (metaDescription) {
        metaDescription.setAttribute("content", DEFAULT_DESCRIPTION);
      }
    };
  }, [title, description]);
}
