"use server";

import { api } from "@/convex/_generated/api";
import { Routes } from "@/src/utils/routes";
import { fetchMutation } from "convex/nextjs";
import { revalidatePath } from "next/cache";

export async function addComment(text: string) {
  await fetchMutation(api.comments.add, { text });
  revalidatePath(Routes.COMMENTS, "page");
}
