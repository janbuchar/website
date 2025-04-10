import { defineCollection, z } from "astro:content";

const blog = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    lang: z.string(),
    date: z.date(),
    category: z.string(),
    tags: z.array(z.string()),
  }),
});

export const collections = { blog };
