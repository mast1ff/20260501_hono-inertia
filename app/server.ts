import { inertia } from "@hono/inertia";
import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { z } from "zod";
import { User } from "./models/user";
import { rootView } from "./root";

const userInput = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.email("Invalid email"),
  bio: z.string().max(200, "Bio must be 200 characters or less").optional().default(""),
});

const app = new Hono();

app.use(inertia({ rootView }));

const routes = app
  .get("/", (c) => c.render("public/home"), { message: "Hono x Inertia" })
  .get("/users", (c) => c.render("users/list"), { users: User.list() })
  .get("/users/new", (c) =>
    c.render("users/new", {
      values: { name: "", email: "", bio: "" },
      errors: {} as Record<string, string>,
    }),
  )
  .get("/users/:id{[0-9]+}", (c) => {
    const id = Number(c.req.param("id"));
    const user = User.retrieve(id);
    if (!user) return c.notFound();
    return c.render("users/retrieve", { user });
  })
  .post(
    "/users",
    zValidator("form", userInput, (result, c) => {
      if (!result.success) {
        const fieldErrors = z.flattenError(result.error).fieldErrors;
        const errors: Record<string, string> = {};
        for (const [key, messages] of Object.entries(fieldErrors)) {
          if (messages && messages.length > 0) errors[key] = messages[0];
        }
        const raw = (result as { data?: Record<string, unknown> }).data ?? {};
        return c.render("users/new", {
          values: {
            name: typeof raw.name === "string" ? raw.name : "",
            email: typeof raw.email === "string" ? raw.email : "",
            bio: typeof raw.bio === "string" ? raw.bio : "",
          },
          errors,
        });
      }
    }),
    (c) => {
      const input = c.req.valid("form");
      const user = User.create(input);
      return c.redirect(`/users/${user.id}`, 303);
    },
  );

export default routes;
