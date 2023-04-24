import { z, defineCollection } from "astro:content";

const docsCollection = defineCollection({
  schema: z.object({
    title: z.string().min(1),
    // date: z.date(),
  }),
});

export const collections = {
  docs: docsCollection,
};
