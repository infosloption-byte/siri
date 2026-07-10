import { Container, PrimaryButton } from "../components/ui";
import { usePageTitle } from "../hooks/usePageTitle";

export default function NotFound() {
  usePageTitle("Page Not Found", "This page doesn't exist. Head back to the homepage.");
  return (
    <Container className="flex flex-col items-center justify-center py-32 text-center">
      <p className="font-mono text-sm text-copper">error 404</p>
      <h1 className="mt-4 font-display text-4xl text-ink">Route not found on this server</h1>
      <p className="mt-4 max-w-md text-muted">
        The path you requested isn't mapped to anything. Check the URL, or head back to a known route.
      </p>
      <div className="mt-8">
        <PrimaryButton to="/">Back to home</PrimaryButton>
      </div>
    </Container>
  );
}
