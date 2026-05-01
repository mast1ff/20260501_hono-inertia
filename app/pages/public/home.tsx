import { Head } from "@inertiajs/react";
import type { PageProps } from "../../pages.gen";
import Layout from "../_layouts/default";

export default function Home({ message }: PageProps<"public/home">) {
  return (
    <Layout>
      <Head title="Home" />
      <h1>{message}</h1>
    </Layout>
  );
}
