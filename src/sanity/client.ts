import { createClient } from "next-sanity";

export const client = createClient({
  projectId: "q8df7wb4",
  dataset: "production",
  apiVersion: "2024-01-01",
  useCdn: false,
});
