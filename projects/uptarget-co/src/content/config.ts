import { defineCollection, z } from 'astro:content';

const vacanciesCollection = defineCollection({
    type: 'content',
    schema: z.object({
        title: z.string(),
        isHot: z.boolean().default(false),
        publish: z.boolean().default(false),
    }),
});

export const collections = {
    'careers': vacanciesCollection,
};