import { Head, Link } from "@inertiajs/react";
import type { PageProps } from "../../pages.gen";
import Layout from "../_layouts/default";

export default function UsersList({ users }: PageProps<"users/list">) {
  console.log(users);
  return (
    <Layout>
      <Head title="users" />
      <h1>Users</h1>
      <p>
        <Link href="/users/new">+ New user</Link>
      </p>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            <Link href={`/users/${user.id}`}>{user.name}</Link> &lt;{user.email}&gt;
          </li>
        ))}
      </ul>
    </Layout>
  );
}
