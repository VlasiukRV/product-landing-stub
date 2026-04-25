import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const projectsCollection = defineCollection({
    loader: glob({
        pattern: "**/*.{md,mdx}",
        base: "./src/content/projects"
    }),
    schema: z.object({
        title: z.string(),
        subtitle: z.string(),
        description: z.string(),
        publishDate: z.coerce.date(),
        image: z.string().optional(),
        tags: z.array(z.string()).default(['Project']),
        status: z.string().optional(),
        isFeatured: z.boolean().default(false),
    }),
});

export const collections = {
    'projects': projectsCollection,
};