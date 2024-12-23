import { z } from "zod";

// Constants for file validation

export const podcastSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .max(100, "Title must be less than 100 characters"),
  description: z
    .string()
    .min(10, "Description must be at least 10 characters")
    .max(1000, "Description must be less than 1000 characters"),
  tags: z.array(z.string()).optional(),

  createdAt: z
    .date()
    .optional()
    .default(() => new Date()),
  authorId: z.string().optional(),
});

export type PodcastSchemaType = z.infer<typeof podcastSchema>;
