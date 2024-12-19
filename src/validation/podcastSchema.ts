import { z } from "zod";

// Constants for file validation
const MAX_IMAGE_SIZE = 5 * 1024 * 1024; // 5MB
const MAX_AUDIO_SIZE = 500 * 1024 * 1024; // 50MB
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];
const ACCEPTED_AUDIO_TYPES = ["audio/mpeg", "audio/wav", "audio/mp3"];

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
  duration: z
    .number()
    .positive("Duration must be a positive number")
    .or(z.string().regex(/^\d+$/).transform(Number)),
  coverImage: z
    .instanceof(FileList)
    .refine((files) => files?.length > 0, "Cover image is required")
    .refine(
      (files) => files?.[0]?.size <= MAX_IMAGE_SIZE,
      `Image must be less than ${MAX_IMAGE_SIZE / (1024 * 1024)}MB`
    )
    .refine(
      (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
      "Only .jpg, .jpeg, .png and .webp formats are supported"
    ),
  audio: z
    .instanceof(FileList)
    .refine((files) => files?.length > 0, "Audio file is required")
    .refine(
      (files) => files?.[0]?.size <= MAX_AUDIO_SIZE,
      `Audio must be less than ${MAX_AUDIO_SIZE / (1024 * 1024)}MB`
    )
    .refine(
      (files) => ACCEPTED_AUDIO_TYPES.includes(files?.[0]?.type),
      "Only .mp3 and .wav formats are supported"
    ),
  createdAt: z
    .date()
    .optional()
    .default(() => new Date()),
  authorId: z.string().optional(),
});

export type PodcastSchemaType = z.infer<typeof podcastSchema>;
