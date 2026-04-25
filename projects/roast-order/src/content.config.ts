import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const productsCollection = defineCollection({

    loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/products" }),
    schema: z.object({
        name: z.string(),
        price: z.number(),
        description: z.string(),
        image: z.string().optional(),
        category: z.string(),
        isBestSeller: z.boolean().default(false),
    }),
});

export const collections = {
    'products': productsCollection,
};