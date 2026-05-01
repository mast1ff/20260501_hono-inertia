import { createInertiaApp, type ResolvedComponent } from "@inertiajs/react";
import { hydrateRoot } from "react-dom/client";

createInertiaApp({
  resolve: async (name) => {
    const views = import.meta.glob<{ defualt: ResolvedComponent }>("../pages/**/*.tsx");
    const view = await views[`../pages/${name}.tsx`]();
    return view.defualt;
  },
  setup({ el, App, props }) {
    hydrateRoot(el, <App {...props} />);
  },
});
