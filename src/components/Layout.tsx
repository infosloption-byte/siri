import { Outlet, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Nav from "./Nav";
import Footer from "./Footer";
import { trackPageView } from "../lib/analytics";

export default function Layout() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  useEffect(() => {
    // Runs after the page component's usePageTitle effect has set document.title,
    // so the title sent to GA matches what's actually shown in the tab.
    trackPageView(location.pathname, document.title);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen flex-col bg-bg font-body text-ink">
      <Nav />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}