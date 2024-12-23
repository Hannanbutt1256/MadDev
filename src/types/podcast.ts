export interface PodcastInterface {
  id: string;
  title: string;
  description: string;
  tags?: string[]; // Topics related to the podcast
  duration: number; // Duration of the podcast in seconds
  coverImage: string; // Adjust as needed
  audio: string;
  createdAt: Date;
  authorId: string | undefined; // User who created the podcast
}
