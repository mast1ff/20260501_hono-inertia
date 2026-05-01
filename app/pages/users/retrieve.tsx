import { Head, Link } from "@inertiajs/react";
import type { PageProps } from "../../pages.gen";
import Layout from "../_layouts/default";

export default function UsersShow({ user }: PageProps<"users/retrieve">) {
  return (
    <Layout>
      <Head title={user.name} />
      <p>
        <Link href="/users">← Back to users</Link>
      </p>
      <h1>{user.name}</h1>
      <dl>
        <dt>Email</dt>
        <dd>{user.email}</dd>
        <dt>Bio</dt>
        <dd>{user.bio}</dd>
      </dl>
    </Layout>
  );
}
