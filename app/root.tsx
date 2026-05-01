import type { RootView } from "@hono/inertia";
import { renderToString } from "react-dom/server";
import { Link, Script, ViteClient } from "vite-ssr-components/react";
import { renderView } from "./ssr";

const Head = () => (
  <>
    <ViteClient />
    <Link rel="stylesheet" href="/app/assets/main.css" />
    <Script src="/app/javascript/client.tsx" />
  </>
);

export const rootView: RootView = async (page) => {
  const { head, body } = await renderView(page);
  const headHtml = renderToString(<Head />) + head.join("");
  return `<!DOCTYPE html><html><head>${headHtml}</head><body>${body}</body></html>`;
};
