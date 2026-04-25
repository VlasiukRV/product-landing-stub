import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const vacanciesCollection = defineCollection({

    loader: glob({
        pattern: '**/[^_]*.{md,mdx}',
        base: './src/content/careers'
    }),
    schema: z.object({
        title: z.string(),
        isHot: z.boolean().default(false),
        publish: z.boolean().default(false),
    }),

});

export const collections = {
    'careers': vacanciesCollection,
};