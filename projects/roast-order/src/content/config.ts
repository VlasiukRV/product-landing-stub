import { defineCollection, z } from 'astro:content';

const productsCollection = defineCollection({
    type: 'content',
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