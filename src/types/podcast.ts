export interface PodcastInterface {
  id: string;
  title: string;
  description: string;
  audioUrl: string; // URL to the audio file
  createdAt: Date;
  authorId: string; // User who created the podcast
  tags?: string[]; // Topics related to the podcast
  duration: number; // Duration of the podcast in seconds
  coverImage?: string; // Optional cover image for the podcast episode
}
