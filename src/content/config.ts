import { z, defineCollection } from "astro:content";

const docsCollection = defineCollection({
  schema: z.object({
    title: z.string().min(1),
    section: z.enum(["Getting started", "Language", "Runtime"]),
    order: z.number(),
    // date: z.date(),
  }),
});

export const collections = {
  docs: docsCollection,
};
