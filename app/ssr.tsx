import type { PageObject } from "@hono/inertia";
import type { Page } from "@inertiajs/core";
import { createInertiaApp, type ResolvedComponent } from "@inertiajs/react";
import { renderToString } from "react-dom/server";

const views = import.meta.glob<{ default: ResolvedComponent }>("./pages/**/*.tsx");

export const renderView = (view: PageObject) =>
  createInertiaApp({
    page: view as Page,
    render: renderToString,
    resolve: async (name) => {
      const loader = views[`./pages/${name}.tsx`];
      if (!loader) {
        throw new Error(`Inertia view not found: ${name}`);
      }
      const mod = await loader();
      return mod.default;
    },
    setup: ({ App, props }) => <App {...props} />,
  });
